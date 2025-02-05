import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Order, Product, User } from "@/payload-types";
import { ChartNoAxesColumnIncreasing, Clock4, Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Stripe from "stripe";
import { AddToCart } from "./add-to-cart";

interface PurchaseCardProps {
  user: User | null;
  locale: string;
  product: Product;
  price: Stripe.Price[];
  recurring: string | null;
}

export const PurchaseCard = ({
  user,
  locale,
  product,
  price,
  recurring,
}: PurchaseCardProps) => {
  const t = useTranslations("SingleProgramPage");

  const formattedPrice = `$${(price[0].unit_amount! / 100).toFixed(2)}${recurring ? `/${t(recurring)}` : ""}`;

  const hasPurchasedProduct = user?.orders?.docs?.some((order) => {
    const typedOrder = order as Order;
    return typedOrder.items?.some((item) => {
      if (typeof item.product === "number") {
        return item.product === product.id;
      } else if (item.product && item.product.id) {
        return item.product.id === product.id;
      }
      return false;
    });
  });

  return (
    <div className="space-y-4 rounded-3xl bg-turquoise-light p-3 lg:space-y-10 lg:px-6 lg:py-5">
      <h2>{t("details")}</h2>
      <p className="text-grey-custom lg:text-xl">
        {product.product_description}
      </p>
      <ul className="space-y-4 font-medium lg:text-lg">
        <li className="flex items-center gap-x-1 lg:gap-x-3.5">
          <Clock4 className="text-purple-custom" />
          <span className="text-grey-custom">{t("duration")}:</span>
          <span>{product.duration}</span>
        </li>
        <li className="flex items-center gap-x-1 lg:gap-x-3.5">
          <Flame className="text-purple-custom" />
          <span className="text-grey-custom">{t("intensity")}:</span>
          <span>{product.intensity}</span>
        </li>
        <li className="flex items-center gap-x-1 lg:gap-x-3.5">
          <ChartNoAxesColumnIncreasing className="text-purple-custom" />
          <span className="text-grey-custom">{t("fitness level")}:</span>
          <span>{product.fitness_level}</span>
        </li>
      </ul>
      <div className="space-y-5">
        {user ? (
          <div className="space-y-2">
            <ol className="list-decimal space-y-1 pl-6 text-sm text-grey-custom">
              <li>Доступ 45/60 дней</li>
              <li>По истечении срока Курс самоудаляется</li>
              <li>
                Автор и тренер Курса определяет порядок тренировок по
                разработанной методике.
              </li>
              <li>
                Но вы свободны в своем выборе и можете заниматься в удобном вам
                порядке
              </li>
            </ol>
            {hasPurchasedProduct ? (
              <p className="text-center text-lg font-semibold text-purple-custom">
                {t("alreadyPurchased")}
              </p>
            ) : (
              <AddToCart product={product} locale={locale} price={price} />
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <h2 className="font-semibold">{formattedPrice}</h2>
            <p className="text-sm">{t("login-check")}</p>
            <Link
              href={`/${locale}/auth`}
              className={cn("z-10 w-full", buttonVariants({ size: "lg" }))}
            >
              {t("login")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
