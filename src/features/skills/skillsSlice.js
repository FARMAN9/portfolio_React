import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async (_, { rejectWithValue }) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) throw new Error('No API URL configured');

    const response = await fetch(`${apiUrl}/api/skills`);
    if (!response.ok) throw new Error('Failed to fetch skills');
    return await response.json();
  } catch (err) { return rejectWithValue(err.message); }
});

const fallbackData = [
  { name: 'Python', value: 84 },
  { name: 'React', value: 78 },
  { name: 'React Native', value: 66 },
  { name: 'JavaScript', value: 76 },
  { name: 'Django', value: 68 },
  { name: 'Node.js / MERN', value: 64 },
  { name: 'HTML / CSS', value: 82 },
  { name: 'Machine Learning', value: 58 },
];

const skillsSlice = createSlice({
  name: 'skills',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.items = fallbackData;
      });
  }
});

export default skillsSlice.reducer;
