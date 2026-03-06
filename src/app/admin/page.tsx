import { checkAuth, logoutAdmin } from "@/app/admin/actions";
import { getMessages, getContent } from "@/app/actions";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminPage() {
    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        redirect("/admin/login");
    }

    const messages = await getMessages();
    const content = await getContent();

    return (
        <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f0ff] to-[#bc13fe]">
                            Admin Command Center
                        </h1>
                        <p className="text-gray-400 mt-2">Manage incoming comms and dynamic content.</p>
                    </div>

                    <form action={logoutAdmin}>
                        <button type="submit" className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all font-bold tracking-wider text-sm">
                            LOGOUT
                        </button>
                    </form>
                </div>

                <AdminDashboardClient initialMessages={messages} initialContent={content} />
            </div>
        </div>
    );
}
