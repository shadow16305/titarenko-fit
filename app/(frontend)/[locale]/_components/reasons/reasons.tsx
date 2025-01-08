"use client";

import { ReasonsCard } from "./reasons-card";

import { motion } from "motion/react";
import { reasonsItems } from "@/lib/constants";
import { createElement } from "react";

export const Reasons = () => {
  return (
    <article className="w-11/12 max-w-[1440px] mx-auto flex flex-col items-center gap-y-10 py-6 md:py-16 px-3 md:px-12 2xl:px-32 mt-24 bg-baby-slate rounded-3xl">
      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="uppercase text-center"
      >
        Мои программы направления Женский Фитнес онлайн я создала для нас,
        прекрасных женщин! ПОЧЕМУ?
      </motion.h3>
      <section className="flex flex-wrap w-full justify-between gap-10">
        {reasonsItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="w-full md:w-[46%] lg:w-[30%]"
          >
            <ReasonsCard
              icon={createElement(
                item.icon,
                { size: 36, color: "white" },
                null
              )}
              text={item.text}
            />
          </motion.div>
        ))}
      </section>
    </article>
  );
};
