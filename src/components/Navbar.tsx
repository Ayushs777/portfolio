"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const NavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');

    return (
        <nav className="fixed top-0 w-full z-50 glassmorphism border-b shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-white/5 bg-black/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link href="#hero" className="text-2xl font-black tracking-widest text-white uppercase group flex items-center gap-2">
                        <span className="w-3 h-3 bg-[#00f0ff] animate-pulse rounded-full shadow-[0_0_10px_#00f0ff]" />
                        <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00f0ff] group-hover:to-[#bc13fe] transition-all duration-300">
                            Ayush
                        </span>
                    </Link>

                    <div className="hidden md:flex space-x-8 items-center">
                        {NavLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setActiveLink(link.name)}
                                className={`text-sm font-mono tracking-wide transition-all duration-300 relative group px-2 py-1 ${activeLink === link.name ? 'text-[#00f0ff]' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${activeLink === link.name
                                    ? 'w-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]'
                                    : 'w-0 bg-[#bc13fe] group-hover:w-full group-hover:shadow-[0_0_8px_#bc13fe]'
                                    }`} />
                            </a>
                        ))}
                        <Link
                            href="/admin"
                            className="bg-black/50 border border-gray-700 hover:border-[#bc13fe] hover:text-[#bc13fe] hover:shadow-[0_0_10px_rgba(188,19,254,0.3)] text-gray-400 font-mono tracking-wide text-xs px-4 py-2 rounded-md transition-all duration-300"
                        >
                            ADMIN
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-400 hover:text-[#00f0ff] focus:outline-none transition-colors"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glassmorphism border-t border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col items-start space-y-4">
                            {NavLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setActiveLink(link.name);
                                    }}
                                    className={`block text-lg font-mono tracking-wide w-full border-b border-gray-800 pb-2 ${activeLink === link.name ? 'text-[#00f0ff]' : 'text-gray-400'
                                        }`}
                                >
                                    <span className={activeLink === link.name ? 'text-[#00f0ff] drop-shadow-[0_0_5px_#00f0ff]' : ''}>
                                        {link.name}
                                    </span>
                                </a>
                            ))}
                            <Link
                                href="/admin"
                                onClick={() => setIsOpen(false)}
                                className="block text-lg font-mono tracking-wide w-full text-[#bc13fe] pt-2"
                            >
                                ADMIN / ROOT
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
