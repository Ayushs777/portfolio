"use client";

import { motion } from 'framer-motion';

const experiences = [
    {
        role: "Data Analyst Intern",
        company: "Cambridge Centre of Analytics",
        duration: "Jan 2024 – May 2024",
        location: "Remote",
        responsibilities: [
            "Data cleaning using Python (NumPy, Pandas) and SQL",
            "Built interactive Power BI dashboards",
            "Identified trends in large datasets"
        ],
        color: "#00f0ff"
    },
    {
        role: "WBL Intern",
        company: "NIELIT Lucknow",
        duration: "Jun 2024 – Present",
        location: "On-site",
        responsibilities: [
            "Network security reviews using Wireshark and Kali Linux",
            "Implemented firewall rules and policies",
            "Developed incident response procedures"
        ],
        color: "#bc13fe"
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#bc13fe] tracking-wider uppercase">
                [ Experience Log ]
            </h2>

            <div className="relative border-l border-gray-700 ml-4 md:ml-12 space-y-12 py-4">
                {experiences.map((exp, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        className="relative pl-8 md:pl-12"
                        style={{ "--accent": exp.color } as any}
                    >
                        {/* Timeline Node */}
                        <div
                            className="absolute top-1 -left-[9px] w-4 h-4 rounded-full bg-black border-2 transition-shadow duration-300"
                            style={{ borderColor: exp.color, boxShadow: `0 0 15px ${exp.color}` }}
                        />

                        <div className="glassmorphism p-8 rounded-xl border border-gray-800 hover:border-[var(--accent)] transition-all duration-500 group shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:shadow-[0_0_30px_var(--accent)]">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                                        {exp.role}
                                    </h3>
                                    <h4 className="text-lg text-gray-300 font-mono mt-1">
                                        @ {exp.company}
                                    </h4>
                                </div>
                                <div className="text-left md:text-right flex flex-col items-start md:items-end">
                                    <span className="text-sm font-mono text-[var(--accent)] bg-black/50 px-3 py-1 rounded-full border border-gray-700 group-hover:border-[var(--accent)] transition-colors shadow-sm">
                                        {exp.duration}
                                    </span>
                                    <span className="text-sm text-gray-500 mt-2 uppercase tracking-wide font-semibold">
                                        {exp.location}
                                    </span>
                                </div>
                            </div>

                            <ul className="space-y-3 mt-6">
                                {exp.responsibilities.map((task, tIdx) => (
                                    <li key={tIdx} className="text-gray-400 flex items-start gap-3">
                                        <span className="text-[var(--accent)] mt-1">▹</span>
                                        <span>{task}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
