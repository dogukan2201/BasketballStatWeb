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

export const getPlayerStatistics = async (playerId) => {
  if (!playerId || typeof parseInt(playerId) !== "number") {
    throw new Error("Valid player ID (number) is required");
  }

  try {
    const response = await apiClient.get("/games/statistics/players", {
      params: { id: parseInt(playerId) },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching player statistics:", error);
    throw error;
  }
};

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

export const getGameStatistics = async (params) => {
  if (!params || Object.keys(params).length === 0) {
    throw new Error("En az bir parametre gereklidir (id veya ids)");
  }

  if (params.ids && !params.ids.match(/^\d+(-\d+)*$/)) {
    throw new Error('ids parametresi "id-id-id" formatında olmalıdır');
  }

  if (params.ids) {
    const idsCount = params.ids.split("-").length;
    if (idsCount > 20) {
      throw new Error("En fazla 20 maç ID'si kullanılabilir");
    }
  }

  try {
    const response = await apiClient.get("/games/statistics", { params });
    return response.data;
  } catch (error) {
    console.error("Maç istatistikleri getirilirken hata oluştu:", error);
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
