import {GuestRequest, GuestResponse} from "@/models/guest.model";

export async function findGuestsByEvent(evntId: string){
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_FAMILY_SERVICE_URL}/guests/by-event/${evntId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return data as GuestResponse[];
}

export async function saveGuest(guest: GuestRequest){
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_FAMILY_SERVICE_URL}/guests`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(guest),
    });

    const data = await res.json();
    return data as GuestResponse;
}

export async function findGuestsByIdentifier(identifier: string){
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_FAMILY_SERVICE_URL}/guests/by-identifier/${identifier}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    return data as GuestResponse;
}