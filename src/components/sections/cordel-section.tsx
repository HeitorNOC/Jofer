"use client";

import { gsap, Power1 } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const categories = [
    { title: "Amor e Fé", desc: "Explorações poéticas sobre o amor e a fé espírita." },
    { title: "Vida após a Morte", desc: "Relatos e reflexões sobre a imortalidade da alma." },
    { title: "Mediunidade", desc: "Ensaios sobre comunicação com o além." },
    { title: "Ética Espírita", desc: "Princípios e conduta segundo a doutrina espírita." },
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

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current!.children, {
                opacity: 0,
                y: 40,
                duration: 1,
                ease: Power1.easeOut,
                stagger: 0.2,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex flex-col justify-between bg-tertirary px-6 md:px-20 py-16 text-foreground"
        >
            <div className="flex flex-col lg:flex-row gap-12 mb-12">
                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl font-bold">Cordéis Espíritas</h2>
                    <p className="text-lg max-w-lg">
                        Os cordéis são folhetos poéticos que narram histórias, poemas e
                        ensinamentos espirituais, criados por João Ferreira de Oliveira.
                        Escolha uma categoria abaixo e descubra versos que tocam o coração.
                    </p>
                    <p className="text-base italic">“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.”</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {categories.map((c) => (
                        <div key={c.title} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <h3 className="font-semibold mb-2">{c.title}</h3>
                            <p className="text-sm text-muted-foreground">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <Swiper
                modules={[Pagination]}
                slidesPerView={1.2}
                spaceBetween={16}
                pagination={{ clickable: true }}
                breakpoints={{
                    640: { slidesPerView: 2.2 },
                    1024: { slidesPerView: 3.2 },
                }}
                className="w-full max-w-5xl mb-8"
            >
                {cordeis.map((folder) => (
                    <SwiperSlide key={folder} className="!w-auto">
                        <div className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                            <Image
                                src={`/assets/cordeis/${folder}/01.png`}
                                alt={folder}
                                width={180}
                                height={260}
                                className="object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="text-center space-y-4">
                <h2 className="max-w-3xl mx-auto text-2xl leading-relaxed">
                    Adquira agora e mergulhe nesse universo de versos e ensinamentos por um valor simbólico!
                </h2>
                <button
                    onClick={() => router.push("/cordeis")}
                    className="cursor-pointer inline-block px-8 py-3 bg-black text-white rounded-full hover:bg-white hover:text-black border-2 border-black transition-colors duration-300"
                >
                    Ver todos os cordéis
                </button>
            </div>
        </section>
    );
}
