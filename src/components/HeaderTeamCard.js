const HeaderTeamCard = ({ team, leagueInfo }) => (
  <div className="flex items-center justify-between gap-6 mb-8 border-b pb-4">
    <div className="flex items-center gap-4">
      <img
        src={team.logo}
        alt={team.name}
        className="w-24 h-24 object-contain"
      />
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{team.name}</h2>
        <div className="flex items-center gap-2 mt-2">
          <img
            src={leagueInfo.logo}
            alt={leagueInfo.name}
            className="w-12 h-12 object-contain"
          />
          <span className="text-gray-600">
            {leagueInfo.name} • {leagueInfo.season}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderTeamCard;
