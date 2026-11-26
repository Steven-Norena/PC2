import { api } from "../config/api";
import type { Location, Page, PaginateLocation, Ticket, TicketRequest } from "../types/location";

export const locationService = {
    getLocations: async (query?: Page): Promise<PaginateLocation> => {
        const response = await api.get(`/location${query}`);
        return response.data;
    },

    getLocationById: async (id: number): Promise<Location> => {
        const response = await api.get(`/location/${id}`);
        return response.data;
    },

    createIssue: async (locationId: number, payload: TicketRequest): Promise<Ticket> => {
        const response = await api.post(`/location/${locationId}/tickets`, payload);
        return response.data;
    }
}
