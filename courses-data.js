/**
 * TAFA Academy Courses Data Store
 * Structured catalog of all 10 courses across the 4 Specialized Schools.
 */

const COURSES_DATA = [
  {
    id: "intro-to-ai",
    number: "01",
    title: "Introduction to Artificial Intelligence",
    school: "literacy",
    schoolName: "School of AI Literacy & Productivity",
    track: "Foundation Level",
    trackClass: "foundation",
    level: "Beginner",
    duration: "4 weeks",
    format: "Live online cohort",
    price: "$300",
    image: "./Superintelligence Foundations cover.png",
    badge: null,
    purpose: "Build AI literacy across core principles, model types, opportunities, and responsible usage.",
    description: "A foundational entry point designed for non-technical and technical learners alike. Understand how generative AI and large language models work, explore real-world opportunities and limitations, and build a principled framework for AI ethics and the future of work.",
    topics: [
      "What is AI?",
      "Generative AI vs Traditional AI",
      "How LLMs work",
      "AI opportunities and limitations",
      "AI ethics and responsible use",
      "Future of work and AI"
    ],
    targetAudience: [
      "Beginners",
      "Professionals",
      "Students",
      "Corporate teams"
    ],
    learningOutcomes: [
      "Explain the fundamental mechanisms of modern AI, LLMs, and foundation models",
      "Differentiate between traditional rule-based AI and generative intelligence",
      "Identify high-value AI opportunities while recognizing hallucination and system boundaries",
      "Apply ethical guidelines and responsible AI governance in everyday work",
      "Prepare your career and organization for AI-driven industry shifts"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "Demystifying AI & Generative Intelligence",
        summary: "What is AI? Tracing the evolution from traditional machine learning to deep learning, foundation models, and modern generative AI."
      },
      {
        week: "Week 2",
        title: "How Large Language Models Work",
        summary: "Tokens, parameters, context windows, and transformer architectures explained simply without confusing academic jargon."
      },
      {
        week: "Week 3",
        title: "Opportunities, Boundaries & Pitfalls",
        summary: "Understanding hallucinations, knowledge cutoffs, prompt sensitivity, data privacy, and intellectual property considerations."
      },
      {
        week: "Week 4",
        title: "AI Ethics & The Future of Work",
        summary: "Responsible adoption frameworks, ethical guardrails, human-in-the-loop workflows, and career positioning in an AI-native world."
      }
    ],
    faqs: [
      {
        q: "Do I need programming or math skills?",
        a: "No. This course is built specifically to establish conceptual fluency for individuals from any discipline or professional background."
      },
      {
        q: "Will I receive a certificate upon completion?",
        a: "Yes. Upon completing the course and final literacy assessment, you will receive a verified TAFA Academy Certificate."
      }
    ]
  },
  {
    id: "ai-productivity",
    number: "02",
    title: "AI Productivity & Workplace Applications",
    formerTitle: "Currently: AI for Business",
    school: "literacy",
    schoolName: "School of AI Literacy & Productivity",
    track: "Foundation Level",
    trackClass: "foundation",
    level: "Intermediate",
    duration: "4 weeks",
    format: "Live online & hands-on labs",
    price: "$450",
    image: "./Applied for Sales & Marketing cover.png",
    badge: "Highest-Demand Course",
    purpose: "Teach professionals and teams how to use AI to 10x their day-to-day workplace productivity and output.",
    description: "Our flagship workplace curriculum designed for knowledge workers, managers, and executives. Move from casual prompting to structured workplace workflows across research, presentations, executive reporting, meetings, and data-backed decision support.",
    topics: [
      "AI for communication",
      "AI for research",
      "AI for presentations",
      "AI for meetings",
      "AI for reports",
      "AI for decision support",
      "AI-powered workflows"
    ],
    targetAudience: [
      "Professionals",
      "Managers",
      "Executives"
    ],
    learningOutcomes: [
      "Draft executive-grade communications, memos, and proposals in minutes",
      "Conduct in-depth competitor and industry research with synthesis AI engines",
      "Generate complete presentation decks and slide narratives with AI tools",
      "Automate meeting summaries, action items, and task tracking",
      "Build custom, repeatable workflows that save 10+ hours every week"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "High-Impact AI Communication & Research",
        summary: "Tone matching, executive correspondence, multi-document synthesis, and rapid literature/market research."
      },
      {
        week: "Week 2",
        title: "Presentations, Reports & Data Synthesis",
        summary: "Turning raw bullet points into compelling slide decks, structured whitepapers, and comprehensive management reports."
      },
      {
        week: "Week 3",
        title: "Meeting Intelligence & Decision Support",
        summary: "Transcript extraction, action-item delegation, decision matrices, scenario modeling, and critical analysis."
      },
      {
        week: "Week 4",
        title: "End-to-End AI-Powered Workflows & Capstone",
        summary: "Building personalized productivity systems, custom GPTs/artifacts, and presenting your personal workplace workflow."
      }
    ],
    faqs: [
      {
        q: "Which tools will we use?",
        a: "We work with ChatGPT Plus, Claude, Perplexity, Microsoft Copilot, and Gamma, focusing on principles transferable to any AI tool."
      },
      {
        q: "Can corporate departments attend together?",
        a: "Yes, we offer dedicated cohort tracks for corporate teams with customized workflow exercises."
      }
    ]
  },
  {
    id: "ai-business-strategy",
    number: "03",
    title: "AI for Business Strategy & Growth",
    school: "literacy",
    schoolName: "School of AI Literacy & Productivity",
    track: "Business & Industry Applications",
    trackClass: "business",
    level: "Executive",
    duration: "6 weeks",
    format: "Executive cohort & advisory labs",
    price: "$850",
    image: "./Superintelligence for Leaders cover.png",
    badge: null,
    purpose: "Enable leadership to formulate AI strategy, conduct organizational readiness, and guide enterprise transformation.",
    description: "A strategic program tailored for founders, C-Suite leaders, and directors. Learn how to audit business processes, identify high-ROI AI initiatives, manage change, evaluate vendors, and build resilient governance frameworks.",
    topics: [
      "AI transformation",
      "Business process optimization",
      "AI adoption frameworks",
      "AI readiness assessment",
      "AI governance",
      "Strategic implementation"
    ],
    targetAudience: [
      "Founders",
      "Executives",
      "Business leaders"
    ],
    learningOutcomes: [
      "Formulate a customized, actionable 12-month organizational AI roadmap",
      "Calculate ROI, payback horizons, and capital allocation for AI projects",
      "Conduct enterprise AI readiness assessments across culture, data, and stack",
      "Establish enterprise AI governance, data safety, and compliance protocols",
      "Lead change management and upskilling across departmental business units"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "The Strategic Landscape of Enterprise AI",
        summary: "How modern AI disrupts African and global business models, competitive moats, and cost structures."
      },
      {
        week: "Week 2",
        title: "Process Optimization & AI Opportunity Mapping",
        summary: "Auditing departmental workflows to identify high-impact, low-risk automation and revenue growth vectors."
      },
      {
        week: "Week 3",
        title: "Organizational Readiness & Adoption Frameworks",
        summary: "Evaluating technical infrastructure, data hygiene, talent readiness, and change management friction."
      },
      {
        week: "Week 4",
        title: "Enterprise Governance, Risk & Ethics",
        summary: "IP protection, confidential data leakage prevention, compliance standards, and ethical deployment."
      },
      {
        week: "Week 5 & 6",
        title: "Implementation Roadmaps & Capstone Defense",
        summary: "Building your company's full strategic AI blueprint and defending it before our senior transformation panel."
      }
    ],
    faqs: [
      {
        q: "Is this suitable for non-technical executives?",
        a: "Yes. The focus is entirely on strategic value creation, cost optimization, talent orchestration, and leadership decision-making."
      }
    ]
  },
  {
    id: "ai-marketing",
    number: "04",
    title: "AI for Marketing & Content Creation",
    school: "applications",
    schoolName: "School of AI Applications",
    track: "Business & Industry Applications",
    trackClass: "business",
    level: "Intermediate",
    duration: "6 weeks",
    format: "Cohort-based & creative lab",
    price: "$550",
    image: "./Collaborative AI Learning Workspace.png",
    badge: null,
    purpose: "Supercharge marketing engines, organic traffic, creative output, and multi-channel campaign automation.",
    description: "Designed for marketers, founders, and creative directors. Transform your growth engine with AI-powered copywriting, automated SEO content pipelines, social media engines, dynamic ad creative generation, and end-to-end campaign workflows.",
    topics: [
      "AI copywriting",
      "Content strategy",
      "Social media automation",
      "SEO",
      "Ad creative generation",
      "Marketing workflows"
    ],
    targetAudience: [
      "Marketers",
      "Entrepreneurs",
      "SMEs"
    ],
    learningOutcomes: [
      "Produce brand-aligned copywriting that converts across ads, emails, and landing pages",
      "Build programmatic SEO pipelines and keyword-targeted content hubs",
      "Automate omnichannel social distribution and calendar scheduling",
      "Generate high-converting multi-variant ad creative and visuals at scale",
      "Deploy full marketing workflows that reduce campaign turnaround by 70%"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "Brand Voice Architecture & Conversion Copywriting",
        summary: "Building custom brand guidelines and system prompts for high-converting ads, landing pages, and email sequences."
      },
      {
        week: "Week 2",
        title: "Modern Content Strategy & Topic Clustering",
        summary: "Using AI for audience persona modeling, pain-point analysis, content ideation, and editorial calendar design."
      },
      {
        week: "Week 3",
        title: "AI-Powered SEO & Programmatic Search",
        summary: "Semantic search optimization, automated content outlines, internal link architecture, and search intent targeting."
      },
      {
        week: "Week 4",
        title: "Visual Assets & Dynamic Ad Creative Generation",
        summary: "Generating photorealistic visual assets, graphic concepts, product mockups, and multi-variant creative tests."
      },
      {
        week: "Week 5 & 6",
        title: "Automated Omnichannel Growth Funnels",
        summary: "Connecting your creative engine to social schedulers, CRM platforms, and performance analytics dashboards."
      }
    ],
    faqs: [
      {
        q: "Will the content sound robotic?",
        a: "No. You will learn advanced voice-calibration and human-in-the-loop editing to produce authentic, human-sounding content."
      }
    ]
  },
  {
    id: "ai-automation",
    number: "05",
    title: "AI Automation & Workflow Design",
    formerTitle: "Currently: AI Automation",
    school: "applications",
    schoolName: "School of AI Applications",
    track: "Business & Industry Applications",
    trackClass: "business",
    level: "Intermediate",
    duration: "6 weeks",
    format: "Hands-on automation lab",
    price: "$600",
    image: "./Data & Analytics Essentials.png",
    badge: null,
    purpose: "Design and automate resilient, connected business workflows using modern no-code AI tools and intelligent assistants.",
    description: "Learn how to eliminate repetitive operational tasks by bridging your business applications with AI. Master no-code automation platforms like Make.com and Zapier, integrate AI assistants into daily operations, and architect scalable business process automation.",
    topics: [
      "No-code automation",
      "AI workflows",
      "Zapier",
      "Make",
      "AI assistants",
      "Business process automation"
    ],
    targetAudience: [
      "Operations teams",
      "Entrepreneurs",
      "Professionals"
    ],
    learningOutcomes: [
      "Build multi-step automated workflows with Zapier and Make.com",
      "Embed AI reasoning into business forms, lead qualification, and customer support",
      "Connect CRMs, email clients, databases, and communication channels seamlessly",
      "Create autonomous internal AI assistants for departmental operations",
      "Build error handling, webhook routers, and fallback pipelines"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "No-Code Automation Foundations",
        summary: "Webhooks, API triggers, JSON basics, and workflow design principles across Make.com and Zapier."
      },
      {
        week: "Week 2",
        title: "Injecting AI into Automated Pipelines",
        summary: "Routing incoming leads, dynamic customer classification, automated sentiment sorting, and contextual replies."
      },
      {
        week: "Week 3",
        title: "Building Intelligent Operations Assistants",
        summary: "Connecting Slack, WhatsApp, and Microsoft Teams to custom AI backends for instant internal knowledge retrieval."
      },
      {
        week: "Week 4",
        title: "Document & Invoice Processing Pipelines",
        summary: "Automated OCR extraction, contract parsing, data cleaning, and synchronization into Google Sheets and Airtable."
      },
      {
        week: "Week 5 & 6",
        title: "Complex Multi-Branch Architecture & Live Deployment",
        summary: "Error handling, rate limits, enterprise security, and building an automated end-to-end business pipeline."
      }
    ],
    faqs: [
      {
        q: "Do I need coding experience?",
        a: "No coding is required. We teach visual no-code builders (Make.com, Zapier, Airtable) alongside AI API triggers."
      }
    ]
  },
  {
    id: "prompt-engineering",
    number: "06",
    title: "Prompt Engineering & AI Communication",
    formerTitle: "Currently: Prompt Engineering",
    school: "engineering",
    schoolName: "School of AI Engineering",
    track: "Technical AI Track",
    trackClass: "tech",
    level: "Technical Foundation",
    duration: "4 weeks",
    format: "Interactive prompting lab",
    price: "$400",
    image: "./Modern Blue Workspace with Graduation Icon.png",
    badge: "Core Technical Foundation",
    purpose: "Master precision prompt design, structured output architectures, and chain-of-thought reasoning systems.",
    description: "The essential starting point for all technical AI tracks. Learn how to systematically communicate with LLMs using structured schemas, role conditioning, reasoning scaffolding, few-shot conditioning, and workflow-level prompt orchestration.",
    topics: [
      "Prompt design principles",
      "Structured prompting",
      "Role prompting",
      "Chain-of-thought concepts",
      "Workflow prompting",
      "Business prompting"
    ],
    targetAudience: [
      "Everyone (Universal technical foundation)",
      "Developers",
      "Product managers",
      "Analysts"
    ],
    learningOutcomes: [
      "Write deterministic, reproducible prompts that eliminate hallucinations",
      "Enforce strict JSON schemas, XML wrappers, and structured data outputs",
      "Implement Chain-of-Thought (CoT) and Tree-of-Thought (ToT) reasoning paths",
      "Build reusable system prompt libraries for software and business workflows",
      "Evaluate prompt latency, token economy, and model degradation"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "Prompt Architecture & Foundational Principles",
        summary: "Context management, delimiters, instructions vs reference data, and controlling temperature and top-p."
      },
      {
        week: "Week 2",
        title: "Role Conditioning & Structured Outputs",
        summary: "System prompts, XML tagging, persona alignment, JSON Mode, and Pydantic/Zod schema enforcement."
      },
      {
        week: "Week 3",
        title: "Advanced Reasoning & Chain-of-Thought",
        summary: "Step-by-step reasoning scaffolds, few-shot demonstration selection, and self-critique verification loops."
      },
      {
        week: "Week 4",
        title: "Workflow Prompting & Enterprise Prompt Systems",
        summary: "Chaining prompts into resilient DAGs, automated prompt regression testing, and token optimization."
      }
    ],
    faqs: [
      {
        q: "Why take this before AI Engineering?",
        a: "Prompt design is the programming language of foundation models. Mastering it prevents 90% of downstream system bugs."
      }
    ]
  },
  {
    id: "ai-agents",
    number: "07",
    title: "Building AI Assistants & AI Agents",
    formerTitle: "Currently: Introduction to AI Agents",
    school: "engineering",
    schoolName: "School of AI Engineering",
    track: "Technical AI Track",
    trackClass: "tech",
    level: "Intermediate Technical",
    duration: "6 weeks",
    format: "Code & agent architecture lab",
    price: "$700",
    image: "./Empowering Africa's AI Learners.png",
    badge: null,
    purpose: "Architect autonomous agents, multi-agent collaboration systems, and persistent memory workflows.",
    description: "Move beyond single prompt-response interactions. Learn how to engineer autonomous AI agents capable of planning, reflection, persistent memory, tool use, and multi-agent coordination for complex real-world business tasks.",
    topics: [
      "AI agents",
      "Multi-agent systems",
      "Agent workflows",
      "Memory systems",
      "Tool use",
      "Business applications"
    ],
    targetAudience: [
      "Developers",
      "Technical professionals",
      "Software engineers"
    ],
    learningOutcomes: [
      "Understand the ReAct (Reason + Act) loop and cognitive agent architectures",
      "Equip agents with dynamic tool use, API calling, and database querying",
      "Implement short-term working memory and long-term vector/state memory",
      "Design multi-agent orchestrations with supervisor and peer coordination",
      "Deploy robust agent error handling, runaway loop guards, and sandboxes"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "Agent Fundamentals & The ReAct Paradigm",
        summary: "Perception, reasoning, action, and observation cycles. Building your first autonomous agent from scratch."
      },
      {
        week: "Week 2",
        title: "Tool Use & Function Calling",
        summary: "Defining schemas for external tools, web search, database connections, and third-party API integration."
      },
      {
        week: "Week 3",
        title: "State Management & Memory Systems",
        summary: "Episodic vs semantic memory, conversation buffers, vector-indexed memory stores, and session persistence."
      },
      {
        week: "Week 4",
        title: "Multi-Agent Systems & Coordination",
        summary: "Hierarchical supervisor patterns, swarm architectures, role delegation, and inter-agent communication protocols."
      },
      {
        week: "Week 5 & 6",
        title: "Production Deployment & Capstone Agent",
        summary: "Guardrails, token budget limits, observability (LangSmith/Helicone), and launching a live autonomous agent."
      }
    ],
    faqs: [
      {
        q: "What coding languages will be used?",
        a: "We primarily utilize Python and TypeScript, with frameworks such as LangGraph, CrewAI, and native API tool calling."
      }
    ]
  },
  {
    id: "ai-engineering",
    number: "08",
    title: "AI Engineering with Claude, APIs, RAG & MCP",
    formerTitle: "Currently: Mastering Claude AI",
    school: "engineering",
    schoolName: "School of AI Engineering",
    track: "Technical AI Track",
    trackClass: "tech",
    level: "Advanced Technical",
    duration: "8 weeks",
    format: "Advanced developer studio",
    price: "$950",
    image: "./mega-promo-academy.png",
    badge: null,
    purpose: "Build production-grade enterprise AI applications with frontier LLM APIs, knowledge bases, RAG, and Model Context Protocol (MCP).",
    description: "An intensive technical deep-dive for builders. Master the Anthropic Claude API, OpenAI API, high-performance Retrieval-Augmented Generation (RAG) architectures, vector indexing, knowledge graph integration, and Anthropic's open Model Context Protocol (MCP).",
    topics: [
      "Claude API",
      "OpenAI API",
      "RAG systems",
      "MCP (Model Context Protocol)",
      "Knowledge bases",
      "Enterprise AI applications"
    ],
    targetAudience: [
      "Developers",
      "AI Engineers",
      "Technical founders"
    ],
    learningOutcomes: [
      "Integrate the Claude 3.5 & OpenAI API suites with streaming, caching, and batching",
      "Build production-grade RAG systems with hybrid search, re-ranking, and chunking",
      "Implement Model Context Protocol (MCP) servers and clients for enterprise tools",
      "Optimize vector embeddings, vector databases, and semantic search retrieval",
      "Deploy scalable, compliant enterprise AI backends into production clouds"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "Claude & OpenAI Developer APIs Deep-Dive",
        summary: "Streaming, prompt caching, token budgets, context window strategies, and fine-grained parameter tuning."
      },
      {
        week: "Week 2",
        title: "Vector Embeddings & Knowledge Chunking Strategies",
        summary: "Chunking heuristics, embedding models comparison, semantic distance, and indexing strategies."
      },
      {
        week: "Week 3",
        title: "Advanced RAG Pipelines & Hybrid Retrieval",
        summary: "BM25 keyword search combined with vector similarity, re-ranking models (Cohere), and query expansion."
      },
      {
        week: "Week 4",
        title: "Model Context Protocol (MCP) Fundamentals",
        summary: "Understanding the MCP architecture, resources, prompts, and tools. Connecting LLMs securely to external systems."
      },
      {
        week: "Week 5",
        title: "Building Custom MCP Servers",
        summary: "Developing and deploying custom MCP servers for local filesystems, internal SQL databases, and enterprise APIs."
      },
      {
        week: "Week 6-8",
        title: "Enterprise Application Architecture & Capstone",
        summary: "Full-stack integration, caching, latency optimization, observability, and capstone deployment."
      }
    ],
    faqs: [
      {
        q: "What are the prerequisites?",
        a: "Proficiency in Python or JavaScript/TypeScript, familiarity with REST APIs, and foundational database concepts."
      }
    ]
  },
  {
    id: "claude-code",
    number: "09",
    title: "AI-Powered Software Development with Claude Code",
    formerTitle: "Replacing 'Vibe Coding' in official catalog",
    school: "engineering",
    schoolName: "School of AI Engineering",
    track: "Technical AI Track",
    trackClass: "tech",
    level: "Advanced Technical",
    duration: "6 weeks",
    format: "Hands-on coding cohort",
    price: "$750",
    image: "./a6835c49-3613-4fa9-bb3b-672f764bd41d.png",
    badge: "Official Catalog Designation",
    purpose: "Ship full-stack software, automate debugging, and rapidly prototype using Claude Code workflows.",
    description: "Replace unstructured 'vibe coding' with disciplined, professional AI-assisted software engineering. Learn how to wield the Claude Code CLI, automate multi-file refactoring, execute terminal workflows, build test suites, and architect full-stack applications at unprecedented speed.",
    topics: [
      "Claude Code",
      "AI coding workflows",
      "Full-stack development",
      "AI-assisted debugging",
      "Rapid prototyping"
    ],
    targetAudience: [
      "Developers",
      "Software engineers",
      "Technical founders"
    ],
    learningOutcomes: [
      "Operate the Claude Code agentic CLI across terminal environments",
      "Execute safe, multi-file code refactors and architectural migrations",
      "Automate bug reproduction, root-cause diagnosis, and automated patch testing",
      "Prototype complete full-stack web and mobile apps in days rather than months",
      "Maintain high code quality, test coverage, and documentation standards"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "The Agentic CLI & Claude Code Foundations",
        summary: "Installing, configuring, and orchestrating Claude Code in the terminal. Context files, permissions, and tool loops."
      },
      {
        week: "Week 2",
        title: "Rapid Prototyping & Architecture Generation",
        summary: "Scaffolding modern full-stack web applications, schema design, API definitions, and rapid frontend assembly."
      },
      {
        week: "Week 3",
        title: "AI-Assisted Debugging & Root Cause Analysis",
        summary: "Feeding stack traces, reproduction scripts, unit test creation, and automated fix verification."
      },
      {
        week: "Week 4",
        title: "Large Codebase Navigation & Multi-File Refactoring",
        summary: "Dependency graph parsing, safe module extraction, type-safe migrations, and technical debt elimination."
      },
      {
        week: "Week 5 & 6",
        title: "Production CI/CD, Testing & Capstone Project",
        summary: "Automated PR reviews, unit/integration testing pipelines, and shipping a live production app built with Claude Code."
      }
    ],
    faqs: [
      {
        q: "Is this course only for experienced coders?",
        a: "Basic programming familiarity (Git, terminal, HTML/JS or Python) is recommended to maximize what you build."
      }
    ]
  },
  {
    id: "cloud-computing",
    number: "10",
    title: "Cloud Computing for AI & Modern Applications",
    formerTitle: "Currently: Cloud Computing",
    school: "cloud",
    schoolName: "School of Cloud & Emerging Technologies",
    track: "Infrastructure & Technology Track",
    trackClass: "infra",
    level: "Infrastructure & Systems",
    duration: "8 weeks",
    format: "Multi-cloud sandbox & labs",
    price: "$800",
    image: "./ecbd7792-8547-4613-94ac-f25997fac3c6.png",
    badge: null,
    purpose: "Deploy, scale, and manage resilient modern cloud infrastructure and AI workloads across AWS, Azure, and Google Cloud.",
    description: "The infrastructure backbone of modern AI. Learn core cloud fundamentals, compute, storage, serverless execution, and container orchestration across AWS, Microsoft Azure, and Google Cloud Platform (GCP) tailored for AI model deployment and modern web applications.",
    topics: [
      "Cloud fundamentals",
      "AWS",
      "Azure",
      "Google Cloud",
      "AI infrastructure",
      "Deployment basics"
    ],
    targetAudience: [
      "Developers",
      "IT professionals",
      "DevOps engineers",
      "Cloud practitioners"
    ],
    learningOutcomes: [
      "Design multi-cloud compute, networking, and storage architectures",
      "Deploy containerized AI backends using Docker and Kubernetes",
      "Navigate cloud AI services across AWS Bedrock/SageMaker, Azure OpenAI, and GCP Vertex AI",
      "Implement serverless functions, API gateways, and automated deployment pipelines",
      "Optimize cloud billing, GPU allocations, and infrastructure security"
    ],
    syllabus: [
      {
        week: "Week 1",
        title: "Cloud Computing Fundamentals & Architecture",
        summary: "Core cloud concepts: IaaS, PaaS, SaaS, VPCs, subnets, IAM security, and multi-region redundancy."
      },
      {
        week: "Week 2 & 3",
        title: "AWS Infrastructure & AI Services",
        summary: "EC2, S3, Lambda, API Gateway, Docker deployment with ECS/Fargate, and AWS Bedrock model endpoints."
      },
      {
        week: "Week 4 & 5",
        title: "Microsoft Azure & Enterprise AI Stacks",
        summary: "Azure Virtual Machines, App Services, Blob storage, Azure OpenAI Service integration, and Entra ID security."
      },
      {
        week: "Week 6",
        title: "Google Cloud Platform (GCP) & Vertex AI",
        summary: "GCP Cloud Run, Cloud Functions, BigQuery basics, and Vertex AI model deployment pipelines."
      },
      {
        week: "Week 7 & 8",
        title: "Production Infrastructure & Capstone Deployment",
        summary: "CI/CD automated pipelines, monitoring, cost optimization, and deploying a scalable AI application."
      }
    ],
    faqs: [
      {
        q: "Do I get cloud credits for labs?",
        a: "Yes. Guided sandbox instructions and free-tier allocation guidelines are provided for all three major clouds."
      }
    ]
  }
];

// Helper index by ID for O(1) retrieval
const COURSES_BY_ID = {};
COURSES_DATA.forEach(c => {
  COURSES_BY_ID[c.id] = c;
});

// Attach to window if in browser environment
if (typeof window !== "undefined") {
  window.COURSES_DATA = COURSES_DATA;
  window.COURSES_BY_ID = COURSES_BY_ID;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { COURSES_DATA, COURSES_BY_ID };
}
