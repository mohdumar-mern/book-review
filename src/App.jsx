import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Layout from "./components/Layout";
import PrivateRoute from "./routes/Privateroutes";
import AdminRoute from "./routes/AdminRoutes";
import HomePage from "./pages/HomePage";
import Loader from "./components/UI/Loader";
import NotFound from "./pages/NofFound";

// Lazy-loaded pages for optimization
const BookListPage = lazy(() => import("./pages/BookListPage"));
const BookDetailsPage = lazy(() => import("./pages/BookDetailsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const AddBookPage = lazy(() => import("./pages/AddBookPage"));
const UpdateProfileForm = lazy(() => import("./pages/UpdateProfileForm"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader text="Loading..." size="lg" />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/books/:id" element={<BookDetailsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />

            {/* Private User Routes */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-profile/:id"
              element={
                <PrivateRoute>
                  <UpdateProfileForm />
                </PrivateRoute>
              }
            />

            {/* Admin-only Route */}
            <Route
              path="/add-book"
              element={
                <AdminRoute>
                  <AddBookPage />
                </AdminRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
