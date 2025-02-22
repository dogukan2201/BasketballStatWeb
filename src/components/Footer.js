export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-300 text-sm">
          © {new Date().getFullYear()} Dashboard. Veriler{" "}
          <a
            href="https://www.api-basketball.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 underline"
          >
            API-Basketball
          </a>{" "}
          tarafından sağlanmaktadır.
        </p>
      </div>
    </footer>
  );
}
