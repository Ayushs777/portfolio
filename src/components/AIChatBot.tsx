'use client';

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { Bot, User, Send, X, MessageSquare, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
    return twMerge(clsx(inputs));
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: "Hello! I'm Ayush's Assistant. How can I help you today?",
        },
    ]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!input.trim() || isLoading) return;

            const userMessage: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: input,
            };

            setMessages((prev) => [...prev, userMessage]);
            setInput('');
            setIsLoading(true);

            const assistantId = (Date.now() + 1).toString();
            const decoder = new TextEncoder();

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [...messages, userMessage].map((m) => ({
                            role: m.role,
                            content: m.content,
                        })),
                    }),
                });

                if (!response.ok) throw new Error('API request failed');

                const reader = response.body?.getReader();
                if (!reader) throw new Error('No reader available');

                // Add empty assistant message that we'll stream into
                setMessages((prev) => [
                    ...prev,
                    { id: assistantId, role: 'assistant', content: '' },
                ]);

                let done = false;
                const textDecoder = new TextDecoder();
                while (!done) {
                    const { value, done: readerDone } = await reader.read();
                    done = readerDone;
                    if (value) {
                        const chunk = textDecoder.decode(value, { stream: true });
                        // Parse Vercel AI SDK data stream format: lines like 0:"text"\n
                        const lines = chunk.split('\n').filter(Boolean);
                        for (const line of lines) {
                            if (line.startsWith('0:')) {
                                try {
                                    const text = JSON.parse(line.slice(2));
                                    setMessages((prev) =>
                                        prev.map((m) =>
                                            m.id === assistantId
                                                ? { ...m, content: m.content + text }
                                                : m
                                        )
                                    );
                                } catch {
                                    // skip non-parseable lines
                                }
                            }
                        }
                    }
                }
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: assistantId,
                        role: 'assistant',
                        content: 'Sorry, something went wrong. Please try again later.',
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [input, isLoading, messages]
    );

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-80 sm:w-96 h-[500px] bg-black/80 backdrop-blur-xl border border-[#bc13fe]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-[#bc13fe]/20 bg-[#bc13fe]/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-[#bc13fe] flex items-center justify-center shadow-[0_0_10px_#bc13fe]">
                                    <Bot size={18} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">Ayush&apos;s Assistant</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        <span className="text-[10px] text-gray-400 capitalize">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#bc13fe]/30"
                        >
                            {messages.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 rounded-full bg-[#bc13fe]/10 flex items-center justify-center mx-auto mb-3 border border-[#bc13fe]/20">
                                        <Bot size={24} className="text-[#bc13fe]" />
                                    </div>
                                    <p className="text-xs text-gray-400 max-w-[200px] mx-auto">
                                        Hi! I&apos;m Ayush&apos;s AI assistant. Ask me anything about his skills, projects, or how to contact him.
                                    </p>
                                </div>
                            )}
                            {messages.map((m) => (
                                <div
                                    key={m.id}
                                    className={cn(
                                        "flex items-start gap-2",
                                        m.role === 'user' ? "flex-row-reverse" : "flex-row"
                                    )}
                                >
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                                        m.role === 'user'
                                            ? "bg-white/5 border-white/10"
                                            : "bg-[#bc13fe]/10 border-[#bc13fe]/30"
                                    )}>
                                        {m.role === 'user' ? <User size={14} /> : <Bot size={14} className="text-[#bc13fe]" />}
                                    </div>
                                    <div className={cn(
                                        "max-w-[80%] p-3 rounded-2xl text-sm",
                                        m.role === 'user'
                                            ? "bg-white/10 text-white rounded-tr-none"
                                            : "bg-[#bc13fe]/10 text-gray-200 border border-[#bc13fe]/20 rounded-tl-none"
                                    )}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#bc13fe]/10 flex items-center justify-center shrink-0 border border-[#bc13fe]/30">
                                        <Bot size={14} className="text-[#bc13fe]" />
                                    </div>
                                    <div className="bg-[#bc13fe]/10 p-3 rounded-2xl rounded-tl-none border border-[#bc13fe]/20">
                                        <div className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-[#bc13fe] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-[#bc13fe] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-[#bc13fe] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-[#bc13fe]/20 bg-black/40">
                            <div className="relative">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-[#bc13fe]/50 transition-colors text-white"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#bc13fe] text-white rounded-lg hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_10px_#bc13fe]"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
                    isOpen
                        ? "bg-white text-black rotate-90"
                        : "bg-[#bc13fe] text-white hover:shadow-[0_0_20px_#bc13fe]"
                )}
            >
                {isOpen ? <Minimize2 size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
}
