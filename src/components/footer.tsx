import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <p className="text-sm">
          © {new Date().getFullYear()} João Ferreira | Todos os direitos reservados
        </p>
        <div className="flex space-x-6">
          <a
            href="https://instagram.com/seu_perfil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-primary transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://facebook.com/seu_perfil"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-primary transition-colors"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://youtube.com/seu_canal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-primary transition-colors"
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
