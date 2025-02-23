const renderError = ({ error }) => (
  <div className="p-6">
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Hata! </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  </div>
);

export default renderError;
