"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Instagram, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContatoPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(false);
        setFormError(false);

        try {
            // In a real app, you would send this to your backend
            // For now, we'll just use mailto
            const emailSubject = encodeURIComponent(subject || `Mensagem de ${name}`);
            const emailBody = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
            window.location.href = `mailto:joao@exemplo.com?subject=${emailSubject}&body=${emailBody}`;

            // Reset form
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setFormSubmitted(true);
        } catch (error) {
            setFormError(true);
            console.error("Error sending email:", error);
        }
    };

    const contactInfo = [
        {
            icon: <Phone className="h-5 w-5" />,
            title: "Telefone",
            value: "+55 (81) 99621-3652",
            action: () => window.open("tel:+5581996213652"),
        },
        {
            icon: <Mail className="h-5 w-5" />,
            title: "Email",
            value: "joao@exemplo.com",
            action: () => window.open("mailto:joao@exemplo.com"),
        },
        {
            icon: <MapPin className="h-5 w-5" />,
            title: "Localização",
            value: "Recife, PE - Brasil",
            action: () => window.open("https://maps.google.com/?q=Recife,PE,Brasil"),
        },
        {
            icon: <Instagram className="h-5 w-5" />,
            title: "Instagram",
            value: "@joao.ferreira.de.oliveira",
            action: () => window.open("https://instagram.com/joao.ferreira.de.oliveira/", "_blank"),
        },
    ];

    const openWhatsApp = () => {
        const txt = encodeURIComponent("Olá, gostaria de mais informações sobre seus trabalhos.");
        window.open(`https://wa.me/5581996213652?text=${txt}`, "_blank");
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen pt-24 pb-16">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-purple-600/20 dark:from-primary/10 dark:to-purple-900/10">
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] dark:[mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.2))]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400 mb-4">
                            Entre em Contato
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Tem alguma dúvida ou gostaria de saber mais sobre meus trabalhos?
                            Estou à disposição para conversar e compartilhar ideias.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800"
                    >
                        <motion.div variants={itemVariants} className="mb-6">
                            <h2 className="text-2xl font-bold mb-2">Envie uma mensagem</h2>
                            <p className="text-muted-foreground">
                                Preencha o formulário abaixo e entrarei em contato o mais breve possível.
                            </p>
                        </motion.div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                                    Nome
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Seu nome completo"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="seu.email@exemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Label htmlFor="subject" className="text-sm font-medium mb-2 block">
                                    Assunto
                                </Label>
                                <Input
                                    id="subject"
                                    placeholder="Assunto da mensagem"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <Label htmlFor="message" className="text-sm font-medium mb-2 block">
                                    Mensagem
                                </Label>
                                <Textarea
                                    id="message"
                                    placeholder="Escreva sua mensagem aqui..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={5}
                                    className="w-full resize-none"
                                    required
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-col space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full gap-2"
                                >
                                    <Send className="h-4 w-4" />
                                    Enviar Mensagem
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full gap-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                                    onClick={openWhatsApp}
                                >
                                    <svg viewBox="0 0 16 16" className="w-4 h-4">
                                        <path
                                            fill="currentColor"
                                            d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                                        />
                                    </svg>
                                    Conversar no WhatsApp
                                </Button>
                            </motion.div>

                            {formSubmitted && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-md mt-4"
                                >
                                    <p className="text-sm flex items-center gap-2">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Mensagem enviada com sucesso! Obrigado pelo contato.
                                    </p>
                                </motion.div>
                            )}

                            {formError && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-md mt-4"
                                >
                                    <p className="text-sm flex items-center gap-2">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                        Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.
                                    </p>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <div className="flex flex-col justify-between">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            <motion.div variants={itemVariants}>
                                <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>
                                <p className="text-muted-foreground mb-8">
                                    Você pode entrar em contato comigo através de qualquer um dos canais abaixo.
                                    Estou sempre disponível para conversar sobre literatura, espiritualidade e poesia.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        className={cn(
                                            "p-6 rounded-xl border border-gray-200 dark:border-gray-800",
                                            "bg-white dark:bg-gray-900 hover:shadow-md transition-shadow",
                                            "cursor-pointer"
                                        )}
                                        onClick={info.action}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                                {info.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{info.title}</h3>
                                                <p className="text-sm text-muted-foreground">{info.value}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* FAQ Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-medium">Perguntas Frequentes</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium">Como adquirir seus livros e cordéis?</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Você pode adquirir meus livros e cordéis entrando em contato diretamente via WhatsApp ou email.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium">Você realiza palestras e eventos?</h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Sim, estou disponível para palestras e eventos relacionados à literatura e espiritualidade.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
