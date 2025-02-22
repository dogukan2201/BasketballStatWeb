import axios from "axios";

const fetchCountries = async () => {
  const options = {
    method: "GET",
    url: "https://api-basketball.p.rapidapi.com/countries",
    headers: {
      "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      "x-rapidapi-host": "api-basketball.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

// Test fonksiyonu
const testAPI = async () => {
  try {
    const countries = await fetchCountries();
    console.log("Ülkeler başarıyla alındı:", countries);
  } catch (error) {
    console.error("API testi başarısız:", error);
  }
};

// API'yi test et
testAPI();

export default fetchCountries;
