"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useProgress } from "@/context/progress-context";
import { Order } from "@/payload-types";

export const Progress = ({ orders }: { orders: Order[] }) => {
  const { progress } = useProgress();
  const products = orders.flatMap((order) => order.items || []);

  return (
    <ScrollArea className="h-[220px] pr-4" type="auto">
      <div className="flex flex-col gap-2">
        {products.map(
          (item) =>
            typeof item.product !== "number" && (
              <div
                key={item.product.id}
                className="flex w-full flex-col gap-2 rounded-2xl bg-off-white p-2 lg:rounded-xl"
              >
                <p className="min-w-[105px] whitespace-nowrap text-sm font-semibold">
                  {item.product.title}
                </p>
                <div className="flex w-full justify-between gap-x-2">
                  <div className="h-4 w-full rounded-full border border-turquoise-dark bg-white">
                    <div
                      className="h-full rounded-full bg-turquoise-dark"
                      style={{
                        width: `${progress[item.product.id]?.percentage || 0}%`,
                      }}
                    />
                  </div>
                  <p className="text-sm">
                    {Math.floor(progress[item.product.id]?.percentage || 0)}%
                  </p>
                </div>
              </div>
            ),
        )}
      </div>
    </ScrollArea>
  );
};
