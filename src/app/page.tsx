import Link from "next/link";
import fs from "fs";
import path from "path";

interface Artigo {
  slug: string;
  titulo: string;
  autor: string;
  data: string;
  descricao: string;
}

export const dynamic = 'force-static'; // Garante SSG

export default async function Page() {
  const filePath = path.join(process.cwd(), "data", "artigos.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const artigos: Artigo[] = JSON.parse(jsonData);

  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {artigos.map((artigo) => (
          <li key={artigo.slug}>
            <Link href={`/artigos/${artigo.slug}`}>
              <h2>{artigo.titulo}</h2>
              <p>{artigo.descricao}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}