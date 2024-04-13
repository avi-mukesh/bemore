"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import next from "next";

const words = [
  "curious",
  "confident",
  "relaxed",
  "social",
  "energetic",
  "active",
];

function Word({ isActive, word }: { isActive: boolean; word: string }) {
  if (isActive) {
    return (
      <motion.span
        className="inline-block font-extrabold capitalize justify-self-end"
        initial={{ x: 70, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -70, opacity: 0 }}
      >
        {word}
      </motion.span>
    );
  }
}

export default function AnimatedText() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextWord = useCallback(
    () => setActiveIndex((i) => (i + 1) % words.length),
    []
  );

  useEffect(() => {
    const timeout = setTimeout(nextWord, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [activeIndex, nextWord]);

  return (
    <div className="mb-14 md:mt-0 text-5xl font-light text-center">
      <p className="justify-self-start">Be More</p>
      <AnimatePresence>
        {words.map((word) => (
          <Word key={word} isActive={words[activeIndex] === word} word={word} />
        ))}
      </AnimatePresence>
    </div>
  );
}
