"use client";

import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Image from 'next/image';

const projects = [
    {
        title: "Phishing Detector CLI Tool",
        description: "A machine learning based CLI application to detect phishing attempts, securing users from malicious URLs.",
        tech: ["Python", "ML", "CLI"],
        github: "https://github.com/Ayushs777/-phishing-detector-cli",
        live: "https://phishing-guard-by-ayush7.vercel.app/",
        color: "#00f0ff"
    },
    {
        title: "Real-Time Weather Dashboard",
        description: "An interactive dashboard visualizing real-time weather metrics using Power BI, SQL, and external APIs.",
        tech: ["Power BI", "SQL", "API"],
        github: "https://github.com/Ayushs777/Real-Time-Weather-Detection-Dashboard-using-Power-BI-",
        live: null,
        color: "#bc13fe"
    },
    {
        title: "Road Accident Analysis",
        description: "Data analysis project identifying patterns and key factors in road accidents utilizing Pandas and Power BI.",
        tech: ["Python", "Pandas", "Power BI"],
        github: "https://github.com/Ayushs777/road-accident-analysis",
        live: null,
        color: "#0047ff"
    },
    {
        title: "Cybersecurity Assessment",
        description: "Comprehensive vulnerability scanning and network analysis using Wireshark and Kali Linux tools.",
        tech: ["Wireshark", "Kali Linux", "Security"],
        github: "https://github.com/Ayushs777/cybersecurity-assessment",
        live: null,
        color: "#ff003c"
    }
];

export default function Projects() {
    return (
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
            <SectionHeader title="Modules Installed" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        whileHover={{ y: -10 }}
                        className="group relative glassmorphism rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_20px_var(--hover-color)] transition-all duration-300 border border-gray-800"
                        style={{ "--hover-color": project.color } as React.CSSProperties}
                    >
                        {/* Scanning Bar Animation */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[2px] bg-[var(--hover-color)] opacity-0 group-hover:opacity-100 z-20 shadow-[0_0_15px_var(--hover-color)]"
                            animate={{ top: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: project.color }} />

                        {/* Projector Glow Base */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-32 bg-gradient-to-t from-[var(--hover-color)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />

                        <div className="p-8 h-full flex flex-col">
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--hover-color)] transition-colors duration-300">
                                {project.title}
                            </h3>

                            <p className="text-gray-400 mb-6 flex-grow leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tech.map((tech, tIdx) => (
                                    <span
                                        key={tIdx}
                                        className="text-xs font-mono px-3 py-1 rounded bg-black/50 border border-gray-700 text-[var(--hover-color)] glow-hover"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 mt-auto">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                    >
                                        <Github size={20} />
                                        <span className="text-sm tracking-wider uppercase">Source</span>
                                    </a>
                                )}
                                {project.live && (
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 text-[var(--hover-color)] hover:brightness-150 transition-all font-bold"
                                    >
                                        <ExternalLink size={20} />
                                        <span className="text-sm tracking-wider uppercase drop-shadow-[0_0_5px_currentColor]">Init</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
