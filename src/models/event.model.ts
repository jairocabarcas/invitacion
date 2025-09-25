export interface EventRequest {
    id?: string;
    title: string;
    description?: string;
    date: Date;
    location?: string;
    createdBy: string; // ID del usuario que crea el evento
    organizers: string[];
}

export interface EventResponse {
    id: string;
    title: string;
    description?: string;
    date: Date;
    location?: string;
    createdBy: string;
    createdAt: Date;
    organizers: string[];
}