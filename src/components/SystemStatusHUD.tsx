"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SystemStatusHUD() {
    const [time, setTime] = useState<Date | null>(null);
    const [coords, setCoords] = useState({ lat: 26.8467, lng: 80.9462 }); // Lucknow Coords

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Randomly jitter coordinates for effect
    useEffect(() => {
        const jitter = setInterval(() => {
            setCoords(prev => ({
                lat: prev.lat + (Math.random() - 0.5) * 0.0001,
                lng: prev.lng + (Math.random() - 0.5) * 0.0001,
            }));
        }, 3000);
        return () => clearInterval(jitter);
    }, []);

    const formattedTime = time ? time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : "00:00:00";

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 pointer-events-none"
            >
                {/* System Stats Block */}
                <div className="glassmorphism p-4 rounded-lg border border-[#00f0ff]/30 shadow-[0_0_20px_rgba(0,240,255,0.1)] backdrop-blur-md">
                    <div className="flex items-center gap-3 mb-2 border-b border-[#00f0ff]/20 pb-1">
                        <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse shadow-[0_0_10px_#00f0ff]" />
                        <span className="text-[10px] font-mono text-[#00f0ff] tracking-widest uppercase">System Status: Online</span>
                    </div>

                    <div className="space-y-1 font-mono text-[9px] text-gray-400">
                        <div className="flex justify-between gap-4">
                            <span>LATITUDE:</span>
                            <span className="text-white">{coords.lat.toFixed(5)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span>LONGITUDE:</span>
                            <span className="text-white">{coords.lng.toFixed(5)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span>UPTIME:</span>
                            <span className="text-white">{formattedTime}</span>
                        </div>
                    </div>

                    <div className="mt-2 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#bc13fe]"
                            animate={{ width: ["10%", "90%", "40%", "70%"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                {/* Secure Node Tag */}
                <div className="glassmorphism px-3 py-1 rounded border border-[#bc13fe]/30 self-end shadow-[0_0_10px_rgba(188,19,254,0.1)]">
                    <span className="text-[8px] font-mono text-[#bc13fe] tracking-tighter">NODE_SECURE_V4.2.1</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
