import { fetchMeditationsForUser } from "@/lib/meditation/data";
import React from "react";

type PropsType = {
  userId: string;
};

export default async function MeditationGraph({ userId }: PropsType) {
  const meditations = await fetchMeditationsForUser(userId);

  return <p>Meditation Graph</p>;
}
