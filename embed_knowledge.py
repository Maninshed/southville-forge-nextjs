#!/usr/bin/env python3
"""
embed_knowledge.py  —  Ollama version
------------------------------------
Convert markdown knowledge base files into vector embeddings using a local Ollama model
and upload them to Weaviate.

Usage:
  python3 embed_knowledge.py
"""

import os
import re
import sys
import json
import glob
import uuid
import frontmatter
import requests
import weaviate
from tqdm import tqdm
from typing import List

# ----------------------------
# CONFIGURATION
# ----------------------------
WEAVIATE_URL = os.getenv("WEAVIATE_URL", "http://localhost:8082")
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = "nomic-embed-text"  # best for general-purpose embeddings
BASE_DIR = "/home/southville-forge/southville-forge-nextjs/knowledge"

CHUNK_SIZE = 1000   # characters per chunk
OVERLAP = 200

# ----------------------------
# OLLAMA EMBEDDING
# ----------------------------
def embed_ollama(text: str) -> List[float]:
    """Generate embeddings locally using Ollama."""
    r = requests.post(
        f"{OLLAMA_URL}/api/embeddings",
        json={"model": OLLAMA_MODEL, "prompt": text},
        timeout=60
    )
    r.raise_for_status()
    data = r.json()
    return data["embedding"]

# ----------------------------
# TEXT CHUNKING
# ----------------------------
def split_markdown(content: str) -> List[str]:
    """Split markdown into manageable chunks based on headings and length."""
    sections = re.split(r"\n#+\s+", content)
    chunks = []
    for sec in sections:
        sec = sec.strip()
        if not sec:
            continue
        while len(sec) > CHUNK_SIZE:
            cut = sec[:CHUNK_SIZE]
            idx = cut.rfind(".")
            if idx < 200:
                idx = cut.rfind("\n") or CHUNK_SIZE
            chunks.append(sec[:idx].strip())
            sec = sec[idx - OVERLAP:]
        if sec.strip():
            chunks.append(sec.strip())
    return chunks

# ----------------------------
# CATEGORY → CLASS MAPPING
# ----------------------------
def category_to_class(path: str) -> str:
    parts = path.split(os.sep)
    if "automation" in parts:
        return "AutomationKnowledge"
    if "design" in parts:
        return "DesignKnowledge"
    if "hybrid" in parts:
        return "HybridKnowledge"
    if "global" in parts:
        return "GlobalKnowledge"
    return "MiscKnowledge"

# ----------------------------
# SCHEMA CREATION
# ----------------------------
def ensure_schema(client):
    """Ensure Weaviate has the expected classes."""
    schema = client.schema.get()
    existing_classes = [c["class"] for c in schema.get("classes", [])]
    classes = ["AutomationKnowledge", "DesignKnowledge", "HybridKnowledge", "GlobalKnowledge"]

    for c in classes:
        if c in existing_classes:
            continue
        client.schema.create_class({
            "class": c,
            "vectorizer": "none",
            "properties": [
                {"name": "title", "dataType": ["text"]},
                {"name": "tone", "dataType": ["text"]},
                {"name": "purpose", "dataType": ["text"]},
                {"name": "section", "dataType": ["text"]},
                {"name": "content", "dataType": ["text"]},
                {"name": "source", "dataType": ["text"]}
            ]
        })
        print(f"🧱 Created class {c}")

# ----------------------------
# MAIN LOOP
# ----------------------------
def main():
    print(f"🔗 Connecting to Weaviate at {WEAVIATE_URL}")
    client = weaviate.Client(WEAVIATE_URL)
    ensure_schema(client)

    files = glob.glob(f"{BASE_DIR}/**/*.md", recursive=True)
    print(f"📚 Found {len(files)} markdown files under {BASE_DIR}")

    with client.batch as batch:
        batch.batch_size = 5
        for file_path in tqdm(files, desc="Embedding"):
            category_class = category_to_class(file_path)
            post = frontmatter.load(file_path)
            meta = post.metadata
            content = re.sub(r"^---.*?---", "", post.content, flags=re.S | re.M).strip()

            chunks = split_markdown(content)
            for i, chunk in enumerate(chunks):
                text = chunk.strip()
                if not text:
                    continue
                try:
                    embedding = embed_ollama(text)
                except Exception as e:
                    print(f"⚠️  Embedding failed for {file_path}: {e}")
                    continue

                obj = {
                    "title": meta.get("title", ""),
                    "tone": meta.get("tone", ""),
                    "purpose": meta.get("purpose", ""),
                    "section": f"chunk_{i+1}",
                    "content": text,
                    "source": os.path.relpath(file_path, BASE_DIR)
                }
                batch.add_data_object(obj, category_class, uuid.uuid4(), vector=embedding)

    print("✅ Embedding + upload complete!")

# ----------------------------
if __name__ == "__main__":
    main()

