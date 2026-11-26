import { api } from "../config/api";
import type { AuthResponse, LoginRequest, RegisterRequest, RegisterResponse } from "../types/auth";

export const authService = {
    login: async (payload: LoginRequest): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', payload);
        return response.data;
    },

    register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
        const response = await api.post('/auth/register', payload);
        return response.data;
    }
};
