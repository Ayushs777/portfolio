"use client";

import { useState } from "react";
import { Message, Content, updateContent, deleteMessage } from "@/app/actions";
import { Trash2 } from "lucide-react";

export default function AdminDashboardClient({
    initialMessages,
    initialContent
}: {
    initialMessages: Message[];
    initialContent: Content
}) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [content, setContent] = useState<Content>(initialContent);
    const [status, setStatus] = useState("");

    const handleUpdateContent = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Updating...");

        const form = new FormData();
        form.append("resumeLink", content.resumeLink);
        form.append("bio", content.bio);
        form.append("github", content.github);
        form.append("linkedin", content.linkedin);
        form.append("fiverr", content.fiverr || "");
        form.append("heroRoles", content.heroRoles ?? "");
        form.append("seoTitle", content.seoTitle ?? "");
        form.append("seoDescription", content.seoDescription ?? "");
        form.append("email", content.email ?? "ayushchaudhary@gmail.com");

        await updateContent(form);
        setStatus("Content updated successfully!");

        setTimeout(() => setStatus(""), 3000);
    };

    const handleDeleteMessage = async (id: string) => {
        if (!confirm("Delete this message?")) return;

        await deleteMessage(id);
        setMessages(messages.filter(m => m.id !== id));
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Messages */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 shadow-[0_0_15px_rgba(0,240,255,0.05)]">
                <h2 className="text-2xl font-bold mb-6 text-[#00f0ff] border-b border-gray-800 pb-3">Incoming Comms</h2>

                {messages.length === 0 ? (
                    <p className="text-gray-500 italic">No messages intercepted.</p>
                ) : (
                    <div className="space-y-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="bg-black/50 border border-gray-700 rounded p-4 relative group">
                                <button
                                    onClick={() => handleDeleteMessage(msg.id)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="text-sm text-gray-400 mb-2">
                                    <span className="font-bold text-white">{msg.name}</span> &lt;{msg.email}&gt;
                                </div>
                                <div className="text-xs text-[#bc13fe] mb-3">
                                    {new Date(msg.date).toLocaleString()}
                                </div>
                                <p className="text-gray-300 bg-[#111] p-3 rounded text-sm whitespace-pre-wrap">
                                    {msg.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column: Content Management */}
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-6 shadow-[0_0_15px_rgba(188,19,254,0.05)] h-fit">
                <h2 className="text-2xl font-bold mb-6 text-[#bc13fe] border-b border-gray-800 pb-3">System Variables</h2>

                <form onSubmit={handleUpdateContent} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Resume Link (URL or relative path)</label>
                        <input
                            type="text"
                            value={content.resumeLink}
                            onChange={(e) => setContent({ ...content, resumeLink: e.target.value })}
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Short Bio</label>
                        <textarea
                            value={content.bio}
                            onChange={(e) => setContent({ ...content, bio: e.target.value })}
                            rows={3}
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">GitHub Link</label>
                            <input
                                type="text"
                                value={content.github}
                                onChange={(e) => setContent({ ...content, github: e.target.value })}
                                className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">LinkedIn Link</label>
                            <input
                                type="text"
                                value={content.linkedin}
                                onChange={(e) => setContent({ ...content, linkedin: e.target.value })}
                                className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Notification Email (For Contact Alerts)</label>
                        <input
                            type="email"
                            value={content.email || ""}
                            onChange={(e) => setContent({ ...content, email: e.target.value })}
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Fiverr Profile Link</label>
                        <input
                            type="text"
                            value={content.fiverr || ""}
                            onChange={(e) => setContent({ ...content, fiverr: e.target.value })}
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Hero Roles (Comma Separated)</label>
                        <input
                            type="text"
                            value={content.heroRoles}
                            onChange={(e) => setContent({ ...content, heroRoles: e.target.value })}
                            className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                        />
                    </div>

                    <div className="border-t border-gray-800 pt-4 mt-4">
                        <h3 className="text-lg font-bold mb-3 text-white">SEO Settings</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Meta Title</label>
                                <input
                                    type="text"
                                    value={content.seoTitle}
                                    onChange={(e) => setContent({ ...content, seoTitle: e.target.value })}
                                    className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Meta Description</label>
                                <textarea
                                    value={content.seoDescription}
                                    onChange={(e) => setContent({ ...content, seoDescription: e.target.value })}
                                    rows={2}
                                    className="w-full bg-[#111] border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-[#bc13fe]"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#bc13fe] text-white font-bold rounded hover:bg-transparent border border-[#bc13fe] hover:text-[#bc13fe] transition-all"
                        >
                            UPDATE SYSTEM
                        </button>

                        {status && (
                            <span className="text-sm text-[#00f0ff] animate-pulse">
                                {status}
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
