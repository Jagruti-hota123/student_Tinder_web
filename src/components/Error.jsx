import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      {/* Error Graphic */}
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl font-semibold">Page Not Found</p>
        <p className="mt-2 text-gray-600">
          {`Sorry, the page you're looking for doesn't exist or has been moved.`}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          to="/"
          className="btn btn-primary px-6 py-2 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Go to Home
        </Link>
        <Link
          to="/contact"
          className="btn btn-secondary px-6 py-2 text-white rounded-lg shadow hover:bg-gray-700"
        >
          Contact Us
        </Link>
      </div>

      {/* Illustration */}
      <div className="mt-8">
        <img
          src="/error-illustration.png"
          alt="Error Illustration"
          className="max-w-xs md:max-w-md"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
