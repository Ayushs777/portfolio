"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin } from 'lucide-react';
import SectionHeader from './SectionHeader';
import type { Content } from '@/app/actions';

export default function Contact({ content }: { content: Content }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setStatus('loading');
        try {
            const form = new FormData();
            form.append('name', formData.name);
            form.append('email', formData.email);
            form.append('message', formData.message);

            // Due to boundary issues with Client Components importing Server Actions directly in some Next.js setups,
            // standard fetch implementation to an API route is sometimes preferred, but here we can just dynamically import
            // or we'll ensure we put "use client" on this component and import from the server actions file.
            const { sendMessage } = await import('@/app/actions');
            const res = await sendMessage(form);

            if (res.error) {
                setStatus('error');
            } else if (res.emailError) {
                setStatus('success'); // Still saved message
                console.warn("Message saved but email failed:", res.emailError);
                alert(`Message saved! But notification failed: ${res.emailError}.`);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 px-6 relative max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glassmorphism p-8 md:p-12 rounded-2xl border border-[#00f0ff]/30 shadow-[0_0_40px_rgba(0,240,255,0.1)] hover:shadow-[0_0_50px_rgba(0,240,255,0.2)] transition-shadow duration-500 relative overflow-hidden"
            >
                {/* Glow Effects */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#00f0ff] blur-[100px] opacity-30" />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#bc13fe] blur-[100px] opacity-30" />

                <div className="text-center mb-10">
                    <SectionHeader title="Initialize Link" />
                    <p className="text-gray-400 -mt-8">
                        Open a secure channel for inquiries, collaborations, or opportunities.
                    </p>
                </div>

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[var(--color-neon-purple)] mb-2 uppercase tracking-wide">
                                Identifier ID [Name]
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full bg-black/40 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-[#bc13fe] focus:shadow-[0_0_10px_rgba(188,19,254,0.3)] transition-all duration-300"
                                placeholder="Enter Name..."
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-[var(--color-neon-purple)] mb-2 uppercase tracking-wide">
                                Comm_Link [Email]
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full bg-black/40 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-[#bc13fe] focus:shadow-[0_0_10px_rgba(188,19,254,0.3)] transition-all duration-300"
                                placeholder="Enter Email..."
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[var(--color-neon-cyan)] mb-2 uppercase tracking-wide">
                            Data Payload [Message]
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                            className="w-full bg-black/40 border border-gray-700 rounded-md p-3 text-white focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_10px_rgba(0,240,255,0.3)] transition-all duration-300 resize-none"
                            placeholder="Enter Message..."
                        />
                    </div>

                    <div className="h-6 mb-2 flex justify-center items-center">
                        {status === 'success' && <p className="text-[#00f0ff] animate-pulse text-sm">Transmission Successful. Data received.</p>}
                        {status === 'error' && <p className="text-red-500 text-sm">Transmission Failed. Please try again.</p>}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={status === 'loading'}
                        className={`w-full py-4 rounded-md font-bold text-black uppercase tracking-widest flex justify-center items-center gap-2 transition-all duration-300 ${status === 'loading' ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#00f0ff] to-[#bc13fe] hover:opacity-90 hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]'}`}
                    >
                        {status === 'loading' ? (
                            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Send size={20} />
                        )}
                        {status === 'loading' ? 'Transmitting...' : 'Transmit Data'}
                    </motion.button>
                </form>
            </motion.div>

            {/* Footer */}
            <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center">
                <div className="flex gap-6 mb-6">
                    <a href={`mailto:${content.email || 'ayushchaudhary7652@gmail.com'}`} className="text-gray-400 hover:text-[#00f0ff] transition-colors hover:shadow-[0_0_10px_#00f0ff] rounded-full p-2">
                        <Mail size={24} />
                    </a>
                    <a href={content.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors hover:shadow-[0_0_10px_white] rounded-full p-2">
                        <Github size={24} />
                    </a>
                    <a href={content.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0047ff] transition-colors hover:shadow-[0_0_10px_#0047ff] rounded-full p-2">
                        <Linkedin size={24} />
                    </a>
                </div>
                <p className="text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Ayush Chaudhary. All rights reserved. <br />
                    <span className="text-[#00f0ff] neon-text-cyan font-mono mt-2 inline-block">SYSTEM.SECURE</span>
                </p>
            </footer>
        </section>
    );
}
