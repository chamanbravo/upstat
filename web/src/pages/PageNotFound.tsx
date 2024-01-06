import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h1 className="font-bold text-8xl text-gray-500">404</h1>
      <p className="font-medium">Page not found</p>
      <Link to="/" className="text-blue-700 underline">
        Go Home
      </Link>
    </div>
  );
}
