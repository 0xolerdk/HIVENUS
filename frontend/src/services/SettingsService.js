import axios from "axios";
import AuthService from "./AuthService";

const SettingsService = {
    BASE_URL: 'http://localhost:8080',
    CACHE_KEY: 'userSettings',

    async getSettings() {
        // Спроба отримати налаштування з кешу
        const cachedSettings = localStorage.getItem(this.CACHE_KEY);
        if (cachedSettings) {
            return JSON.parse(cachedSettings);
        }

        // Якщо налаштувань немає в кеші, отримуємо їх з сервера
        const response = await axios.get(
            `${this.BASE_URL}/user-settings/`,
            {
                headers: {
                    'Authorization': `Bearer ${AuthService.getToken()}`
                }
            }
        );

        const settings = response.data;

        // Зберігаємо налаштування в кеш
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(settings));

        return settings;
    },

    async setSettings(settings) {
        // Оновлюємо налаштування на сервері
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

        // Оновлюємо налаштування в кеші
        localStorage.setItem(this.CACHE_KEY, JSON.stringify(updatedSettings));

        return updatedSettings;
    },

    // Додаткові функції для очищення кешу, якщо потрібно
    clearCache() {
        localStorage.removeItem(this.CACHE_KEY);
    }
};

export default SettingsService;
