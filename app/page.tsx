import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { GithubIcon } from "@/components/icons";
import { Card, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <main className="container mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenido a la Gestión del Restaurante
        </h2>
        <Card isFooterBlurred className="border-none" radius="lg">
          <Link href="/tables">
            <Button>
              Gestión de Mesas
            </Button>
          </Link>
        </Card>
        <Card isFooterBlurred className="border-none" radius="lg">
          <Link href="/menu">
            <Button>
              Gestión del Menú
            </Button>
          </Link>
        </Card>
      </main>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
