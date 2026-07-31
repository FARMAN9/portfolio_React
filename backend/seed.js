import pkg from '@prisma/client';
import { portfolioProfile, portfolioProjects, portfolioSkills } from '../src/data/portfolioKnowledge.js';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const initialProfile = {
  name: portfolioProfile.name,
  heroTitle: portfolioProfile.title,
  heroDescription: "I build responsive React and React Native interfaces, Python/Django backends, and data-driven projects with a focus on clean delivery, fast learning, and useful user experiences.",
  aboutPara1: "I am an aspiring full-stack developer from Jammu and Kashmir, India, with hands-on work across React, React Native, Node.js, Django, Python, and machine-learning projects.",
  aboutPara2: `${portfolioProfile.experience} Education: ${portfolioProfile.education[0].institution}.`,
  experienceYears: portfolioProfile.experienceYears,
  projectsCompleted: portfolioProfile.projectsCompleted,
  happyClients: portfolioProfile.happyClients,
  githubUrl: portfolioProfile.githubUrl,
  linkedinUrl: portfolioProfile.linkedinUrl,
  leetcodeUrl: portfolioProfile.leetcodeUrl,
  resumeUrl: portfolioProfile.resumeUrl
};

const initialSkills = portfolioSkills;
const initialProjects = portfolioProjects.map((project, index) => ({
  w_no: index + 1,
  name: project.name,
  imageUrl: project.imageUrl || "/projects/coming_soon.gif",
  link: project.demo || project.link
}));
const starBeekeepersProject = initialProjects.find((project) => project.name === "Star Beekeepers");

async function main() {
  console.log("Start seeding profile, skills, and projects...");
  
  // Seed Profile
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({ data: initialProfile });
    console.log("Seeded initial profile.");
  }

  // Seed Skills
  const existingSkillsCount = await prisma.skill.count();
  if (existingSkillsCount === 0) {
    for (const skill of initialSkills) {
      await prisma.skill.create({ data: skill });
    }
    console.log("Seeded initial skills.");
  }

  // Seed Projects
  const existingProjectsCount = await prisma.project.count();
  if (existingProjectsCount === 0) {
    for (const project of initialProjects) {
      await prisma.project.create({ data: project });
    }
    console.log("Seeded initial projects.");
  } else if (starBeekeepersProject) {
    const existingStarBeekeepers = await prisma.project.findFirst({
      where: { name: starBeekeepersProject.name }
    });

    if (!existingStarBeekeepers) {
      await prisma.project.create({ data: starBeekeepersProject });
      console.log("Seeded Star Beekeepers project.");
    }
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
