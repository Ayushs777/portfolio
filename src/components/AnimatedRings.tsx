"use client";

import { motion } from 'framer-motion';

export default function AnimatedRings() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40 z-0 flex items-center justify-center">
            {/* Hex Grid Background */}
            <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45v-30z' fill-rule='evenodd' fill='none' stroke='%2300f0ff' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Crosshair / Target */}
            <div className="absolute w-full h-full flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-1 bg-[#00f0ff] h-10 -translate-y-1/2 absolute top-0" />
                <div className="w-1 bg-[#00f0ff] h-10 translate-y-1/2 absolute bottom-0" />
                <div className="h-1 bg-[#00f0ff] w-10 -translate-x-1/2 absolute left-0" />
                <div className="h-1 bg-[#00f0ff] w-10 translate-x-1/2 absolute right-0" />
            </div>

            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>
                {/* Outer Ring */}
                <motion.div
                    className="absolute w-full h-full rounded-full border-[1px] border-[#00f0ff]/30 shadow-[0_0_50px_rgba(0,240,255,0.2)]"
                    animate={{ rotateX: 360, rotateY: 360, rotateZ: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Vertical Ring */}
                <motion.div
                    className="absolute w-[95%] h-[95%] rounded-full border-[1px] border-[#bc13fe]/40"
                    animate={{ rotateX: -360, rotateZ: 180 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Horizontal Ring */}
                <motion.div
                    className="absolute w-[90%] h-[90%] rounded-full border-[1px] border-[#00f0ff]/40"
                    animate={{ rotateY: 360, rotateZ: -180 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Middle Ring (Thick) */}
                <motion.div
                    className="absolute w-[80%] h-[80%] rounded-full border-[3px] border-[#bc13fe]/30 shadow-[0_0_50px_rgba(188,19,254,0.2)]"
                    animate={{ rotateX: -360, rotateY: 180, rotateZ: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* Inner Ring (Dashed) */}
                <motion.div
                    className="absolute w-[60%] h-[60%] rounded-full border-[1px] border-dashed border-white/20"
                    animate={{ rotateX: 180, rotateY: -360, rotateZ: -180 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d' }}
                />

                {/* 4D Coordinate Markers */}
                {[0, 90, 180, 270].map((deg) => (
                    <motion.div
                        key={deg}
                        className="absolute w-[110%] h-px bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent"
                        style={{ rotate: deg, transformStyle: 'preserve-3d' }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                ))}

                {/* Core Glow */}
                <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-[#00f0ff]/20 to-[#bc13fe]/20 blur-3xl animate-pulse" />
            </div>
        </div>
    );
}
