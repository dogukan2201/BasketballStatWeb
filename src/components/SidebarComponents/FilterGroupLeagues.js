export const filterAndGroupLeagues = (leaguesData, searchTerms) => {
  let filteredLeagues = [...leaguesData];

  if (searchTerms.countrySearchTerm) {
    filteredLeagues = filteredLeagues.filter((league) =>
      league.country?.name
        ?.toLowerCase()
        .includes(searchTerms.countrySearchTerm.toLowerCase())
    );
  }

  if (searchTerms.leagueSearchTerm) {
    filteredLeagues = filteredLeagues.filter((league) =>
      league.name
        .toLowerCase()
        .includes(searchTerms.leagueSearchTerm.toLowerCase())
    );
  }

  return filteredLeagues.reduce((acc, league) => {
    const country = league.country?.name || "Other";
    if (!acc[country]) {
      acc[country] = [];
    }
    acc[country].push(league);
    return acc;
  }, {});
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
    const data = await fetchLeagues();
    if (data && Array.isArray(data.response)) {
      setAllLeagues(data.response);
      const filteredAndGroupedLeagues = filterAndGroupLeagues(
        data.response,
        searchTerms
      );
      setLeagues(filteredAndGroupedLeagues);
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    setError("An error occurred while loading leagues: " + error.message);
    setAllLeagues([]);
    setLeagues({});
  } finally {
    setLoading(false);
  }
};
