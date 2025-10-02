import {ConfirmAttendance, GuestRequest, GuestResponse} from "@/models/guest.model";
import {InvitationStatus} from "@/models/enums";

// ---------------------------------------------------

/**
 * Función auxiliar para realizar llamadas a la API y manejar respuestas.
 * @param endpoint El sufijo del path de la API (ej: '/guests/by-event/123').
 * @param options Las opciones de la llamada fetch (método, headers, body, etc.).
 * @returns La respuesta parseada como JSON.
 * @throws Un error si la respuesta HTTP no es exitosa.
 */
async function apiFetch<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${process.env.NEXT_PUBLIC_APP_FAMILY_SERVICE_URL}${endpoint}`;

    try {
        const res = await fetch(url, options);

        if (!res.ok) {
            // Manejo de errores HTTP: lanza un error con el estado y texto de la respuesta.
            const errorBody = await res.json().catch(() => ({ message: res.statusText }));
            throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorBody.message || res.statusText}`);
        }

        // Si la respuesta es 204 No Content, se devuelve un objeto vacío en lugar de intentar parsear.
        if (res.status === 204) {
            // Es importante asegurar que el tipo de retorno sea compatible con T
            return {} as T;
        }

        const data = await res.json();
        return data as T;
    } catch (error) {
        // Loguea el error para debug y lo relanza para ser manejado por el llamador.
        console.error("API Fetch Error:", error);
        throw error;
    }
}

// ---------------------------------------------------

export async function findGuestsByEvent(evntId: string): Promise<GuestResponse[]> {
    return apiFetch<GuestResponse[]>(`/guests/by-event/${evntId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

//---

export async function saveGuest(guest: GuestRequest): Promise<GuestResponse> {
    // Nota: El token de autorización se obtiene aquí.
    const token = localStorage.getItem("token");

    return apiFetch<GuestResponse>("/guests", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // Se usa el token solo si existe, aunque si es requerido, fallará en el backend.
            ...(token && { "Authorization": `Bearer ${token}` }),
        },
        body: JSON.stringify(guest),
    });
}

//---

export async function findGuestsByIdentifier(identifier: string): Promise<GuestResponse> {
    return apiFetch<GuestResponse>(`/guests/by-identifier/${identifier}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
}

//---

export async function updateStatus(guestId: string, status: InvitationStatus): Promise<GuestResponse> {
    const token = localStorage.getItem("token");

    return apiFetch<GuestResponse>(`/guests/status?guestId=${guestId}&status=${status}`, { // Asumiendo un endpoint de actualización de estado
        method: "PUT", // PATCH es común para actualizaciones parciales
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        }// Asumiendo que solo se envía el nuevo estado
    })
}

export async function deleteGuest(id: string): Promise<void> {
    const token = localStorage.getItem("token");

    return apiFetch<void>(`/guests/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        },
    });
}

export async function getConfirmAttendance(guestId: string): Promise<ConfirmAttendance> {
    return await apiFetch(`/guests/${guestId}/find-to-reserve`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}