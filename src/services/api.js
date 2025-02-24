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
