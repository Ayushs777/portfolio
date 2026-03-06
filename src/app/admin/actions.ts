"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// A simple hardcoded admin password for portfolio simplicity
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ayush95109";

export async function loginAdmin(formData: FormData) {
    const password = formData.get("password") as string;

    if (password === ADMIN_PASSWORD) {
        // Set a cookie that expires in 1 day
        const cookieStore = await cookies();
        cookieStore.set("admin-auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/"
        });

        return { success: true };
    }

    return { error: "Invalid password" };
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete("admin-auth");
    redirect("/admin/login");
}

export async function checkAuth() {
    const cookieStore = await cookies();
    return cookieStore.has("admin-auth");
}
