import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_PROJECT_SECRET_KEY;
const API_KEY = process.env.REACT_APP_PROJECT_API_KEY;

export const authService = {
  generateToken: (apiKey) => {
    const tokenData = {
      key: apiKey,
      exp: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 saat geçerli
    };
    return CryptoJS.AES.encrypt(
      JSON.stringify(tokenData),
      SECRET_KEY
    ).toString();
  },

  verifyToken: (token) => {
    try {
      const bytes = CryptoJS.AES.decrypt(token, SECRET_KEY);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      // Token süresi dolmuş mu kontrol et
      if (decryptedData.exp < new Date().getTime()) {
        authService.logout();
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  },

  login: (apiKey) => {
    if (apiKey === API_KEY) {
      const token = authService.generateToken(apiKey);
      sessionStorage.setItem("auth_token", token);
      return true;
    }
    return false;
  },

  isAuthenticated: () => {
    const token = sessionStorage.getItem("auth_token");
    if (!token) return false;
    return authService.verifyToken(token);
  },

  logout: () => {
    sessionStorage.removeItem("auth_token");
  },
};
