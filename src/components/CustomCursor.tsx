"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e: MouseEvent) => {
            if ((e.target as HTMLElement).tagName.toLowerCase() === 'a' ||
                (e.target as HTMLElement).tagName.toLowerCase() === 'button' ||
                (e.target as HTMLElement).closest('a') ||
                (e.target as HTMLElement).closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Only show on desktop (no touch)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            {/* 4D Outer Scope */}
            <motion.div
                className="fixed top-0 left-0 w-12 h-12 border border-[#00f0ff]/50 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
                animate={{
                    x: mousePosition.x - 24,
                    y: mousePosition.y - 24,
                    rotate: isHovering ? 90 : 0,
                    scale: isHovering ? 1.2 : 1,
                    borderRadius: isHovering ? "20%" : "50%"
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
                <div className="absolute w-full h-[1px] bg-[#00f0ff]/20" />
                <div className="absolute h-full w-[1px] bg-[#00f0ff]/20" />
            </motion.div>

            {/* Inner Point */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#bc13fe] pointer-events-none z-[10000] hidden md:block shadow-[0_0_15px_#bc13fe]"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    scale: isHovering ? 1.5 : 1
                }}
                transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }}
            />

            {/* Coordinate Label */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block ml-6 mt-6 font-mono text-[8px] text-[#00f0ff] opacity-40 uppercase"
                animate={{
                    x: mousePosition.x,
                    y: mousePosition.y,
                }}
            >
                X:{mousePosition.x} Y:{mousePosition.y}
            </motion.div>
        </>
    );
}
