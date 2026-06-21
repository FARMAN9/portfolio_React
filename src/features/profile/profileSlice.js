import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/api/profile');
    if (!response.ok) throw new Error('Failed to fetch profile');
    return await response.json();
  } catch (err) { return rejectWithValue(err.message); }
});

const fallbackData = {
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
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.data = fallbackData;
      });
  }
});

export default profileSlice.reducer;
