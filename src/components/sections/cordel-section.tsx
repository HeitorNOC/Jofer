"use client";

import { BookOpen, Heart, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
    {
        title: "Amor e Fé",
        desc: "Explorações poéticas sobre o amor e a fé espírita.",
        icon: <Heart className="w-5 h-5 text-primary" />,
        color: "from-pink-500/20 to-red-500/20",
    },
    {
        title: "Vida após a Morte",
        desc: "Relatos e reflexões sobre a imortalidade da alma.",
        icon: <Star className="w-5 h-5 text-primary" />,
        color: "from-blue-500/20 to-purple-500/20",
    },
    {
        title: "Mediunidade",
        desc: "Ensaios sobre comunicação com o além.",
        icon: <Sparkles className="w-5 h-5 text-primary" />,
        color: "from-yellow-500/20 to-amber-500/20",
    },
    {
        title: "Ética Espírita",
        desc: "Princípios e conduta segundo a doutrina espírita.",
        icon: <BookOpen className="w-5 h-5 text-primary" />,
        color: "from-green-500/20 to-emerald-500/20",
    },
];

const cordeis = [
    "01 - O consolador prometido",
    "02 - Nossa dor nossa mestra",
    "05 - Deixai vir a mim as criancinhas",
    "09 - A família sob a ótica espírita",
    "11 - O homem de bem sob a ótica espírita",
    "19 - A felicidade sob a ótica espírita",
    "20 - A cremação de corpos",
    "21 - Mediunidade ultrajada",
    "22 - Os sonhos sob a ótica espírita",
    "23 - Causa e efeito",
];

export function CordelSection() {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Simple fade-in animation without complex GSAP
    useEffect(() => {
        // Prevent flash of unstyled content
        if (typeof window !== "undefined" && sectionRef.current) {
            // Set initial state
            sectionRef.current.style.opacity = "0";

            // Simple fade in after a small delay to ensure everything is rendered
            const timer = setTimeout(() => {
                if (sectionRef.current) {
                    sectionRef.current.style.opacity = "1";
                    sectionRef.current.style.transition = "opacity 0.5s ease-in-out";
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleCordelClick = (index: number) => {
        // Navigate to specific cordel page
        router.push(`/cordeis/${index + 1}`);
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden"
        >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-tertirary/90 to-tertirary dark:from-gray-900 dark:to-gray-800">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            </div>

            <div className="container mx-auto px-6 md:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium mb-4">
                        Literatura de Cordel
                    </div>
                    <h2
                        className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 mb-6"
                    >
                        Cordéis Espíritas
                    </h2>
                    <p
                        className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                    >
                        Os cordéis são folhetos poéticos que narram histórias, poemas e
                        ensinamentos espirituais, criados por João Ferreira de Oliveira.
                        Escolha uma categoria abaixo e descubra versos que tocam o coração.
                    </p>
                </div>

                {/* Categories */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
                >
                    {categories.map((c) => (
                        <div
                            key={c.title}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] group"
                        >
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {c.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{c.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{c.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Cordel Carousel */}
                <div className="mb-10">
                    <Swiper
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView="auto"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{ clickable: true }}
                        modules={[EffectCoverflow, Pagination, Autoplay]}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="w-full py-10"
                    >
                        {cordeis.map((folder, index) => (
                            <SwiperSlide
                                key={folder}
                                className="!w-[220px] sm:!w-[240px] !h-[320px] sm:!h-[340px] cursor-pointer"
                                onClick={() => handleCordelClick(index)}
                            >
                                <div className={`relative w-full h-full rounded-xl overflow-hidden shadow-xl transition-all duration-500 ${activeIndex === index ? 'scale-105 shadow-2xl' : 'scale-95 opacity-80'}`}>
                                    <Image
                                        src={`/assets/cordeis/${folder}/01.png`}
                                        alt={folder}
                                        fill
                                        sizes="(max-width: 768px) 220px, 240px"
                                        className="object-cover"
                                        priority={index < 3} // Prioritize loading first 3 images
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                        <h4 className="text-white text-sm font-medium line-clamp-2">
                                            {folder.split(" - ")[1]}
                                        </h4>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* CTA Section */}
                <div className="text-center max-w-3xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary text-sm font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>Coleção completa disponível</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        Adquira agora e mergulhe nesse universo de versos e ensinamentos!
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300">
                        Cada cordel traz uma mensagem única que combina espiritualidade e poesia popular.
                    </p>

                    <button
                        onClick={() => router.push("/cordeis")}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                        <BookOpen className="w-5 h-5" />
                        <span>Ver todos os cordéis</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform group-hover:translate-x-1"
                        >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
