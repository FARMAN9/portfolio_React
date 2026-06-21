import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Login failed');
      }
      const data = await response.json();
      return data; // { token, username }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// We store the token in localStorage so the user remains logged in
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    username: username || null,
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.username = action.payload.username;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('username', action.payload.username);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
