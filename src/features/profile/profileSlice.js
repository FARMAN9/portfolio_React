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
  heroTitle: "MERN and Python developer building practical web products",
  heroDescription: "I build responsive React and React Native interfaces, Python/Django backends, and data-driven projects with a focus on clean delivery, fast learning, and useful user experiences.",
  aboutPara1: "I am an aspiring full-stack developer from Jammu and Kashmir, India, with hands-on work across React, React Native, Node.js, Django, Python, and machine-learning projects. My public GitHub profile shows 41 repositories spanning portfolio apps, MERN chat, Django, data science, computer vision, and clone builds.",
  aboutPara2: "My LinkedIn public profile positions me around MERN and Python development, with internship experience connected to CID Srinagar and education listed at the University of Kashmir. I like turning small ideas into complete products: readable code, polished interfaces, and deployable outcomes.",
  experienceYears: "3+",
  projectsCompleted: "10+",
  happyClients: "2+",
  publicRepos: "41",
  focusAreas: ["React", "React Native", "MERN", "Python", "Django", "Machine Learning"],
  githubUrl: "https://github.com/FARMAN9",
  linkedinUrl: "https://www.linkedin.com/in/farman9",
  leetcodeUrl: "https://leetcode.com/saeedfarman9/",
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
