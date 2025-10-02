export interface GuestRequest {
    id?: string;
    userId?: string; // opcional, si es un usuario de la app
    identifier: string; // teléfono, correo, etc.
    name: string;
    surname?: string;
    fullName: string;
    event: string; // id del evento
    status?: string; // por defecto se inicializa en PENDING
    mainGuestId?: string; // opcional, si es acompañante
    createdBy: string; //usuario que lo creó
}

export interface GuestResponse {
    id: string;
    userId?: string;
    identifier: string;
    name: string;
    surname?: string;
    fullName: string;
    event: string; // id del evento
    status: string;
    mainGuestId?: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string; //usuario que lo creó
}

export interface ConfirmAttendance {
    guest: GuestResponse;
    companions: GuestResponse[];
}
