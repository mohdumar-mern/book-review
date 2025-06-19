import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

// ✅ Login thunk
export const login = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/auth/login", credentials);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
  }
});

// ✅ Register thunk
export const register = createAsyncThunk("auth/register", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/auth/register", credentials);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Register failed");
  }
});

// ✅ Update user profile thunk
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ id, formData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.put(`/auth/user/${id}`, formData, config);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Update localStorage
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// ✅ Initial state
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  userId: user ? JSON.parse(user)._id : null,
  userName: user ? JSON.parse(user).name : null,
  userEmail: user ? JSON.parse(user).email : null,
  userRole: user ? JSON.parse(user).role : null,
  token: token || null,
  loading: false,
  error: null,
};

// ✅ Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.userId = null;
      state.userName = null;
      state.userEmail = null;
      state.userRole = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔹 Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.user._id;
        state.userName = action.payload.user.name;
        state.userEmail = action.payload.user.email;
        state.userRole = action.payload.user.role;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.user._id;
        state.userName = action.payload.user.name;
        state.userEmail = action.payload.user.email;
        state.userRole = action.payload.user.role;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.name;
        state.userEmail = action.payload.email;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
