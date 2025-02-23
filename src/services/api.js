import axios from "axios";

const BASE_URL = "https://v1.basketball.api-sports.io/";

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

export const getTeamStatistics = async (teamId, season) => {
  try {
    const response = await apiClient.get("/statistics", {
      params: {
        team: teamId,
        season,
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
