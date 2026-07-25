import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk to fetch projects from our Express API
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error('No API URL configured');

      const response = await fetch(`${apiUrl}/api/projects`);
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
  {
    w_no: 1,
    name: "Portfolio React",
    description: "A modern personal portfolio built with React, Redux, animated UI sections, and deployable project showcases.",
    imageUrl: "/projects/portfilo_react.png",
    link: "https://github.com/FARMAN9/portfolio_React",
    demo: "https://portfolio-react-theta-steel.vercel.app",
    tech: ["React", "Redux", "Vite", "CSS"]
  },
  {
    w_no: 2,
    name: "ChatAPP MERN",
    description: "Full-stack chat application using the MERN stack with real-time style messaging and a deployed web experience.",
    imageUrl: "/projects/coming_soon.gif",
    link: "https://github.com/FARMAN9/ChatAPP-MERN",
    demo: "https://chatapp-mern-vvn5.onrender.com/",
    tech: ["MongoDB", "Express", "React", "Node"]
  },
  {
    w_no: 3,
    name: "Diabetes Prediction",
    description: "A machine-learning web project focused on predicting diabetes risk from user health inputs.",
    imageUrl: "/projects/dpt.png",
    link: "https://github.com/FARMAN9/Diabetes-prediction",
    demo: "https://diabetes-prediction-sooty.vercel.app",
    tech: ["Python", "ML", "HTML", "CSS"]
  },
  {
    w_no: 4,
    name: "Old News Paper",
    description: "A deployed news-style web app with a clean browsing experience and JavaScript-driven interface.",
    imageUrl: "/projects/news.png",
    link: "https://github.com/FARMAN9/new_paper",
    demo: "https://oldnews-paper.vercel.app/",
    tech: ["JavaScript", "React", "API"]
  },
  {
    w_no: 5,
    name: "Django Portfolio",
    description: "Portfolio implementation using Django patterns, focused on server-rendered presentation and backend practice.",
    imageUrl: "/projects/django_port.png",
    link: "https://github.com/FARMAN9/portfoilo_django",
    demo: "https://portfoilo-django.vercel.app",
    tech: ["Django", "Python", "HTML"]
  },
  {
    w_no: 6,
    name: "Myntra Clone",
    description: "React mini project recreating an ecommerce storefront flow with product-focused UI components.",
    imageUrl: "/projects/mytra.png",
    link: "https://github.com/FARMAN9/myntra-clone-",
    tech: ["React", "JavaScript", "CSS"]
  },
  {
    w_no: 7,
    name: "YouTube Clone",
    description: "React clone project practicing reusable components, content layout, and media-style browsing screens.",
    imageUrl: "/projects/yt.png",
    link: "https://github.com/FARMAN9/youtube-clone",
    tech: ["React", "JavaScript", "CSS"]
  },
  {
    w_no: 8,
    name: "CityCabs",
    description: "Live cab-service website project focused on a simple user-facing booking and service presence.",
    imageUrl: "/projects/citycabs.png",
    link: "https://www.citycabs.live/",
    demo: "https://www.citycabs.live/",
    tech: ["Web", "Responsive UI"]
  }
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
