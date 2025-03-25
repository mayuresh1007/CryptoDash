import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API Base URL (Replace with your FastAPI server URL)
// const API_URL = "http://127.0.0.1:8000/auth";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);

      localStorage.setItem("token", data.token);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to fetch user details (auto-login)
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${API_URL}/me?token=${token}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//  Update Profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/auth/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Profile update failed");
      }

      return await response.json(); // Expected response: { name, email, avatar }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await fetch(`${API_URL}/logout`, { method: "POST" });
      localStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

const initialState = {
  profile: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.profile = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.profile = null;
        state.isLoggedIn = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload };
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
