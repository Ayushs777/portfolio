import { checkAuth } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import AdminLoginClient from "./AdminLoginClient";

export default async function LoginPage() {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        redirect("/admin");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
            <AdminLoginClient />
        </div>
    );
}
