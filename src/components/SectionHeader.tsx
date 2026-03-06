"use client";

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Props {
    title: string;
    subtitle?: string;
    color?: string;
}

export default function SectionHeader({ title, subtitle, color = "#00f0ff" }: Props) {
    const [nodeId, setNodeId] = useState("");

    useEffect(() => {
        setNodeId(`0x${Math.floor(Math.random() * 1000).toString(16)}`);
    }, []);
    return (
        <div className="flex flex-col items-center mb-16 relative">
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em] relative z-10"
                style={{ color }}
            >
                <span className="relative inline-block">
                    {title}
                    {/* Glitch Shadow Effect */}
                    <motion.span
                        className="absolute inset-0 opacity-20 text-[#bc13fe] -z-10"
                        animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                    >
                        {title}
                    </motion.span>
                </span>
            </motion.h2>

            {subtitle && (
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "200px" }}
                    className="h-px mt-4 bg-gradient-to-r from-transparent via-[var(--color)] to-transparent"
                    style={{ "--color": color } as any}
                />
            )}

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-gray-500 font-mono text-[10px] mt-2 uppercase tracking-widest"
            >
                {nodeId && `SYNC_NODE_${title.substring(0, 3).toUpperCase()}_${nodeId}`}
            </motion.p>
        </div>
    );
}
