import { Pizza } from "lucide-react";

export function Footer() {
    return (
      <footer className="bg-background text-muted-foreground py-6 text-center text-sm">
        <p>© {new Date().getFullYear()} João Ferreira | Todos os direitos reservados</p>
        <div className="flex justify-center gap-4">
          <a href="https://github.com/joaof" target="_blank" rel="noopener noreferrer">
            <Pizza size={24} />
          </a>
          <a href="mailto:joao@exemplo.com" target="_blank" rel="noopener noreferrer">
            <Pizza size={24} />
          </a>
        </div>
      </footer>
    );
  }