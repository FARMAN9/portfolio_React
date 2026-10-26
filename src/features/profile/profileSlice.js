import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch, hasApiBaseUrl } from '../../utils/api';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    if (!hasApiBaseUrl) return fallbackData;

    const response = await apiFetch('/api/profile');
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  } catch (err) { return rejectWithValue(err.message); }
});

const fallbackData = {
  name: "Syed Farman Ali",
  location: "Gangoo, Pulwama, Jammu and Kashmir, India",
  village: "Gangoo",
  district: "Pulwama",
  state: "Jammu and Kashmir",
  heroTitle: "MERN, React Native & Python Engineer | Machine Learning Researcher",
  heroDescription: "I build responsive React and React Native interfaces, Python/Django backends, and data-driven projects with a focus on clean delivery, fast learning, and useful user experiences.",
  aboutPara1: "I am a full-stack developer and AI/ML researcher from Gangoo, Pulwama, Jammu and Kashmir, India, with hands-on work across React, React Native, Node.js, Django, Python, and machine-learning projects. My public GitHub profile shows 41 repositories spanning portfolio apps, MERN chat, Django, data science, and clone builds.",
  aboutPara2: "My background connects MERN and Python development with academic and research collaborations at SKUAST-Kashmir, engineering engagements with NIT, and internship experience connected to CID Srinagar. I like turning ideas into production products with readable code, polished interfaces, and deployable outcomes.",
  experienceYears: "3+",
  projectsCompleted: "10+",
  happyClients: "2+",
  publicRepos: "41",
  focusAreas: ["React", "React Native", "MERN", "Python", "Django", "Machine Learning"],
  affiliations: ["SKUAST-Kashmir", "National Institute of Technology (NIT)", "University of Kashmir"],
  githubUrl: "https://github.com/FARMAN9",
  linkedinUrl: "https://www.linkedin.com/in/farman9",
  leetcodeUrl: "https://leetcode.com/saeedfarman9/",
  scholarUrl: "https://scholar.google.com/citations?user=y-lv0B0AAAAJ",
  resumeUrl: "https://rxresu.me/farman9/python-django-developer"
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = Object.keys(action.payload).length > 0 ? action.payload : fallbackData;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = 'succeeded';
        state.error = null;
        state.data = fallbackData;
      });
  }
});

export default profileSlice.reducer;
