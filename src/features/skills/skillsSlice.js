import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSkills = createAsyncThunk('skills/fetchSkills', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:5000/api/skills');
    if (!response.ok) throw new Error('Failed to fetch skills');
    return await response.json();
  } catch (err) { return rejectWithValue(err.message); }
});

const fallbackData = [
  { name: 'JavaScript', value: 70 },
  { name: 'Python', value: 80 },
  { name: 'Java', value: 50 },
  { name: 'HTML', value: 75 },
  { name: 'CSS', value: 70 },
  { name: 'Django', value: 60 },
  { name: 'Fastapi', value: 50 },
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
