import axios from "axios";

const BASE_URL = "https://v1.basketball.api-sports.io";

const API_KEY = process.env.REACT_APP_PROJECT_API_KEY;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "api-basketball.p.rapidapi.com",
  },
});

export const getTeams = async (league, season) => {
  try {
    const response = await apiClient.get("/teams", {
      params: {
        league,
        season,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Takımlar getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getTeamStatistics = async (league, season, team) => {
  try {
    const response = await apiClient.get("/statistics", {
      params: {
        league,
        season,
        team,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Takım istatistikleri getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getPlayers = async (params) => {
  if (!params || Object.keys(params).length === 0) {
    throw new Error(
      "En az bir parametre gereklidir (id, team, season veya search)"
    );
  }

  try {
    const response = await apiClient.get("/players", { params });
    return response.data;
  } catch (error) {
    console.error("Oyuncular getirilirken hata oluştu:", error);
    throw error;
  }
};

export const fetchLeagues = async () => {
  try {
    const response = await apiClient.get(`/leagues`);
    return response.data;
  } catch (error) {
    console.error("Ligler getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getPlayerStatistics = async (id, player, season) => {
  try {
    const response = await apiClient.get("/games/statistics/players", {
      params: {
        id: id,
        player,
        season,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Oyuncu istatistikleri getirilirken hata oluştu:", error);
    throw error;
  }
};

//Games
export const getGames = async (league, season) => {
  try {
    const response = await apiClient.get("/games", {
      params: { league, season },
    });
    return response.data;
  } catch (error) {
    console.error("Maçlar getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getGameDetails = async (gameId) => {
  try {
    const response = await apiClient.get("/games/statistics/teams", {
      params: { id: gameId },
    });
    return response.data;
  } catch (error) {
    console.error("Maç detayları yüklenirken hata:", error);
    throw error;
  }
};
//Standings
export const getStandings = async (league, season, stage, group) => {
  if (!league || !season) {
    throw new Error("Lig ve sezon parametreleri zorunludur");
  }

  try {
    const response = await apiClient.get("/standings", {
      params: {
        league,
        season,
        stage,
        group,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Lig sıralaması getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getStandingsStages = async (league, season) => {
  try {
    const response = await apiClient.get("/standings/stages", {
      params: { league, season },
    });
    return response.data;
  } catch (error) {
    console.error("Stage getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getStandingsGroups = async (league, season) => {
  try {
    const response = await apiClient.get("/standings/groups", {
      params: {
        league,
        season,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Groups getirilirken hata oluştu:", error);
    throw error;
  }
};

export const getSeasons = async () => {
  try {
    const response = await apiClient.get("/seasons");
    return response.data;
  } catch (error) {
    console.error("Sezonlar getirilirken hata oluştu:", error);
    throw error;
  }
};
