"use client";

import { motion } from "framer-motion";
import { Brand } from "./Brand";

export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-transparent"
    >
      <div className="mx-auto flex max-w-[832px] items-center pt-[16px] pl-[16px] pr-[16px]">
        <Brand />
      </div>
    </motion.header>
  );
}
