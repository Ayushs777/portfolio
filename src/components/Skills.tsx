"use client";

import { motion } from 'framer-motion';
import SectionHeader from './SectionHeader';

const skillCategories = [
    {
        title: "Programming",
        skills: ["C", "Python", "SQL", "JavaScript", "Java", "HTML", "CSS", "React.js"],
        color: "#00f0ff"
    },
    {
        title: "AI / Data",
        skills: ["NumPy", "Pandas", "Scikit-[learn]", "OpenCV", "Power BI", "Tableau", "Matplotlib", "Seaborn", "Advanced Excel"],
        color: "#bc13fe"
    },
    {
        title: "Networking & Security",
        skills: ["TCP/IP", "DNS", "DHCP", "Firewall", "VPN", "Wireshark", "Kali Linux"],
        color: "#0047ff"
    },
    {
        title: "Frameworks & Tools",
        skills: ["Flask", "Git", "GitHub", "Jupyter Notebook", "VS Code", "PyCharm", "VMware", "Linux", "Windows Server", "Canva"],
        color: "#18f704"  // distinct neon green
    }
];

export default function Skills() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } as any }
    };

    return (
        <section id="skills" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
            <SectionHeader title="Tech_Arsenal" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {skillCategories.map((category, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className="glassmorphism p-6 rounded-xl border border-gray-800 hover:border-transparent transition-all duration-300 relative group overflow-hidden shadow-lg hover:shadow-2xl"
                        whileHover={{ scale: 1.03, rotateX: 5, rotateY: 5 }}
                        style={{ transformStyle: 'preserve-3d', perspective: '1000px', ["--hover-color" as string]: category.color }}
                    >
                        {/* Hover Glow Background */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                            style={{ backgroundColor: category.color }}
                        />
                        {/* Animated border line on hover */}
                        <div
                            className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-in-out"
                            style={{ backgroundColor: category.color }}
                        />

                        <h3
                            className="text-2xl font-bold mb-6 tracking-widest uppercase items-center flex gap-3 drop-shadow-md z-10 relative"
                            style={{ color: category.color }}
                        >
                            <div className="h-[2px] w-8 shadow-[0_0_10px_currentColor]" style={{ backgroundColor: category.color }} />
                            {category.title}
                        </h3>

                        <div className="flex flex-wrap gap-3 z-10 relative">
                            {category.skills.map((skill, sIdx) => {
                                // Remove brackets from "Scikit-[learn]" for display if needed, or leave as is. User put brackets.
                                const displayName = skill.replace(/\[|\]/g, "");

                                return (
                                    <span
                                        key={sIdx}
                                        className="px-4 py-2 rounded-md text-sm font-medium bg-black/50 border border-gray-700 text-gray-300 group-hover:text-white transition-all cursor-default shadow-sm hover:shadow-[0_0_10px_var(--hover-color)] hover:border-[var(--hover-color)] hover:bg-[#050505]"
                                    >
                                        {displayName}
                                    </span>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
