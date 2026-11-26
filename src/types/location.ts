export interface Location {
    id: number;
    name: string;
    building: string;
    floor: number;
    status: 'OPEN' | 'CLOSED';
    description: string;
};

export interface PaginateLocation {
    items: Location[];
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
};

export interface TicketRequest {
    description: string;
};

export interface Ticket {
    id: number;
    resourceId: number;
    resourceName: string;
    description: string;
    status: 'OPEN' | 'CLOSED';
};

export interface Page {
    page?: number;
    size?: number;
};
