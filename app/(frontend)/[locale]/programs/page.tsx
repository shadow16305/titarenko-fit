import { getTranslations } from "next-intl/server";
import { getProducts } from "@/utils/data/products/get-products";
import { getCategories } from "@/utils/data/get-categories";
import Image from "next/image";
import dynamic from "next/dynamic";

const ProgramTabs = dynamic(() =>
  import("./_components/program-tabs").then((mod) => mod.ProgramTabs),
);

const ProgramsMobile = dynamic(() =>
  import("./_components/programs-mobile").then((mod) => mod.ProgramsMobile),
);

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ locale: "en" | "ru" }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "ProgramPage" });
  const programs = await getProducts({ locale });
  const categories = await getCategories({ locale });

  if (!programs || !categories) return <p>Something went wrong</p>;

  return (
    <article className="relative h-full w-screen bg-turquoise-light">
      <section className="relative z-10 mx-auto w-11/12 max-w-[1440px] pb-14 pt-28">
        <h1>{t("heading")}</h1>
        <ProgramTabs
          programs={programs}
          categories={categories}
          locale={locale}
        />
        <ProgramsMobile
          locale={locale}
          categories={categories}
          programs={programs}
        />
      </section>
      <div className="absolute -bottom-[40%] -right-[2%] rotate-180 md:h-[231px] md:w-[320px] lg:bottom-0 lg:right-0 lg:h-[340px] lg:w-[470px]">
        <Image src="/icons/lines-purple.svg" alt="purple lines" fill />
      </div>
    </article>
  );
}
