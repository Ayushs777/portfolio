"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/admin/actions";
import { useRouter } from "next/navigation";

export default function AdminLoginClient() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const form = new FormData();
        form.append("password", password);

        const res = await loginAdmin(form);
        if (res.error) {
            setError(res.error);
        } else {
            router.push("/admin");
            router.refresh();
        }
    };

    return (
        <div className="max-w-md w-full p-8 border border-gray-800 rounded-lg shadow-[0_0_20px_rgba(188,19,254,0.1)] bg-[#0a0a0a]">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#bc13fe]">Admin Portal</h1>
            <p className="text-gray-400 mb-6 text-center text-sm">Initialize System Authentication</p>

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Access Passkey</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#111] border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:border-[#bc13fe] text-white"
                        placeholder="••••••••"
                        required
                    />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 bg-[#bc13fe] text-white font-bold rounded-md hover:bg-transparent border border-[#bc13fe] hover:text-[#bc13fe] transition-all duration-300"
                >
                    AUTHENTICATE
                </button>
            </form>
        </div>
    );
}
