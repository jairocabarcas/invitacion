"use client";

import AuthGuard from "@/app/security/AuthGuard";
import GuestManagement from "@/app/components/admin/guestManagement";

export default function adminInvitados() {
    return (
        <AuthGuard>
            <GuestManagement/>
        </AuthGuard>
    );
}
