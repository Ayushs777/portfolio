"use client";

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

export default function About() {
    return (
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto perspective-1000">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <SectionHeader title="Identity Module" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <motion.div
                        whileHover={{ scale: 1.02, rotateX: 5, rotateY: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glassmorphism p-8 md:p-12 rounded-2xl border-l-[3px] border-l-[#bc13fe] shadow-[0_0_30px_rgba(188,19,254,0.1)] hover:shadow-[0_0_50px_rgba(188,19,254,0.3)] transition-all duration-500 relative overflow-hidden h-full group"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Projector Base Glow */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#bc13fe] opacity-50 shadow-[0_0_20px_#bc13fe]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-gradient-to-t from-[#bc13fe]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--color-neon-purple)_0%,_transparent_50%)]" />

                        <motion.h3 style={{ transform: "translateZ(30px)" }} className="text-2xl font-semibold mb-6 text-[#bc13fe] tracking-widest uppercase flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#bc13fe] animate-ping" />
                            Professional Summary
                        </motion.h3>
                        <motion.p style={{ transform: "translateZ(40px)" }} className="text-gray-300 leading-relaxed text-lg z-10 relative">
                            Enthusiastic graduate trainee with strong analytical and technical skills in <span className="text-[#00f0ff] font-bold drop-shadow-[0_0_8px_#00f0ff]">data analysis, networking, and cybersecurity.</span>
                            Experienced in Python, SQL, Power BI, and modern web technologies with hands-on internship exposure in real-world analytics and network security.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glassmorphism p-8 md:p-12 rounded-2xl border-r-[3px] border-r-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:shadow-[0_0_50px_rgba(0,240,255,0.3)] transition-all duration-500 relative overflow-hidden flex flex-col justify-center gap-6 group"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Projector Base Glow */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00f0ff] opacity-50 shadow-[0_0_20px_#00f0ff]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-24 bg-gradient-to-t from-[#00f0ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff] rounded-full blur-[80px] opacity-20 pointer-events-none" />

                        <motion.h3 style={{ transform: "translateZ(30px)" }} className="text-2xl font-semibold mb-6 text-[#00f0ff] tracking-widest uppercase flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                            Education Node
                        </motion.h3>

                        <motion.div style={{ transform: "translateZ(50px)" }} className="relative z-10 glassmorphism p-6 rounded-lg border border-gray-800 hover:border-[#00f0ff]/50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-xl font-bold text-white">B.Tech in Information Technology</h4>
                                <span className="text-[#00f0ff] font-mono text-sm bg-[#00f0ff]/10 px-2 py-1 rounded shadow-[0_0_10px_#00f0ff]">2022–2026</span>
                            </div>
                            <p className="text-gray-400 mb-4">Ambalika Institute of Management and Technology, Lucknow</p>

                            <div className="inline-flex items-center gap-2 bg-[#bc13fe]/10 border border-[#bc13fe]/30 px-4 py-2 rounded font-mono text-[#bc13fe] shadow-[0_0_10px_#bc13fe]">
                                <span>CGPA:</span>
                                <strong className="text-white text-xl ml-1">8.2</strong>
                                <span className="text-sm text-gray-400">/10</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
