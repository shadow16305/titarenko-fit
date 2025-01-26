import { Button } from "@/components/ui/button";
import { ChartNoAxesColumnIncreasing, Clock4, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import Stripe from "stripe";

interface PurchaseCardProps {
  description: string;
  duration: string;
  intensity: string;
  fitness_level: string;
  price: Stripe.Price[];
  recurring: string | null;
}

export const PurchaseCard = ({
  description,
  duration,
  intensity,
  fitness_level,
  price,
  recurring,
}: PurchaseCardProps) => {
  const t = useTranslations("SingleProgramPage");

  const formattedPrice = `$${(price[0].unit_amount! / 100).toFixed(2)}${recurring ? `/${t(recurring)}` : ""}`;

  return (
    <div className="space-y-10 rounded-3xl bg-off-white px-6 py-5 shadow-md">
      <h2>{t("details")}</h2>
      <p className="text-xl text-grey-custom">{description}</p>
      <ul className="space-y-4 text-lg font-medium">
        <li className="flex items-center gap-x-3.5">
          <Clock4 className="text-indigo-custom" />
          <span className="text-grey-custom">{t("duration")}:</span>
          <span>{duration}</span>
        </li>
        <li className="flex items-center gap-x-3.5">
          <Flame className="text-indigo-custom" />
          <span className="text-grey-custom">{t("intensity")}:</span>
          <span>{intensity}</span>
        </li>
        <li className="flex items-center gap-x-3.5">
          <ChartNoAxesColumnIncreasing className="text-indigo-custom" />
          <span className="text-grey-custom">{t("fitness level")}:</span>
          <span>{fitness_level}</span>
        </li>
      </ul>
      <h2 className="font-semibold">{formattedPrice}</h2>
      <Button type="button" className="z-10 w-full" size="lg">
        {t("buy course")}
      </Button>
    </div>
  );
};
