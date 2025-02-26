import { FaFlag, FaSearch } from "react-icons/fa";
export const LeagueDropdown = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  leagues,
  loading,
  searchTerms,
  setSearchTerms,
}) => {
  const { leagueSearchTerm, countrySearchTerm } = searchTerms;

  return isOpen ? (
    <div className="absolute w-full mt-1 bg-slate-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-30">
      <div className="p-2 sticky top-0 bg-slate-700 border-b border-slate-600 space-y-2">
        <div className="relative">
          <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={countrySearchTerm}
            onChange={(e) =>
              setSearchTerms({
                ...searchTerms,
                countrySearchTerm: e.target.value,
              })
            }
            placeholder="Search Country..."
            className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none"
          />
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={leagueSearchTerm}
            onChange={(e) =>
              setSearchTerms({
                ...searchTerms,
                leagueSearchTerm: e.target.value,
              })
            }
            placeholder="Search League..."
            className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {Object.entries(leagues).map(([country, leagueList]) => (
        <div key={country} className="border-b border-slate-600 last:border-0">
          <div className="px-3 py-2 bg-slate-800 font-semibold">{country}</div>
          {leagueList.map((league) => (
            <button
              key={league.id}
              onClick={() => {
                onFilterChange({
                  target: { name: "league", value: league.id },
                });
                onClose();
                setSearchTerms({ leagueSearchTerm: "", countrySearchTerm: "" });
              }}
              className={`w-full px-3 py-2 text-left hover:bg-slate-600 flex items-center ${
                filters.league === league.id ? "bg-slate-600" : ""
              }`}
            >
              <span>{league.name}</span>
            </button>
          ))}
        </div>
      ))}
    </div>
  ) : null;
};
