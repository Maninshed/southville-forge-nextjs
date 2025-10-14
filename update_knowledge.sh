#!/bin/bash
set -e

echo "📘 Rebuilding knowledge base..."
mkdir -p knowledge/{automation,design,hybrid,global}

# ------------------ AUTOMATION ------------------
cat > knowledge/automation/intro.md <<'EOM'
---
title: "AI & Automation Systems"
tone: practical
purpose: intro
---

# AI & Automation Systems

Automation isn’t a luxury anymore — it’s how small businesses stay organised, consistent, and competitive.  
We design systems that quietly handle the boring parts so you can focus on real work.

### Why It Matters
Every business repeats the same digital actions: responding to messages, copying data, sending updates.  
Those moments add up to hours every week. Automating them means:
- Fewer missed enquiries  
- Faster customer responses  
- Reliable processes that don’t rely on memory or luck  

Our job is to make this practical — we look at what you already use and connect the dots.  
It’s not about replacing people, it’s about reducing friction and giving time back.
EOM

cat > knowledge/automation/core-services.md <<'EOM'
---
title: "Core Automation Services"
tone: practical
purpose: service list
---

# Core Automation Services

We focus on processes that solve real business problems.  
Each service saves time, prevents human error, and improves consistency.

## Chatbots & Virtual Assistants
Instant replies for routine questions.  
Bots that greet, collect info, and hand over leads automatically — ideal for trades, e-commerce, or booking-based businesses.  
**Example:** A builder’s chatbot answers “do you cover my area?” or “when can you start?” instantly, collects a postcode, and schedules a callback.

## Quote & Lead Follow-Ups
Automate quote reminders and client check-ins.  
Smart workflows track open quotes, send follow-ups at the right time, and log replies to a CRM.  
**Result:** fewer lost jobs, better conversion, zero admin.

## Email & Message Automation
Send confirmations, thank-yous, and updates automatically.  
Everything stays branded and consistent — no more copy-paste errors.

## CRM & Database Sync
Sync forms, messages, and contacts across your systems automatically.  
**Example:** Web form → Google Sheets → CRM → notification to your phone. Done.

## Dashboards & Reports
Real-time overviews of your pipeline, leads, and response times — no spreadsheets, no hunting.  
See what’s working and where to focus next.

Want to see how this could fit your setup?  
**Ask ForgeBot** — it’ll guide you through options for your business.
EOM

cat > knowledge/automation/workflow-automation.md <<'EOM'
---
title: "Workflow Automation"
tone: professional
purpose: process description
---

# Workflow Automation

Most teams already use forms, inboxes, and spreadsheets.  
Workflow automation connects them so information moves automatically instead of being retyped.

### Typical Example
1. A client fills a form.  
2. Data is cleaned, formatted, and added to your CRM.  
3. An email confirmation and a task reminder are triggered.  
4. Follow-ups happen automatically if there’s no reply.  

We use **n8n**, **Baserow**, and **OpenAI APIs** to connect your tools.  
Everything runs on open, flexible infrastructure — so you stay in control.
EOM

cat > knowledge/automation/forgeagent-overview.md <<'EOM'
---
title: "ForgeAgent Overview"
tone: professional
purpose: system description
---

# ForgeAgent Overview

ForgeAgent is your intelligent middle layer — a system that listens, interprets, and acts.

It connects your chat interface, website forms, and automation tools, turning loose input into structured data.

### What It Does
- Understands plain language from visitors  
- Captures structured details (like name, project, budget)  
- Sends that data to n8n workflows  
- Generates summaries or proposals automatically  

ForgeAgent gives your automation stack context — so every workflow starts with clear intent, not guesswork.
EOM

cat > knowledge/automation/agentic-workflows.md <<'EOM'
---
title: "Agentic Workflows"
tone: professional
purpose: advanced automation
---

# Agentic Workflows

Agentic workflows let AI coordinate multiple tasks intelligently.  
Instead of one fixed script, the system interprets intent and executes the right sequence.

### Example
A client says: “We need a booking system and a new website.”  
ForgeAgent breaks it down:
1. Detects project type (web + automation).  
2. Creates a client record.  
3. Triggers the design form workflow.  
4. Sends follow-up info and next steps.  

These workflows blend **Ollama models**, **Weaviate vector search**, and **n8n** orchestration — adaptive automation that feels personal.
EOM

# ------------------ DESIGN ------------------
cat > knowledge/design/intro.md <<'EOM'
---
title: "Design & Branding"
tone: professional
purpose: intro
---

# Design & Branding

Clear design communicates trust.  
We build brand systems and websites that stay consistent across every channel — from your logo to your invoices.

### What We Do
- Build design systems that scale  
- Keep visual language consistent  
- Align tone of voice with brand goals  

Our approach: minimal, usable, and authentic.  
Design shouldn’t overwhelm — it should make sense instantly.
EOM

cat > knowledge/design/web-design-packages.md <<'EOM'
---
title: "Web Design Packages"
tone: practical
purpose: service overview
---

# Web Design Packages

We offer flexible, modular packages that fit any stage of business growth.

## One-Page Launch
A simple, fast website — ideal for new ventures or trades.  
Includes contact form, quote capture, and ForgeBot integration.

## Site Refresh
Keep your existing site but update layout, copy, and SEO.  
We improve structure and speed without reinventing everything.

## Full Redesign
Comprehensive rebuild with visual identity, new UX, and connected automations (CRM, booking, etc.).

Every build is **responsive**, **lightweight**, and **editable** — you control your own site.
EOM

cat > knowledge/design/brand-identity-systems.md <<'EOM'
---
title: "Brand Identity Systems"
tone: professional
purpose: visual language
---

# Brand Identity Systems

A strong identity makes your business easier to remember and trust.  
We create brand kits that define how your logo, colours, and typography work together.

### Includes
- Logo set (print + digital)  
- Font pairings  
- Colour palette with accessibility checks  
- Example templates for social and web  

Your brand kit ensures visual consistency across every platform.  
No guesswork — everything aligns naturally.
EOM

cat > knowledge/design/design-automation.md <<'EOM'
---
title: "Design Automation"
tone: hybrid
purpose: integration
---

# Design Automation

Automation supports creative work too.  
We build systems that generate drafts, proposals, or visual references automatically.

### Examples
- Auto-generated design briefs from form data  
- Visual summaries for client reviews  
- Moodboards built dynamically from keywords  

These tools shorten admin cycles and make your creative process faster.
EOM

# ------------------ HYBRID ------------------
cat > knowledge/hybrid/intro.md <<'EOM'
---
title: "Creative Tech & Hybrid Solutions"
tone: visionary
purpose: intro
---

# Creative Tech & Hybrid Solutions

Some ideas sit between design and engineering.  
We explore those intersections — testing what’s possible and building useful prototypes.

Projects range from interactive demos to data-driven visual tools.  
Each experiment informs how we improve real-world client systems.
EOM

cat > knowledge/hybrid/hybrid-experiments.md <<'EOM'
---
title: "Hybrid Experiments"
tone: visionary
purpose: showcase
---

# Hybrid Experiments

We run experiments that mix design, AI, and automation to find new approaches.

### Examples
- Visual dashboards powered by local AI models  
- Tools that summarise information interactively  
- Generators that build content layouts automatically  

Each prototype feeds back into our commercial work — small ideas that become production tools.
EOM

cat > knowledge/hybrid/ai-tools-microservices.md <<'EOM'
---
title: "AI Tools & Microservices"
tone: professional
purpose: internal tools
---

# AI Tools & Microservices

We maintain small, open-source tools for automation, design, and communication.

### Example Tools
- Email summariser + auto-tagger  
- Content classifier  
- Lead scoring engine  
- Image caption generator  

All tools can run locally or connect to ForgeAgent.  
They’re built to integrate smoothly with your existing stack.
EOM

cat > knowledge/hybrid/research-innovation.md <<'EOM'
---
title: "Research & Innovation"
tone: visionary
purpose: r&d
---

# Research & Innovation

Innovation means staying curious.  
We treat R&D as small, continuous steps — testing efficiency, ethics, and sustainability in every build.

Focus areas:
- Local/private AI deployments  
- Human-in-the-loop systems  
- Low-energy compute setups  

The result: practical innovation that improves reliability and reduces waste.
EOM

# ------------------ GLOBAL ------------------
cat > knowledge/global/forge-manifesto.md <<'EOM'
---
title: "The Forge Manifesto"
tone: hybrid
purpose: ethos
---

# The Forge Manifesto

Southville Forge builds useful systems — design-driven, technically grounded, and straightforward.  
We believe in:
- Transparency over mystery  
- Open standards over lock-ins  
- Simplicity over hype  

Our clients range from freelancers to small teams, all looking for systems that just work.
EOM

cat > knowledge/global/contact-and-onboarding.md <<'EOM'
---
title: "Start Here"
tone: practical
purpose: onboarding
---

# Start Here

If you’re ready to start, here’s the process:

1. Tell us what you need — automation, design, or both.  
2. We’ll review your setup and propose the fastest route.  
3. You decide what to move forward with — no pressure.  

Setup, testing, and hand-off are all handled by us.  
You keep full ownership of tools and data.  
Want help choosing? **Ask ForgeBot** — it’ll walk you through options.
EOM

cat > knowledge/global/case-studies-summary.md <<'EOM'
---
title: "Case Studies"
tone: professional
purpose: credibility
---

# Case Studies

### Quote Follow-Up System
A trades company automated quote reminders and logged replies in Sheets.  
**Result:** 30% more accepted jobs, zero admin.

### Website + CRM Integration
A cleaning firm linked its form data directly to a CRM.  
**Result:** faster replies, no missed leads.

### Design Audit & Refresh
An online retailer rebuilt layout and tone; linked automations handled follow-ups.  
**Result:** faster load, higher retention, cleaner identity.
EOM

echo "✅ All knowledge files created successfully."
