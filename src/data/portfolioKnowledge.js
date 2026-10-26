export const portfolioProfile = {
  name: "Syed Farman Ali",
  title: "MERN and Python developer building practical web products",
  location: "Jammu and Kashmir, India",
  email: "saeedfarman9@gmail.com",
  phone: "+916005943382",
  experienceYears: "3+",
  projectsCompleted: "10+",
  happyClients: "2+",
  publicRepos: "41",
  education: [
    {
      institution: "University of Kashmir",
      detail: "University education listed on public LinkedIn profile",
    },
    {
      institution: "SKUAST-Kashmir",
      detail: "Academic and research collaboration in AI, ML, Web, and IoT",
    },
  ],
  scholarUrl: "https://scholar.google.com/citations?user=y-lv0B0AAAAJ",
  affiliation: "SKUAST-Kashmir",
  publications: [
    {
      title: "Integrated Morphometric and Cardiac Phenotyping of Kashmir Sheep Using Digital Auscultation and Machine Learning",
      journal: "SSRN",
      authors: "A Hamadani, H Hamadani, SF Ali, M Qureshi, et al.",
      year: "2024"
    },
    {
      title: "Assessing Heart Rate and Digital Auscultation in Kashmir Sheep",
      journal: "SSRN",
      authors: "A Hamadani, SF Ali, M Qureshi, H Hussain, et al.",
      year: "2024"
    }
  ],
  resumeHighlights: [
    "MERN and Python developer",
    "React and React Native interface development",
    "Python/Django backend development",
    "Machine-learning and data-driven project work",
    "Internship experience connected to CID Srinagar",
    "Published research in AI/ML & Digital Auscultation (Google Scholar / SSRN)",
  ],
  githubUrl: "https://github.com/FARMAN9",
  linkedinUrl: "https://www.linkedin.com/in/farman9",
  leetcodeUrl: "https://leetcode.com/saeedfarman9/",
  resumeUrl: "https://rxresu.me/farman9/python-django-developer",
  summary:
    "Farman is an aspiring full-stack developer focused on React, React Native, MERN, Python, Django, and machine-learning projects. He builds responsive interfaces, practical backend features, and publishes research on AI/ML.",
  experience:
    "His experience spans MERN, Python, and machine-learning projects with internship experience connected to CID Srinagar, alongside research affiliations with SKUAST-Kashmir.",
};

export const portfolioSkills = [
  { name: "Python", value: 84 },
  { name: "React", value: 78 },
  { name: "React Native", value: 66 },
  { name: "JavaScript", value: 76 },
  { name: "Django", value: 68 },
  { name: "Node.js / MERN", value: 64 },
  { name: "HTML / CSS", value: 82 },
  { name: "Machine Learning", value: 58 },
];

export const portfolioProjects = [
  {
    name: "Portfolio React",
    description: "Modern personal portfolio built with React, Redux, Vite, animated UI sections, and deployable project showcases.",
    link: "https://github.com/FARMAN9/portfolio_React",
    demo: "https://portfolio-react-theta-steel.vercel.app",
    tech: ["React", "Redux", "Vite", "CSS"],
  },
  {
    name: "ChatAPP MERN",
    description: "Full-stack MERN chat application with a deployed web experience.",
    link: "https://github.com/FARMAN9/ChatAPP-MERN",
    demo: "https://chatapp-mern-vvn5.onrender.com/",
    tech: ["MongoDB", "Express", "React", "Node"],
  },
  {
    name: "Diabetes Prediction",
    description: "Machine-learning web project for predicting diabetes risk from health inputs.",
    link: "https://github.com/FARMAN9/Diabetes-prediction",
    demo: "https://diabetes-prediction-sooty.vercel.app",
    tech: ["Python", "ML", "HTML", "CSS"],
  },
  {
    name: "Old News Paper",
    description: "News-style web app with a clean JavaScript-driven browsing interface.",
    link: "https://github.com/FARMAN9/new_paper",
    demo: "https://oldnews-paper.vercel.app/",
    tech: ["JavaScript", "React", "API"],
  },
  {
    name: "Django Portfolio",
    description: "Portfolio implementation using Django and Python backend practice.",
    link: "https://github.com/FARMAN9/portfoilo_django",
    demo: "https://portfoilo-django.vercel.app",
    tech: ["Django", "Python", "HTML"],
  },
  {
    name: "Myntra Clone",
    description: "React ecommerce storefront clone with product-focused UI components.",
    link: "https://github.com/FARMAN9/myntra-clone-",
    tech: ["React", "JavaScript", "CSS"],
  },
  {
    name: "YouTube Clone",
    description: "React clone project practicing reusable components and media-style browsing screens.",
    link: "https://github.com/FARMAN9/youtube-clone",
    tech: ["React", "JavaScript", "CSS"],
  },
  {
    name: "CityCabs",
    description: "Live cab-service website focused on a simple user-facing service presence.",
    link: "https://www.citycabs.live/",
    demo: "https://www.citycabs.live/",
    tech: ["Web", "Responsive UI"],
  },
  {
    name: "Star Beekeepers",
    description: "Live honey-store website with a product-focused storefront experience for Star Beekeepers.",
    link: "https://star-beekekpers.vercel.app/",
    demo: "https://star-beekekpers.vercel.app/",
    tech: ["React", "Vercel", "Storefront"],
  },
];

const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9+#.\s]/g, " ");

export function createPortfolioContext(profile = portfolioProfile, skills = portfolioSkills, projects = portfolioProjects) {
  return `
Name: ${profile.name}
Title: ${profile.title}
Location: ${profile.location}
Summary: ${profile.summary}
Experience: ${profile.experienceYears} years. ${profile.experience}
Education: ${(profile.education || portfolioProfile.education).map((item) => `${item.institution} - ${item.detail}`).join("; ")}
Resume highlights: ${(profile.resumeHighlights || portfolioProfile.resumeHighlights).join(", ")}
Projects completed: ${profile.projectsCompleted}
Happy clients: ${profile.happyClients}
Public GitHub repositories: ${profile.publicRepos}
Email: ${profile.email}
Phone: ${profile.phone}
GitHub: ${profile.githubUrl}
LinkedIn: ${profile.linkedinUrl}
LeetCode: ${profile.leetcodeUrl}
Resume: ${profile.resumeUrl}
Skills: ${skills.map((skill) => `${skill.name} (${skill.value}%)`).join(", ")}
Projects:
${projects.map((project) => `- ${project.name}: ${project.description} Tech: ${(project.tech || []).join(", ")}. Code: ${project.link}${project.demo ? `. Live: ${project.demo}` : ""}`).join("\n")}
  `.trim();
}

export function answerPortfolioQuestion(question, profile = portfolioProfile, skills = portfolioSkills, projects = portfolioProjects) {
  const q = normalize(question);
  const topSkills = skills.slice(0, 8).map((skill) => skill.name).join(", ");
  const featuredProjects = projects.slice(0, 5).map((project) => project.name).join(", ");

  // Greetings
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("greetings") || q.includes("salaam") || q.includes("namaste")) {
    return `Hello! 👋 I'm Farman's AI portfolio companion. Ask me anything about Farman's projects, technical skills (React, Python, Django, MERN), work experience, or how to get in touch!`;
  }

  // How are you
  if (q.includes("how are you") || q.includes("how r u") || q.includes("whats up") || q.includes("what s up")) {
    return `I'm doing great, thank you for asking! 😊 Ready to help you discover Farman's work. What would you like to explore—projects, tech stack, or experience?`;
  }

  // Contact / Email / Phone / Hire
  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach") || q.includes("call") || q.includes("message")) {
    return `You can reach ${profile.name} directly:\n📧 Email: ${profile.email}\n📱 Phone: ${profile.phone}\n📍 Location: ${profile.location}\nLinkedIn: ${profile.linkedinUrl}\n\nHe is actively open to internships, full-time roles, freelance projects, and full-stack collaborations!`;
  }

  // Specific project queries
  if (q.includes("chatapp") || q.includes("chat app")) {
    const p = projects.find(item => item.name.toLowerCase().includes("chatapp")) || projects[1];
    return `💬 **${p.name}** is a full-stack MERN real-time chat application built with MongoDB, Express, React, and Node.js.\nLive Demo: ${p.demo || "Available online"}\nGitHub Repo: ${p.link}`;
  }

  if (q.includes("diabetes") || q.includes("prediction") || q.includes("ml project")) {
    const p = projects.find(item => item.name.toLowerCase().includes("diabetes")) || projects[2];
    return `🩺 **${p.name}** is a machine learning web app predicting diabetes risk from clinical health indicators using Python, scikit-learn, and a responsive frontend.\nLive Demo: ${p.demo}\nGitHub Repo: ${p.link}`;
  }

  if (q.includes("citycabs") || q.includes("city cabs") || q.includes("cab")) {
    const p = projects.find(item => item.name.toLowerCase().includes("citycabs")) || projects[7];
    return `🚖 **${p.name}** is a live commercial cab-booking website built for responsive online reservations and customer engagement.\nLive Website: ${p.demo || p.link}`;
  }

  if (q.includes("star beekeeper") || q.includes("honey") || q.includes("bee")) {
    const p = projects.find(item => item.name.toLowerCase().includes("star")) || projects[8];
    return `🍯 **${p.name}** is an online honey storefront website built with React and deployed on Vercel.\nLive Storefront: ${p.demo || p.link}`;
  }

  if (q.includes("news") || q.includes("newspaper")) {
    const p = projects.find(item => item.name.toLowerCase().includes("news")) || projects[3];
    return `📰 **${p.name}** is a responsive digital newspaper web app built with JavaScript and React, consuming live headlines.\nLive App: ${p.demo}\nGitHub Repo: ${p.link}`;
  }

  // Specific tech queries
  if (q.includes("python") || q.includes("django")) {
    return `🐍 Python & Django are core strengths of ${profile.name} (Proficiency: 84%). He has built machine learning web apps, Django server-rendered backends, REST APIs, and automated pipelines. GitHub: ${profile.githubUrl}`;
  }

  if (q.includes("react") || q.includes("react native") || q.includes("frontend")) {
    return `⚛️ ${profile.name} specializes in React (78%) and React Native (66%) for cross-platform mobile apps. He crafts modern, responsive interfaces with Redux Toolkit, Three.js 3D animations, and smooth CSS micro-interactions.`;
  }

  if (q.includes("mern") || q.includes("node") || q.includes("express") || q.includes("mongodb")) {
    return `🌐 ${profile.name} has hands-on experience building full-stack MERN (MongoDB, Express, React, Node.js) web applications, complete with JWT authentication, RESTful APIs, and cloud deployments.`;
  }

  if (q.includes("machine learning") || q.includes("ai") || q.includes("data science")) {
    return `🤖 ${profile.name} applies Machine Learning (Python, scikit-learn, predictive analytics) to real-world healthcare and classification applications, including his live Diabetes Prediction web app.`;
  }

  // General Skills / Tech stack
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language") || q.includes("framework")) {
    return `🛠️ **Technical Arsenal**:\n• Languages: Python (84%), JavaScript (76%), HTML/CSS (82%)\n• Frontend: React (78%), React Native (66%), Redux, Three.js\n• Backend: Django (68%), Node.js/Express, REST APIs\n• Data/AI: Machine Learning (58%), SQLite, MongoDB\n• Tools: Git/GitHub, Vite, Vercel, Docker`;
  }

  // Projects list
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("github") || q.includes("repo")) {
    return `🚀 ${profile.name} has built ${profile.projectsCompleted} completed projects and maintains ${profile.publicRepos} public repositories on GitHub.\nKey Highlights:\n1. Portfolio React (Modern 3D portfolio)\n2. ChatAPP MERN (Realtime messaging)\n3. Diabetes Prediction (ML health model)\n4. CityCabs (Live cab booking)\n5. Star Beekeepers (Ecommerce storefront)\nGitHub: ${profile.githubUrl}`;
  }

  // Education & University
  if (q.includes("education") || q.includes("study") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("school")) {
    return `🎓 ${profile.name} pursued his university education at ${profile.education[0].institution} in Jammu & Kashmir. He combines formal academics with real-world production development and competitive coding.`;
  }

  // Experience / Internship / CID
  if (q.includes("experience") || q.includes("intern") || q.includes("cid") || q.includes("company") || q.includes("background")) {
    return `💼 ${profile.name} brings ${profile.experienceYears} of practical software development experience. His journey includes internship experience connected to CID Srinagar, alongside client projects and open-source contributions.`;
  }

  // Resume / CV
  if (q.includes("resume") || q.includes("cv")) {
    return `📄 You can view and download ${profile.name}'s up-to-date resume here:\n${profile.resumeUrl}\nIt details his MERN, Python/Django, React Native, ML, and internship achievements.`;
  }

  // Google Scholar / Research Publications
  if (q.includes("scholar") || q.includes("research") || q.includes("paper") || q.includes("publication") || q.includes("skuast") || q.includes("ssrn") || q.includes("citation")) {
    return `📚 **Google Scholar & Research Publications**:\n${profile.name} has published research in machine learning and cardiac phenotyping connected to SKUAST-Kashmir.\n\nPublications include:\n• "Integrated Morphometric and Cardiac Phenotyping of Kashmir Sheep Using Digital Auscultation and Machine Learning" (SSRN)\n• "Assessing Heart Rate and Digital Auscultation in Kashmir Sheep" (SSRN)\n\n🔗 Google Scholar Profile:\n${profile.scholarUrl || "https://scholar.google.com/citations?user=y-lv0B0AAAAJ"}`;
  }

  // Location / Where
  if (q.includes("where do you live") || q.includes("where are you located") || q.includes("where is farman") || q.includes("where are you from") || q.includes("location") || q.includes("from kashmir")) {
    return `📍 ${profile.name} is based in ${profile.location}, India. He is available for remote opportunities worldwide as well as on-site roles.`;
  }

  // Who is Farman / About
  if (q.includes("who is farman") || q.includes("tell me about farman") || q.includes("who are you") || q.includes("about farman") || q.includes("intro") || q.includes("bio")) {
    return `👋 ${profile.name} is a versatile MERN and Python developer based in ${profile.location}. He is passionate about building practical, beautiful web applications, cross-platform mobile apps in React Native, and data-driven systems.`;
  }

  // LeetCode / Coding practice
  if (q.includes("leetcode") || q.includes("dsa") || q.includes("algorithm") || q.includes("problem solving")) {
    return `🧩 ${profile.name} actively practices problem-solving and algorithms on LeetCode: ${profile.leetcodeUrl}`;
  }

  // What is this site built with
  if (q.includes("this website") || q.includes("this site") || q.includes("portfolio built")) {
    return `✨ This portfolio is built with React 18, Vite, Redux Toolkit, Three.js (@react-three/fiber & drei) for interactive 3D, and custom CSS glassmorphism, complete with an AI assistant, 3D VR Mode, and royalty-free Lo-Fi audio player!`;
  }

  return `👋 ${profile.name} is a full-stack MERN & Python developer from ${profile.location} with ${profile.projectsCompleted} projects, ${profile.experienceYears} years experience, and published AI/ML research.\nFeel free to ask about his:\n• 💼 Skills (Python, React, Django, ML)\n• 🚀 Projects (ChatApp, Diabetes ML, CityCabs)\n• 📚 Research & Google Scholar\n• 📄 Resume or 📬 Contact info!`;
}
