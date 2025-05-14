"use client";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface Cordel {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  frontCoverUrl: string;
  backCoverUrl: string;
  pdfUrl: string;
}

async function fetchCordel(id: string): Promise<Cordel> {
  const res = await fetch(`/api/cordeis/${id}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || res.statusText);
  }
  return res.json();
}

export default function CordelDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  if (!id) {
    return <div className="pt-24 text-center text-red-600">ID inválido.</div>;
  }

  const { data, isLoading, isError, error } = useQuery<Cordel, Error>({
    queryKey: ["cordel", id],
    queryFn: () => fetchCordel(id as string),
  });

  if (isLoading) {
    return <div className="pt-24 text-center">Carregando...</div>;
  }
  if (isError) {
    return <div className="pt-24 text-center text-red-600">Erro: {error.message}</div>;
  }
  if (!data) {
    return <div className="pt-24 text-center">Nenhum dado disponível.</div>;
  }

  const buyOnWhatsapp = () => {
    const text = encodeURIComponent(`Olá, tenho interesse no cordel "${data.title}"`);
    window.open(`https://wa.me/5581996213652?text=${text}`, "_blank");
  };

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-16 pb-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{data.title}</h1>
        <Button
          onClick={() => router.push("/cordeis")}
          className="cursor-pointer px-6 py-3 bg-primary text-background border-2 border-primary hover:bg-transparent hover:text-primary hover:border-primary transition-colors"
        >
          ← Voltar
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 max-w-4xl mx-auto">
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={encodeURI(`/${data.frontCoverUrl}`)}
            alt={data.title}
            className="rounded-lg shadow-lg max-h-64 sm:max-h-80 md:max-h-[28rem] object-contain"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h3 className="text-base sm:text-lg text-gray-600 mb-4">{data.subtitle}</h3>
          <p className="text-gray-700 mb-6 max-w-prose break-words">
            Você pode adquirir o PDF deste cordel por um valor simbólico.&nbsp;
            <span className="font-semibold">Clique no botão abaixo</span> para comprar via WhatsApp.
          </p>
          <button className="Btn self-start" onClick={buyOnWhatsapp}>
            <div className="sign">
              <svg viewBox="0 0 16 16" className="w-5 h-5">
                <path
                  fill="white"
                  d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                />
              </svg>
            </div>
            <div className="text">WhatsApp</div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .Btn {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 45px;
          height: 45px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: 0.3s;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
          background-color: #00d757;
        }
        .sign {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .text {
          position: absolute;
          right: 0;
          width: 0;
          opacity: 0;
          color: white;
          font-size: 1em;
          font-weight: 600;
          transition: 0.3s;
        }
        .Btn:hover {
          width: 140px;
          border-radius: 40px;
        }
        .Btn:hover .sign {
          width: 30%;
          padding-left: 8px;
        }
        .Btn:hover .text {
          opacity: 1;
          width: 70%;
          padding-right: 8px;
        }
        .Btn:active {
          transform: translate(2px, 2px);
        }
      `}</style>
    </div>
  );
}
