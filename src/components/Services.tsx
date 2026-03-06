"use client";

import { motion } from 'framer-motion';
import {
    Bot,
    Image,
    Cpu,
    GraduationCap,
    Film,
    Video,
    Briefcase,
    Code2,
    UserCheck,
    Palette,
    Target,
    ArrowRight
} from 'lucide-react';
import type { Content } from '@/app/actions';

const services = [
    {
        icon: <Bot size={32} className="text-[#00f0ff]" />,
        title: "AI Agents & Automation",
        description: "Building intelligent AI agents and autonomous workflows to streamline complex business processes.",
        color: "0, 240, 255"
    },
    {
        icon: <Image size={32} className="text-[#bc13fe]" />,
        title: "Lofi Animations & Graphics",
        description: "High-quality visual aesthetics, custom Lofi-style animations, and premium graphic design assets.",
        color: "188, 19, 254"
    },
    {
        icon: <Cpu size={32} className="text-[#1dbf73]" />,
        title: "Full-Stack AI Integration",
        description: "Modern web development combined with deep AI integration for smart, scalable applications.",
        color: "29, 191, 115"
    },
    {
        icon: <GraduationCap size={32} className="text-white" />,
        title: "College Projects & Assignments",
        description: "Professional technical assistance for academic projects, ensuring high-quality implementation and documentation.",
        color: "255, 255, 255"
    },
    {
        icon: <Film size={32} className="text-[#00f0ff]" />,
        title: "Animation & Motion Design",
        description: "Dynamic motion graphics and professional animation services that bring your creative vision to life.",
        color: "0, 240, 255"
    },
    {
        icon: <Video size={32} className="text-[#bc13fe]" />,
        title: "Short-Form Content Services",
        description: "Optimized video editing and content creation for TikTok, Reels, and YouTube Shorts.",
        color: "188, 19, 254"
    },
    {
        icon: <Briefcase size={32} className="text-[#1dbf73]" />,
        title: "Business & Marketing",
        description: "Strategic marketing solutions and business development services to accelerate your brand growth.",
        color: "29, 191, 115"
    },
    {
        icon: <Code2 size={32} className="text-white" />,
        title: "Development & Tech",
        description: "Specialized technical solutions, software architecture, and custom development tailored to requirements.",
        color: "255, 255, 255"
    },
    {
        icon: <UserCheck size={32} className="text-[#00f0ff]" />,
        title: "Virtual Assistant & Admin",
        description: "Efficient administrative support and virtual assistant services to manage your operations seamlessly.",
        color: "0, 240, 255"
    },
    {
        icon: <Palette size={32} className="text-[#bc13fe]" />,
        title: "Design & Branding",
        description: "Creating impactful brand identities through modern design principles and cohesive visual storytelling.",
        color: "188, 19, 254"
    },
    {
        icon: <Target size={32} className="text-[#1dbf73]" />,
        title: "Ultra-Specific Niche Service",
        description: "Highly specialized technical solutions for rare and complex requirements in niche industries.",
        color: "29, 191, 115"
    }
];

export default function Services({ content }: { content: Content }) {
    if (!content.fiverr) return null;

    return (
        <section id="services" className="py-24 px-6 max-w-7xl mx-auto perspective-1000 relative">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="text-center mb-16 relative"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#1dbf73] rounded-full blur-[100px] opacity-20 pointer-events-none" />
                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#1dbf73] to-white drop-shadow-[0_0_15px_rgba(29,191,115,0.4)]">
                    [ Freelance Services ]
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Need technical expertise for your project? I am available for freelance work specifically on Fiverr. Select a service below.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {services.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                        whileHover={{ scale: 1.05, rotateY: 10, rotateX: 5 }}
                        className="glassmorphism p-8 md:p-10 rounded-2xl relative overflow-hidden group border border-white/5 transition-all"
                        style={{
                            transformStyle: 'preserve-3d',
                            boxShadow: `0 0 20px rgba(${service.color}, 0.05)`
                        }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(${service.color},0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <motion.div style={{ transform: "translateZ(30px)" }} className="mb-6 bg-black/50 w-16 h-16 rounded-full flex items-center justify-center border border-white/10 group-hover:border-[currentColor] transition-colors">
                            {service.icon}
                        </motion.div>
                        <motion.h3 style={{ transform: "translateZ(40px)" }} className="text-2xl font-bold mb-4 text-white">
                            {service.title}
                        </motion.h3>
                        <motion.p style={{ transform: "translateZ(20px)" }} className="text-gray-400 mb-6 leading-relaxed">
                            {service.description}
                        </motion.p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <a
                    href={content.fiverr}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative px-8 py-4 bg-[#1dbf73] text-white font-bold rounded-lg overflow-hidden shadow-[0_0_20px_rgba(29,191,115,0.3)] hover:shadow-[0_0_40px_rgba(29,191,115,0.6)] transition-all flex items-center gap-3"
                >
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <span className="relative z-10 flex items-center gap-2 tracking-wider text-lg">
                        Hire me on Fiverr <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </a>
            </motion.div>
        </section>
    );
}
