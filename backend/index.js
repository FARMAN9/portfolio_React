import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey';

app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- PROJECTS ---
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: { w_no: 'asc' } });
    res.json(projects);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.post('/api/projects', authenticateToken, async (req, res) => {
  try {
    const { w_no, name, imageUrl, link } = req.body;
    const newProject = await prisma.project.create({
      data: { w_no: parseInt(w_no), name, imageUrl, link }
    });
    res.status(201).json(newProject);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.put('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { w_no, name, imageUrl, link } = req.body;
    const updated = await prisma.project.update({
      where: { id: parseInt(id) },
      data: { w_no: parseInt(w_no), name, imageUrl, link }
    });
    res.json(updated);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/projects/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Deleted" });
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

// --- SKILLS ---
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { value: 'desc' } });
    res.json(skills);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.post('/api/skills', authenticateToken, async (req, res) => {
  try {
    const { name, value } = req.body;
    const newSkill = await prisma.skill.create({ data: { name, value: parseInt(value) } });
    res.status(201).json(newSkill);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.put('/api/skills/:id', authenticateToken, async (req, res) => {
  try {
    const { name, value } = req.body;
    const updated = await prisma.skill.update({
      where: { id: parseInt(req.params.id) },
      data: { name, value: parseInt(value) }
    });
    res.json(updated);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.delete('/api/skills/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.skill.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: "Deleted" });
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

// --- PROFILE ---
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await prisma.profile.findFirst();
    res.json(profile || {});
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    // ensure id is not overwritten
    delete data.id;
    let profile = await prisma.profile.findFirst();
    if (profile) {
      profile = await prisma.profile.update({ where: { id: profile.id }, data });
    } else {
      profile = await prisma.profile.create({ data });
    }
    res.json(profile);
  } catch (error) { res.status(500).json({ error: "Error" }); }
});

// --- CHATBOT AI ---
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Gemini API key is not configured on the server." });
    }

    const profile = await prisma.profile.findFirst();
    const skills = await prisma.skill.findMany();
    const projects = await prisma.project.findMany();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `
      You are an AI assistant on the personal portfolio website of ${profile?.name || 'Syed Farman Ali'}. 
      Your job is to answer questions from visitors about Farman's skills, experience, and projects.
      Always be polite, professional, and concise. Do not hallucinate information. If you don't know the answer, say so or direct them to the contact section.
      
      Here is the information about Farman:
      Title: ${profile?.heroTitle}
      About: ${profile?.heroDescription} ${profile?.aboutPara1} ${profile?.aboutPara2}
      Experience: ${profile?.experienceYears} years
      Projects Completed: ${profile?.projectsCompleted}
      Happy Clients: ${profile?.happyClients}
      
      Skills: ${skills.map(s => `${s.name} (${s.value}%)`).join(', ')}
      
      Projects Portfolio:
      ${projects.map(p => `- ${p.name}: ${p.link}`).join('\n')}
      
      Visitor's Question: "${message}"
    `;

    const result = await model.generateContent(systemPrompt);
    const responseText = result.response.text();
    
    res.json({ reply: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Failed to communicate with AI agent." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
