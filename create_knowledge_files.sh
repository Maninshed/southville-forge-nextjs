#!/bin/bash
set -e
base="knowledge"

# --- AUTOMATION ---
cat <<'EOF' > $base/automation/intro.md
---
title: "AI & Automation Overview"
tone: practical
---
**What we do**

We design automation systems that handle the repetitive parts of business operations — the admin, the follow-ups, the quote reminders, the status updates — so people can focus on the work that matters.

Our approach is simple: understand what slows you down, then build a lightweight workflow that connects your existing tools and makes them work together automatically.

**Who it’s for**

Small teams, service providers, and anyone who’s outgrowing spreadsheets but doesn’t need enterprise software. If you send the same message twice, you can probably automate it.
EOF

cat <<'EOF' > $base/automation/core-services.md
---
title: "Core Automation Services"
tone: practical
---
- **Lead & enquiry capture** — connect forms, chats, and email inboxes to one central log.
- **Quote follow-ups** — auto-message leads who haven’t replied.
- **CRM sync** — keep customer info consistent across systems.
- **Task routing** — move jobs from inbox to calendar or project board automatically.
- **Notification flows** — email, WhatsApp, or SMS reminders without copy-paste.

Every automation we build starts small and scales only when you’re ready.
EOF

cat <<'EOF' > $base/automation/workflow-automation.md
---
title: "Workflow Automation"
tone: practical
---
Workflow automation means designing clear steps between “someone asks” and “something happens.”  
We map each step, decide what needs human input, and automate the rest using tools like n8n and Zapier.

Examples:
- New enquiry → tagged in CRM → Slack notification.
- Completed form → generate PDF proposal → email client.

No black boxes, no dependencies you can’t see — you keep control.
EOF

cat <<'EOF' > $base/automation/forgeagent-overview.md
---
title: "ForgeAgent Overview"
tone: professional
---
ForgeAgent is our central automation layer — the intelligence that connects chatbots, forms, and databases.

It interprets free-text input, extracts useful details, and passes structured JSON to n8n or other systems.  
The result is a seamless handoff between conversation and action: less typing, more doing.
EOF

cat <<'EOF' > $base/automation/agentic-workflows.md
---
title: "Agentic Workflows"
tone: professional
---
Agentic workflows are multistep automations that make contextual decisions.

Example:
1. Customer asks for a quote.  
2. ForgeAgent gathers job info.  
3. n8n generates draft proposal.  
4. Human reviews → final email sent.

They’re flexible, auditable, and can scale from one person to a full team.
EOF


# --- DESIGN ---
cat <<'EOF' > $base/design/intro.md
---
title: "Design & Branding Overview"
tone: professional
---
Design isn’t decoration — it’s communication.  
We build clear, consistent visuals that match what your business stands for.

Our design work covers logos, identity systems, web layout, and visual tone.  
Each project is grounded in purpose and easy to maintain once live.
EOF

cat <<'EOF' > $base/design/web-design-packages.md
---
title: "Web Design Packages"
tone: professional
---
We offer three web-design tiers:

- **Starter** — one-page site or landing page with CMS setup.  
- **Standard** — full multi-page site with form integration and analytics.  
- **Custom** — tailored design systems with animations or dynamic content.

All sites are responsive, SEO-ready, and built to evolve.
EOF

cat <<'EOF' > $base/design/brand-identity-systems.md
---
title: "Brand Identity Systems"
tone: professional
---
Your visual identity defines how people remember you.  
We develop flexible identity systems — logo, palette, typography, and brand assets — that work everywhere from signage to social.

Deliverables are supplied as reusable digital kits so updates are simple.
EOF

cat <<'EOF' > $base/design/design-automation.md
---
title: "Design Automation"
tone: hybrid
---
Design automation links creative tools to data.

Examples:
- Auto-generate proposals or pitch decks from client data.  
- Batch-produce social images using templates.  
- Sync web styles with design systems.

It keeps branding consistent and removes repetitive design work.
EOF


# --- HYBRID ---
cat <<'EOF' > $base/hybrid/intro.md
---
title: "Creative Technology Overview"
tone: hybrid
---
Hybrid work merges design, data, and automation.  
We use emerging tools to create interactive sites, AI-driven visuals, and digital experiences that adapt to context.

The goal is always practical: technology that earns its keep.
EOF

cat <<'EOF' > $base/hybrid/hybrid-experiments.md
---
title: "Hybrid Experiments"
tone: hybrid
---
We prototype small, useful tools — internal dashboards, chat interfaces, generative visuals — to test new workflows.

Everything we learn feeds back into client systems so nothing is wasted.
EOF

cat <<'EOF' > $base/hybrid/ai-tools-microservices.md
---
title: "AI Tools & Microservices"
tone: hybrid
---
We build lightweight APIs and micro-tools for content generation, file handling, and analysis.

They plug into existing sites or apps and can run locally or in the cloud.
EOF

cat <<'EOF' > $base/hybrid/research-innovation.md
---
title: "Research & Innovation"
tone: hybrid
---
We track and test open-source AI tools, focusing on reliability and cost efficiency.  
Innovation means choosing the simplest tool that solves the problem — not chasing hype.
EOF


# --- GLOBAL ---
cat <<'EOF' > $base/global/forge-manifesto.md
---
title: "About Southville Forge"
tone: professional
---
Southville Forge is a small design-led automation studio.  
We combine creative design with AI systems to make businesses run smoother.

Everything we build is transparent, open-source-friendly, and built to be owned by the client.
EOF

cat <<'EOF' > $base/global/contact-and-onboarding.md
---
title: "Start a Project"
tone: practical
---
We start with a short discovery chat to understand your goals.  
From there, we suggest a simple setup — no pressure, no jargon.

To begin, complete the contact form or message the AI assistant on this site.  
You’ll get a human reply within one working day.
EOF

cat <<'EOF' > $base/global/case-studies-summary.md
---
title: "Case Studies"
tone: professional
---
We’re building our case study library gradually.  
Each project summary focuses on measurable improvements — time saved, leads captured, or workflows automated.

Results speak louder than features.
EOF

echo "✅ All markdown content created successfully."
