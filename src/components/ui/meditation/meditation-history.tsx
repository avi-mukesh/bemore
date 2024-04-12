import { fetchMeditationsForUser } from "@/lib/meditation/data";
import MeditationGraph from "./meditation-graph";
import { Heading } from "../heading";

type PropsType = {
  userId: string;
};

export default async function MeditationHistory({ userId }: PropsType) {
  const meditations = await fetchMeditationsForUser(userId);

  const totalTime = meditations?.map((m) => m.duration).reduce((a, b) => a + b);

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <p className="text-md">
          Well done! Today you have meditated for{" "}
          {meditations && (
            <span className="font-bold">{meditations[0].duration}</span>
          )}{" "}
          minutes.
        </p>
        <p className="text-primary">
          Altogether you have medidated for{" "}
          <span className="font-bold">{totalTime}</span> minutes!
        </p>
        {meditations && <MeditationGraph meditations={meditations} />}
      </div>
    </div>
  );
}
