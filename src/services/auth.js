import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.REACT_APP_PROJECT_SECRET_KEY;
const API_KEY = process.env.REACT_APP_PROJECT_API_KEY;

export const authService = {
  encryptApiKey: () => {
    return CryptoJS.AES.encrypt(API_KEY, SECRET_KEY).toString();
  },

  decryptApiKey: (encryptedApiKey) => {
    const bytes = CryptoJS.AES.decrypt(encryptedApiKey, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  },

  storeApiKey: () => {
    const encryptedKey = authService.encryptApiKey();
    sessionStorage.setItem("apiKey", encryptedKey);
  },

  getStoredApiKey: () => {
    const encryptedKey = sessionStorage.getItem("apiKey");
    if (!encryptedKey) return null;
    return authService.decryptApiKey(encryptedKey);
  },

  verifyApiKey: (inputApiKey) => {
    if (!inputApiKey || inputApiKey.trim() === "") {
      return false;
    }

    const storedApiKey = authService.getStoredApiKey();
    if (!storedApiKey) return false;

    if (inputApiKey === storedApiKey) {
      return true;
    }

    return false;
  },
  isAuthenticated: () => {
    const apiKey = sessionStorage.getItem("apiKey");
    return !!apiKey;
  },

  logout: () => {
    sessionStorage.removeItem("apiKey");
  },
};
