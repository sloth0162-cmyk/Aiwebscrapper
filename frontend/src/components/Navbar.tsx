import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900"
        >
          WebSummarizer
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;