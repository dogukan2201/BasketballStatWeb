import { FaBasketballBall, FaCopyright } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-300 text-sm flex items-center justify-center gap-1">
          Veriler{" "}
          <a
            href="https://www.api-basketball.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline inline-flex items-center gap-1"
          >
            API-Basketball
          </a>{" "}
          tarafından sağlanmaktadır.
        </p>
      </div>
    </footer>
  );
}
