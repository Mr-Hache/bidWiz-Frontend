import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>La página que estás buscando no existe.</p>
      <Link href="/">inicio</Link>
    </div>
  );
}
