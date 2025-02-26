import { FaSearch } from "react-icons/fa";

export const TeamDropdown = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  teams,
  teamSearchTerm,
  setTeamSearchTerm,
}) => {
  return isOpen ? (
    <div className="absolute w-full mt-1 bg-slate-700 rounded-md shadow-lg max-h-96 overflow-y-auto z-30">
      <div className="p-2 sticky top-0 bg-slate-700 border-b border-slate-600">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={teamSearchTerm}
            onChange={(e) => setTeamSearchTerm(e.target.value)}
            placeholder="Search Team..."
            className="w-full pl-10 pr-3 py-2 bg-slate-600 rounded-md focus:outline-none"
          />
        </div>
      </div>

      {teams.map((team) => (
        <button
          key={team.id}
          onClick={() => {
            onFilterChange({ target: { name: "team", value: team.id } });
            onClose();
            setTeamSearchTerm("");
          }}
          className={`w-full px-3 py-2 text-left hover:bg-slate-600 flex items-center ${
            filters.team === team.id ? "bg-slate-600" : ""
          }`}
        >
          <span>{team.name}</span>
        </button>
      ))}
    </div>
  ) : null;
};
