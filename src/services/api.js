import axios from "axios";

const BASE_URL = "https://api-basketball.p.rapidapi.com";

const API_KEY = "24494cabc4msh182f3b945be4a02p168d41jsnf6d3a2d9c011";

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
export const getPlayers = async (teamId, season) => {
  try {
    const response = await apiClient.get("/players", {
      params: {
        team: teamId,
        season: season,
      },
    });
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
