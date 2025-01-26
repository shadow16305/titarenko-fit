import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface ProgramCardProps {
  title: string;
  imgSrc: string;
  question?: string | null;
  description: string;
  path: string;
}

export const ProgramCard = ({
  title,
  imgSrc,
  question,
  description,
  path,
}: ProgramCardProps) => {
  const t = useTranslations("ProgramPage");

  return (
    <div className="flex h-[500px] w-full flex-col gap-y-4 rounded-3xl bg-off-white shadow-md">
      <div className="relative h-[250px] w-full">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="rounded-3xl object-cover"
          quality={100}
        />
      </div>
      <div className="flex h-1/2 flex-col justify-between px-4 pb-4">
        <h3>{title}</h3>
        <div className="space-y-2.5">
          {question && (
            <p className="font-semibold leading-snug text-violet-600">
              {question}
            </p>
          )}
          <p className="leading-snug text-grey-custom">{description}</p>
        </div>
        <Link
          href={path}
          className={cn("z-10", buttonVariants({ variant: "default" }))}
        >
          {t("button")}
        </Link>
      </div>
    </div>
  );
};
