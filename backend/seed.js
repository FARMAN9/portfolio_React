import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const initialProfile = {
  name: "I'm Syed Farman Ali,",
  heroTitle: "full stack developer based in India",
  heroDescription: "I am from Jammu and Kashmir, with 1 year of experience in multiple companies and organizations like Jammu and Kashmir Police (CID) and Aharbal.",
  aboutPara1: "I am an experienced Full Stack Developer with over a 1 year of professional expertise in the field. Throughout my career, I have had the privilege of collaborating with prestigious organizations, contributing to their success and growth.",
  aboutPara2: "My passion for frontend development is not only reflected in my extensive experience but also in the enthusiasm and dedication I bring to each project.",
  experienceYears: "1",
  projectsCompleted: "4+",
  happyClients: "2+",
  githubUrl: "https://github.com/farman9",
  linkedinUrl: "https://www.linkedin.com/in/farman9",
  leetcodeUrl: "https://leetcode.com/u/saeedfarman9/",
  resumeUrl: "https://rxresu.me/farman9/python-django-developer"
};

const initialSkills = [
  { name: 'JavaScript', value: 70 },
  { name: 'Python', value: 80 },
  { name: 'Java', value: 50 },
  { name: 'HTML', value: 75 },
  { name: 'CSS', value: 70 },
  { name: 'Django', value: 60 },
  { name: 'Fastapi', value: 50 },
];

async function main() {
  console.log("Start seeding profile and skills...");
  
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
