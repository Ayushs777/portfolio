"use client";

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const achievements = [
    {
        title: "National Selection",
        desc: "46th JNNSMEE Science Exhibition",
        year: "2019",
        color: "#00f0ff"
    },
    {
        title: "Winner",
        desc: "National Science Exhibition Meerut",
        year: "2018",
        color: "#bc13fe"
    },
    {
        title: "Content Committee Head",
        desc: "IEEE Club AIMT",
        year: "2023–24",
        color: "#00f0ff"
    },
    {
        title: "Competition Winner",
        desc: "Logo Competition",
        year: "2024",
        color: "#18f704"
    },
    {
        title: "Competition Winner",
        desc: "Football Tournament",
        year: "2022",
        color: "#00f0ff"
    }
];

const certifications = [
    { name: "C Programming", from: "IIT Bombay" },
    { name: "Java", from: "Infosys Springboard" },
    { name: "Cybersecurity Foundations", from: "Infosys Springboard" },
    { name: "Google Analytics (Beginner & Advanced)", from: "Google" },
    { name: "Data Analytics Professional Certificate", from: "IBM" },
    { name: "Python with Generative AI", from: "Cambridge center of analytics" }
];

export default function Achievements() {
    return (
        <section id="achievements" className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Timeline Section */}
            <div>
                <SectionHeader title="Milestones" />

                <div className="relative border-l border-gray-700 ml-4 space-y-10 py-4">
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="relative pl-8"
                            style={{ "--accent": item.color } as any}
                        >
                            {/* Timeline Node */}
                            <div
                                className="absolute top-1 -left-[9px] w-4 h-4 rounded-full bg-black border-2 transition-shadow duration-300"
                                style={{ borderColor: item.color, boxShadow: `0 0 10px ${item.color}` }}
                            />

                            <div className="glassmorphism p-6 rounded-lg border border-gray-800 hover:border-[var(--accent)] transition-colors duration-300 group">
                                <span className="text-sm font-mono text-[var(--accent)] drop-shadow-[0_0_5px_currentColor]">
                                    [{item.year}]
                                </span>
                                <h3 className="text-xl font-bold text-white mt-1 mb-2 group-hover:text-[var(--accent)] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certifications Section */}
            <div>
                <SectionHeader title="Certifications" color="#bc13fe" />

                <div className="grid grid-cols-1 gap-6">
                    {certifications.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            whileHover={{ scale: 1.02, x: 10 }}
                            className="glassmorphism p-6 rounded-lg border-l-4 hover:bg-[rgba(188,19,254,0.05)] transition-all duration-300 flex flex-col justify-center"
                            style={{ borderLeftColor: idx % 2 === 0 ? '#bc13fe' : '#00f0ff', boxShadow: `0 0 15px rgba(255,255,255,0.05)` }}
                        >
                            <h3 className="text-xl font-bold text-white mb-2">
                                {cert.name}
                            </h3>
                            <p className="text-sm uppercase tracking-wide text-gray-400 flex items-center gap-2">
                                &gt; {cert.from}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

        </section>
    );
}
