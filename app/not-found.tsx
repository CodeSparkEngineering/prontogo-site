import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="nf-page">
      <Image
        src="/assets/prontogo-icone-v2.svg"
        alt="ProntoGo"
        width={72}
        height={72}
      />
      <h1>Página não encontrada</h1>
      <p>
        Esta encomenda perdeu-se no caminho — a página que procura não existe
        ou mudou de morada.
      </p>
      <Link href="/" className="btn btn-primary">
        Voltar ao início
      </Link>
    </main>
  );
}
