import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/projects/projectsSlice';
import authReducer from '../features/auth/authSlice';
import skillsReducer from '../features/skills/skillsSlice';
import profileReducer from '../features/profile/profileSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    auth: authReducer,
    skills: skillsReducer,
    profile: profileReducer,
  },
});
