import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch projects from our Express API
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Fallback static data in case the backend is down
const fallbackData = [
  { w_no: 1, name: "portfolio_React", imageUrl: "/projects/portfilo_react.png", link: "https://github.com/FARMAN9/portfolio_React" },
  { w_no: 2, name: "mytra", imageUrl: "/projects/mytra.png", link: "https://github.com/FARMAN9/myntra-clone-" },
  { w_no: 3, name: "youtube", imageUrl: "/projects/yt.png", link: "https://github.com/FARMAN9/youtube-clone" },
  { w_no: 4, name: "portfoilo_django", imageUrl: "/projects/django_port.png", link: "https://github.com/FARMAN9/portfoilo_django" },
  { w_no: 5, name: "DPS", imageUrl: "/projects/dpt.png", link: "https://github.com/FARMAN9/Diabetes-prediction" },
  { w_no: 6, name: "oldNews_paper", imageUrl: "/projects/news.png", link: "https://oldnews-paper.vercel.app/" },
  { w_no: 7, name: "citycabs", imageUrl: "/projects/citycabs.png", link: "https://www.citycabs.live/" },
  { w_no: 8, name: "soon", imageUrl: "/projects/coming_soon.gif", link: "/" }
];

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
        // Apply fallback data if backend is down
        state.items = fallbackData;
        console.warn("Backend unavailable. Fallback static projects loaded.");
      });
  }
});

export default projectsSlice.reducer;
