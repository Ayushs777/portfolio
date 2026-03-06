"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import type { Content } from '@/app/actions';
import AnimatedRings from './AnimatedRings';
import DataStream from './DataStream';

export default function Hero({ content }: { content: Content }) {
    const roles = useMemo(() => {
        return content.heroRoles ? content.heroRoles.split(',').map(r => r.trim()) : ["Software Engineer"];
    }, [content.heroRoles]);

    const [currentRole, setCurrentRole] = useState(0);
    const [particles, setParticles] = useState<Array<{
        top: string;
        left: string;
        width: string;
        height: string;
        animationDuration: string;
        opacity: number;
        backgroundColor: string;
        color: string;
    }>>([]);

    useEffect(() => {
        // Generate random particles only on the client
        const newParticles = [...Array(30)].map(() => {
            const colors = ['#00f0ff', '#bc13fe', '#0047ff'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                opacity: Math.random() * 0.5 + 0.1,
                backgroundColor: color,
                color: color
            };
        });
        setParticles(newParticles);

        const intervalId = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2500);
        return () => clearInterval(intervalId);
    }, [roles.length]);

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden perspective-1000">
            {/* Background Particles (Simplified with CSS animation) */}
            <div className="absolute inset-0 max-w-7xl mx-auto overflow-hidden pointer-events-none z-0">
                <DataStream />
                {particles.map((style, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full animate-pulse shadow-[0_0_10px_currentColor]"
                        style={style}
                    />
                ))}
            </div>

            {/* Advanced 3D Centerpiece */}
            <AnimatedRings />

            <div className="z-10 text-center flex flex-col items-center mt-12 w-full max-w-4xl mx-auto relative relative">
                <motion.div
                    className="absolute -top-32 -left-20 w-64 h-64 bg-[#00f0ff] rounded-full blur-[120px] opacity-20 pointer-events-none"
                />
                <motion.div
                    className="absolute -bottom-32 -right-20 w-64 h-64 bg-[#bc13fe] rounded-full blur-[120px] opacity-20 pointer-events-none"
                />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-4 glassmorphism px-6 py-2 rounded-full border border-gray-700/50 shadow-sm shadow-[#00f0ff]/10"
                >
                    <h2 className="text-sm md:text-md text-gray-300 uppercase tracking-[0.2em] font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
                        System Online. Identity Confirmed.
                    </h2>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter w-full"
                >
                    Hi, I'm <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#bc13fe] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)] block mt-2">
                        Ayush Chaudhary
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-10 md:h-16 flex justify-center items-center mb-8 w-full"
                >
                    <span className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-200">
                        {roles[currentRole]}
                    </span>
                    <span className="w-1 h-8 md:h-12 bg-[#bc13fe] ml-2 animate-pulse shadow-[0_0_10px_#bc13fe]" />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium"
                >
                    {content.bio}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full relative"
                >
                    {/* Corner Brackets for 4D feel */}
                    <div className="absolute -top-10 -left-10 w-8 h-8 border-t-2 border-l-2 border-[#00f0ff]/30 pointer-events-none" />
                    <div className="absolute -top-10 -right-10 w-8 h-8 border-t-2 border-r-2 border-[#bc13fe]/30 pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-8 h-8 border-b-2 border-l-2 border-[#bc13fe]/30 pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-8 h-8 border-b-2 border-r-2 border-[#00f0ff]/30 pointer-events-none" />

                    <a
                        href="#projects"
                        className="px-8 py-4 rounded-md font-bold text-[#00f0ff] border border-[#00f0ff] uppercase tracking-wider text-sm hover:bg-[#00f0ff] hover:text-[#050505] transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transform hover:-translate-y-1 w-full sm:w-auto text-center"
                    >
                        View Projects
                    </a>
                    <a
                        href={content.resumeLink}
                        className="px-8 py-4 rounded-md font-bold bg-[#bc13fe] text-white border border-[#bc13fe] uppercase tracking-wider text-sm hover:bg-transparent hover:text-[#bc13fe] transition-all duration-300 shadow-[0_0_10px_rgba(188,19,254,0.3)] hover:shadow-[0_0_20px_rgba(188,19,254,0.5)] transform hover:-translate-y-1 w-full sm:w-auto text-center"
                        download={content.resumeLink.endsWith('.pdf') ? true : undefined}
                        target={content.resumeLink.startsWith('http') ? '_blank' : undefined}
                    >
                        Download Resume
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-16 flex justify-center gap-8 w-full border-t border-gray-800 pt-8"
                >
                    <a href={content.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1 hover:shadow-[0_0_15px_white] rounded-full">
                        <Github size={28} />
                    </a>
                    <a href={content.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#0047ff] transition-all transform hover:-translate-y-1 hover:drop-shadow-[0_0_15px_#0047ff]">
                        <Linkedin size={28} />
                    </a>
                    <a href="mailto:ayushchaudhary@gmail.com" className="text-gray-500 hover:text-[#bc13fe] transition-all transform hover:-translate-y-1 hover:drop-shadow-[0_0_15px_#bc13fe]">
                        <Mail size={28} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
