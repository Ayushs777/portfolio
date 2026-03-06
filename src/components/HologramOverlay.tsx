"use client";

import { motion } from 'framer-motion';

export default function HologramOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            {/* Scanlines Effect */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 4px, 3px 100%'
                }}
            />

            {/* Subtle Noise */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* CRT Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />

            {/* Glitch Bars */}
            <motion.div
                className="absolute w-full h-[1px] bg-[#00f0ff]/10 top-0 left-0"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-full h-[2px] bg-[#bc13fe]/10 top-0 left-0"
                animate={{ top: ["100%", "0%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
