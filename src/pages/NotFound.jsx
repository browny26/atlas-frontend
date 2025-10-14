import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
        <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
          <h2 className="mb-8 font-bold text-gray-800 text-title-md xl:text-title-2xl">
            ERROR
          </h2>

          <h1 className="font-marcellus text-7xl md:text-[200px] text-center">
            404
          </h1>

          <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            We can’t seem to find the page you are looking for!
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center border bg-black px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-neutral-600"
          >
            Back to Home Page
          </Link>
        </div>
        <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2">
          &copy; 2025 - Atlas
        </p>
      </div>
    </>
  );
}
