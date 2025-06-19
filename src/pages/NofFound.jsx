import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../components/UI/Container";

const NotFound = () => {
  return (
    <Container>
      <Helmet>
        <title>404 - Page Not Found</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-100 px-4">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          ⬅ Go Home
        </Link>
      </div>
    </Container>
  );
};

export default NotFound;
