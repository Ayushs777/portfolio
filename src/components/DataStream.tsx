"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DataStream() {
    const [streams, setStreams] = useState<Array<{ left: string, delay: number, duration: number, height: string, opacity: number }>>([]);
    const [hexStrings, setHexStrings] = useState<string[]>([]);

    useEffect(() => {
        const newStreams = Array.from({ length: 15 }).map(() => ({
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: Math.random() * 5 + 5,
            height: `${Math.random() * 100 + 50}px`,
            opacity: Math.random() * 0.1 + 0.05
        }));
        setStreams(newStreams);

        const newHex = Array.from({ length: 12 }).map(() =>
            Math.random().toString(16).substring(2, 10).toUpperCase()
        );
        setHexStrings(newHex);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {streams.map((stream, i) => (
                <motion.div
                    key={i}
                    className="absolute top-0 w-[1px] bg-gradient-to-b from-[#00f0ff] via-[#bc13fe] to-transparent"
                    style={{
                        left: stream.left,
                        height: stream.height,
                        opacity: stream.opacity,
                        boxShadow: '0 0 10px #00f0ff'
                    }}
                    initial={{ y: -200 }}
                    animate={{ y: ['-100%', '1000%'] }}
                    transition={{
                        duration: stream.duration,
                        repeat: Infinity,
                        delay: stream.delay,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Matrix Numbers Layer */}
            {hexStrings.map((hex, i) => (
                <motion.div
                    key={`num-${i}`}
                    className="absolute text-[10px] font-mono text-[#00f0ff] opacity-10 whitespace-nowrap"
                    style={{ left: `${(i * 15) % 95}%`, top: '-10%' }}
                    animate={{ top: ['0%', '110%'], opacity: [0, 0.3, 0] }}
                    transition={{ duration: 15 + (i % 5), repeat: Infinity, delay: i * 0.5, ease: "linear" }}
                >
                    {hex}
                </motion.div>
            ))}
        </div>
    );
}
