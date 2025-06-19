// src/features/review/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

// Async Thunk: Submit Review
export const submitReview = createAsyncThunk(
    "review/submitReview",
    async (reviewData, thunkAPI) => {
      try {
        const state = thunkAPI.getState();
        const token = state.auth.token;
  
        const response = await axios.post("/reviews", reviewData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response.data;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Review failed");
      }
    }
  );

  // 👉 Fetch all reviews for a specific book
export const fetchReviewsByBook = createAsyncThunk(
    "review/fetchReviewsByBook",
    async (bookId, thunkAPI) => {
      try {
        const res = await axios.get(`/reviews?bookId=${bookId}`);
        return res.data.reviews;
      } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to load reviews");
      }
    }
  );
  

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetReviewStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitReview.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReviewsByBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByBook.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsByBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewStatus } = reviewSlice.actions;
export default reviewSlice.reducer;
