// src/app/contato/page.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { gsap, Power2 } from "gsap";
import { Instagram, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContatoPage() {
    const sectionRef = useRef<HTMLElement>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {
            gsap.from(".fade-up", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: Power2.easeOut,
                stagger: 0.15,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Mensagem de ${name}`);
        const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:joao@exemplo.com?subject=${subject}&body=${body}`;
    };

    const openWhatsApp = () => {
        const txt = encodeURIComponent("Olá, gostaria de mais informações.");
        window.open(`https://wa.me/5581996213652?text=${txt}`, "_blank");
    };
    const openInstagram = () => window.open("https://instagram.com/joao.ferreira.de.oliveira/", "_blank");

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center
                 bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-700
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
                 p-6"
        >
            <div className="grid lg:grid-cols-2 gap-12 max-w-5xl w-full">
                {/* Formulário por Email */}
                <form onSubmit={handleSubmit} className="fade-up bg-white/20 dark:bg-black/50 backdrop-blur-lg rounded-3xl p-10 space-y-6">
                    <h2 className="text-4xl font-extrabold text-white mb-4">Enviar por Email</h2>
                    <Input
                        placeholder="Seu Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white/30 dark:bg-black/60 text-white placeholder-gray-300 dark:placeholder-gray-400 focus:bg-white/40 dark:focus:bg-black/70 transition-colors"
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Seu Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/30 dark:bg-black/60 text-white placeholder-gray-300 dark:placeholder-gray-400 focus:bg-white/40 dark:focus:bg-black/70 transition-colors"
                        required
                    />
                    <Textarea
                        placeholder="Sua Mensagem"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="bg-white/30 dark:bg-black/60 text-white placeholder-gray-300 dark:placeholder-gray-400 focus:bg-white/40 dark:focus:bg-black/70 transition-colors"
                        required
                    />
                    <Button type="submit" className="w-full bg-gradient-to-r from-pink-600 to-orange-500 dark:from-purple-600 dark:to-indigo-500 text-white font-bold py-3 rounded-full hover:opacity-90 transition cursor-pointer">
                        Enviar por Email
                    </Button>
                </form>

                <div className="fade-up flex flex-col justify-center space-y-8">
                    <h2 className="text-3xl font-bold text-white">Outros Canais</h2>
                    <div className="flex space-x-6">
                        <button
                            onClick={openWhatsApp}
                            className="p-4 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full
                         hover:bg-green-500 hover:scale-110 transition-transform cursor-pointer"
                        >
                            <svg viewBox="0 0 16 16" className="w-6 h-6 text-white">
                                <path
                                    fill="currentColor"
                                    d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                                />
                            </svg>
                        </button>
                        <button
                            onClick={openInstagram}
                            className="p-4 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full
                         hover:bg-pink-500 hover:scale-110 transition-transform cursor-pointer"
                        >
                            <Instagram className="w-6 h-6 text-white" />
                        </button>
                        <button
                            onClick={() => (window.location.href = "mailto:joao@exemplo.com")}
                            className="p-4 bg-white/20 dark:bg-white/10 backdrop-blur-lg rounded-full
                         hover:bg-blue-500 hover:scale-110 transition-transform cursor-pointer"
                        >
                            <Mail className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
