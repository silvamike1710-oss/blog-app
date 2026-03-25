import fs from "fs";
import path from "path";

interface Artigo {
  slug: string;
  titulo: string;
  autor: string;
  data: string;
  descricao: string;
  conteudo: string;
}

interface Props {
  params: { slug: string };
}

// SSG: gera rotas estáticas com generateStaticParams
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "data", "artigos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const artigos: Artigo[] = JSON.parse(jsonData);

  return artigos.map((artigo) => ({ slug: artigo.slug }));
}

// SEO Dinâmico
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "data", "artigos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const artigos: Artigo[] = JSON.parse(jsonData);

  const artigo = artigos.find((a) => a.slug === slug);

  if (!artigo) return { title: "Artigo não encontrado" };

  return {
    title: artigo.titulo,
    description: artigo.descricao
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), "data", "artigos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const artigos: Artigo[] = JSON.parse(jsonData);

  const artigo = artigos.find((a) => a.slug === slug);

  if (!artigo) return <p>Artigo não encontrado</p>;

  return (
    <article>
      <h1>{artigo.titulo}</h1>
      <p>
        Por {artigo.autor} - {artigo.data}
      </p>
      <div>{artigo.conteudo}</div>
    </article>
  );
}