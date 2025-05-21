import { Facebook, Heart, Instagram, Mail, Youtube } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-foreground pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-blue-400">
                João Ferreira
              </h2>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Poesia, literatura de cordel e espiritualidade para iluminar sua jornada.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "/" },
                { label: "Cordéis", href: "/cordeis" },
                { label: "Livro", href: "/livro" },
                { label: "Palestras", href: "/palestras" },
                { label: "Contato", href: "/contato" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail size={16} />
                <a
                  href="mailto:joao@exemplo.com"
                  className="hover:text-primary transition-colors"
                >
                  joao@exemplo.com
                </a>
              </li>
              <li>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    const text = encodeURIComponent("Olá, gostaria de mais informações.");
                    window.open(`https://wa.me/5581996213652?text=${text}`, "_blank");
                  }}
                >
                  Fale pelo WhatsApp
                </Button>
              </li>
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/joao.ferreira.de.oliveira"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 bg-white dark:bg-gray-800 rounded-full text-muted-foreground hover:text-primary hover:shadow-md transition-all duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/seu_perfil"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 bg-white dark:bg-gray-800 rounded-full text-muted-foreground hover:text-primary hover:shadow-md transition-all duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://youtube.com/seu_canal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="p-2 bg-white dark:bg-gray-800 rounded-full text-muted-foreground hover:text-primary hover:shadow-md transition-all duration-200"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} João Ferreira | Todos os direitos reservados
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart size={14} className="text-red-500 fill-red-500" /> no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
