import axios from "axios";
import AuthService from "./AuthService";

const SettingsService = {
    BASE_URL: 'http://localhost:8080',
    CACHE_KEY: 'userSettings',

    async getSettings() {
        const cachedSettings = localStorage.getItem(this.CACHE_KEY);
        if (cachedSettings) {
            return JSON.parse(cachedSettings);
        }

        const response = await axios.get(
            `${this.BASE_URL}/user-settings/`,
            {
                headers: {
                    'Authorization': `Bearer ${AuthService.getToken()}`
                }
            }
        );

        const settings = response.data;

        localStorage.setItem(this.CACHE_KEY, JSON.stringify(settings));

        return settings;
    },

    async setSettings(settings) {
        const response = await axios.post(
            `${this.BASE_URL}/user-settings/modify`,
            settings,
            {
                headers: {
                    'Authorization': `Bearer ${AuthService.getToken()}`
                }
            }
        );

        const updatedSettings = response.data;

        localStorage.setItem(this.CACHE_KEY, JSON.stringify(updatedSettings));

        return updatedSettings;
    },

    clearCache() {
        localStorage.removeItem(this.CACHE_KEY);
    }
};

export default SettingsService;
