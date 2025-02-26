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

const requestQueue = [];
let isProcessing = false;

const processQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;

  isProcessing = true;
  const { request, resolve, reject } = requestQueue.shift();

  try {
    const response = await request();
    resolve(response);
  } catch (error) {
    reject(error);
  } finally {
    isProcessing = false;
    setTimeout(() => processQueue(), 1000); // wait for 1 second
  }
};

const queueRequest = (requestFn) => {
  return new Promise((resolve, reject) => {
    requestQueue.push({
      request: requestFn,
      resolve,
      reject,
    });
    processQueue();
  });
};

export const getTeams = async (league, season, search) => {
  try {
    const response = await apiClient.get("/teams", {
      params: {
        league,
        season,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
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
    console.error("Error fetching team statistics:", error);
    throw error;
  }
};

export const getPlayers = async (params) => {
  if (!params || Object.keys(params).length === 0) {
    throw new Error(
      "At least one parameter is required (id, team, season, or search)"
    );
  }

  try {
    const response = await apiClient.get("/players", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching players:", error);
    throw error;
  }
};

export const fetchLeagues = async ({ signal } = {}) => {
  return queueRequest(async () => {
    try {
      const response = await apiClient.get(`/leagues`, { signal });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
        throw error;
      }
      console.error("Error fetching leagues:", error);
      throw error;
    }
  });
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
    console.error("Error fetching player statistics:", error);
    throw error;
  }
};

//Games
export const getGames = async (league, season, team, date) => {
  try {
    const params = { league, season };

    if (team) params.team = team;
    if (date) params.date = date;

    const response = await apiClient.get("/games", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
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
    console.error("Error fetching game details:", error);
    throw error;
  }
};
//Standings
export const getStandings = async (league, season, stage, group) => {
  if (!league || !season) {
    throw new Error("League and season parameters are required");
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
    console.error("Error fetching standings:", error);
    throw error;
  }
};

export const getStandingsStages = async (league, season, { signal } = {}) => {
  return queueRequest(async () => {
    try {
      const response = await apiClient.get("/standings/stages", {
        params: { league, season },
        signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
        throw error;
      }
      console.error("Error fetching stages:", error);
      throw error;
    }
  });
};

export const getStandingsGroups = async (league, season, { signal } = {}) => {
  return queueRequest(async () => {
    try {
      const response = await apiClient.get("/standings/groups", {
        params: { league, season },
        signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled");
        throw error;
      }
      console.error("Error fetching groups:", error);
      throw error;
    }
  });
};

export const getSeasons = async () => {
  try {
    const response = await apiClient.get("/seasons");
    return response.data;
  } catch (error) {
    console.error("Error fetching seasons:", error);
    throw error;
  }
};
