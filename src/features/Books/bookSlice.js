import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

// Add Book
export const addBooks = createAsyncThunk(
  "books/addBooks",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(`/books/`, formData, config);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// ✅ Fetch all books (with pagination & optional search/featured)
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (
    { page = 1, limit = 6, search = "", featured } = {},
    { rejectWithValue }
  ) => {
    try {
      let query = `?page=${page}&limit=${limit}`;
      if (search) query += `&search=${search}`;
      if (featured) query += `&featured=true`;

      const res = await axios.get(`/books${query}`);

      return res.data; // Expecting: { books: [], pagination: {} }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Fetch single book by ID
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/books/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Delete a book
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`/books/${id}`, config);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ✅ Download book file
export const fetchBookByIdForDownload = createAsyncThunk(
  "books/fetchBookByIdForDownload",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/books/${id}/book`, {
        responseType: "blob",
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 📦 Book Slice
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    pagination: {},
    selectedBook: null,
    bookFile: null,
    message: "",
    loading: false,
    downloading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📚 Fetch Books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        const { data = [], ...pagination } = action.payload;

        state.loading = false;
        state.books = data;
        state.pagination = pagination;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.books = []; // clear old books on error
        state.error = action.payload;
      })

      // 📘 Fetch Book By ID
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBook = action.payload.book;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 📥 Download Book
      .addCase(fetchBookByIdForDownload.pending, (state) => {
        state.downloading = true;
        state.error = null;
      })
      .addCase(fetchBookByIdForDownload.fulfilled, (state, action) => {
        state.downloading = false;
        state.bookFile = action.payload;
      })
      .addCase(fetchBookByIdForDownload.rejected, (state, action) => {
        state.downloading = false;
        state.error = action.payload;
      })

      // ❌ Delete Book
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.books = state.books.filter((b) => b._id !== action.payload);
        state.message = "Book deleted successfully.";
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
