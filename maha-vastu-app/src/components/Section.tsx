"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, description, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto max-w-5xl scroll-mt-24 px-6 py-16",
        "bg-white/80 shadow-[0_40px_80px_-60px_rgba(27,15,4,0.8)] rounded-3xl border border-white/40 backdrop-blur",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <header className="space-y-3">
          <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-base text-slate-600">{description}</p>}
        </header>
        <div className="mt-8 space-y-6 text-base leading-relaxed">{children}</div>
      </motion.div>
    </section>
  );
}
