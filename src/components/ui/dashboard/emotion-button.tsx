"use client";
import React, { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { createMoodEntry } from "@/lib/mood/actions";
import { motion } from "framer-motion";
import clsx from "clsx";

type PropsType = {
  variant: "laugh" | "smile" | "meh" | "frown" | "angry";
  userId: string;
  submitted: boolean;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

const colors = {
  laugh: "#0e8c30",
  smile: "#23b861",
  meh: "#b89023",
  frown: "#b85223",
  angry: "#b83223",
};

export default function EmotionButton({
  variant,
  userId,
  submitted,
  setSubmitted,
}: PropsType) {
  let text = "";
  let Icon = Icons[variant];
  let color = colors[variant];

  switch (variant) {
    case "angry":
      text = "Angry";
      break;
    case "frown":
      text = "Sad";
      break;
    case "meh":
      text = "Meh";
      break;
    case "smile":
      text = "Happy";
      break;
    case "laugh":
      text = "Ecstatic";
      break;
  }

  const [clicked, setClicked] = useState(false);

  const variants = {
    start: {
      rotate: [0, 0, 0],
    },
    rotated: {
      rotate: [0, 180],
      transition: { type: "spring", delay: 0.1 },
    },
    exit: {
      rotate: [0, 0, 0],
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <>
      {!submitted || (submitted && clicked) ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setClicked(true);
            setSubmitted(true);
            createMoodEntry(variant, userId);
          }}
          className={clsx("hover:bg-secondary py-1 px-1 rounded-lg", {
            "bg-muted": clicked,
            "cursor-pointer": !clicked,
            "col-start-3": submitted && clicked,
          })}
        >
          <button
            className="mx-auto flex flex-col gap-1 items-center"
            disabled={clicked}
            type="submit"
          >
            <motion.div
              variants={variants}
              animate={clicked ? "rotated" : "start"}
              // transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              <Icon style={{ color }} />
            </motion.div>
            <p className="text-muted-foreground text-sm">{text}</p>
          </button>
        </form>
      ) : (
        ""
      )}
    </>
  );
}
