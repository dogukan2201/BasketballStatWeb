export const filterAndGroupLeagues = (leagues, searchTerms) => {
  const { leagueSearchTerm, countrySearchTerm } = searchTerms;

  // Önce filtreleme yap
  const filteredLeagues = leagues.filter((league) => {
    const matchesLeague = league.name
      .toLowerCase()
      .includes(leagueSearchTerm.toLowerCase());

    const countryName =
      typeof league.country === "string"
        ? league.country
        : league.country?.name || "Other";

    const matchesCountry = countryName
      .toLowerCase()
      .includes(countrySearchTerm.toLowerCase());

    return matchesLeague && matchesCountry;
  });

  // Sonra ülkelere göre grupla
  const groupedLeagues = filteredLeagues.reduce((acc, league) => {
    const country =
      typeof league.country === "string"
        ? league.country
        : league.country?.name || "Other";

    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(league);
    return acc;
  }, {});

  return groupedLeagues;
};

export const loadLeagues = async (
  fetchLeagues,
  setLoading,
  setError,
  setAllLeagues,
  setLeagues,
  searchTerms
) => {
  try {
    setLoading(true);
    const { response } = await fetchLeagues();
    if (Array.isArray(response)) {
      setAllLeagues(response);
      const groupedLeagues = filterAndGroupLeagues(response, searchTerms);
      setLeagues(groupedLeagues);
    }
  } catch (error) {
    setError("An error occurred while loading leagues.");
  } finally {
    setLoading(false);
  }
};
