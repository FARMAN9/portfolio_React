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
  ],
  resumeHighlights: [
    "MERN and Python developer",
    "React and React Native interface development",
    "Python/Django backend development",
    "Machine-learning and data-driven project work",
    "Internship experience connected to CID Srinagar",
  ],
  githubUrl: "https://github.com/FARMAN9",
  linkedinUrl: "https://www.linkedin.com/in/farman9",
  leetcodeUrl: "https://leetcode.com/saeedfarman9/",
  resumeUrl: "https://rxresu.me/farman9/python-django-developer",
  summary:
    "Farman is an aspiring full-stack developer focused on React, React Native, MERN, Python, Django, and machine-learning projects. He builds responsive interfaces, practical backend features, and deployable portfolio products.",
  experience:
    "His public LinkedIn preview positions him around MERN and Python development with internship experience connected to CID Srinagar. His portfolio also references work connected with Jammu and Kashmir Police CID and Aharbal.",
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

  if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire")) {
    return `You can contact ${profile.name} at ${profile.email} or ${profile.phone}. He is open to internships, freelance work, and full-stack collaborations.`;
  }

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("react native")) {
    return `${profile.name}'s main skills are ${topSkills}. His focus areas include React, React Native, MERN, Python, Django, and machine-learning projects.`;
  }

  if (q.includes("education") || q.includes("study") || q.includes("college") || q.includes("university") || q.includes("degree")) {
    return `${profile.name}'s education is listed as ${profile.education[0].institution}. The public profile does not show a specific degree name, so the portfolio states the institution without guessing.`;
  }

  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("github")) {
    return `${profile.name} has ${profile.projectsCompleted} completed projects and ${profile.publicRepos} public GitHub repositories. Featured projects include ${featuredProjects}. GitHub: ${profile.githubUrl}`;
  }

  if (q.includes("experience") || q.includes("intern") || q.includes("cid") || q.includes("company")) {
    return `${profile.name} has ${profile.experienceYears} years of experience/practice. His public profile highlights MERN and Python development, with internship experience connected to CID Srinagar.`;
  }

  if (q.includes("resume") || q.includes("cv")) {
    return `${profile.name}'s resume highlights MERN, Python, React Native, Django, machine-learning projects, and internship experience connected to CID Srinagar. Resume link: ${profile.resumeUrl}`;
  }

  if (q.includes("where") || q.includes("location") || q.includes("from")) {
    return `${profile.name} is from ${profile.location}.`;
  }

  if (q.includes("who") || q.includes("about") || q.includes("intro") || q.includes("tell me")) {
    return `${profile.name} is a MERN and Python developer from ${profile.location}. He builds React and React Native interfaces, Python/Django backends, and data-driven projects.`;
  }

  return `${profile.name} is a full-stack developer focused on React, React Native, MERN, Python, Django, and machine-learning projects. Ask me about his skills, projects, experience, resume, or contact details.`;
}
