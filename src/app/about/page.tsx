import AnimatedText from "@/components/ui/animated-text";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};
export default function page() {
  return (
    <div className="flex flex-col items-center gap-2">
      <AnimatedText />
      <div className="text-sm flex flex-col gap-2 mt-5">
        <p>The importance of self-improvement cannot be overstated.</p>
        <p>
          Creating good habits like meditating, exercising, gratitude
          journaling, reading are all small things which done repeatedly will
          result in big compounding rewards. For your personal life, your
          career, your relationships.
        </p>
        <p>
          The main reason I made this website was I wanted one central hub where
          I can track my own habits and I hope it will help other people as well
          in their journey on self-improvement. But also because I just love
          creating websites.
        </p>
        <p>
          I don&apos;t actually have a goal with what I am saying, just
          waffling.
        </p>
        <p>
          Feel free to contact me by{" "}
          <a
            href="mailto:avimukesh10@gmail.com"
            className="text-blue-500 hover:underline underline-offset-4"
          >
            email
          </a>
          .
        </p>
      </div>
    </div>
  );
}
