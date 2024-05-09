import Replicate from "replicate";
import { ReplicateStream, StreamingTextResponse } from "ai";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
// export const runtime = "edge";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error(
    "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it."
  );
}

export async function POST(req: NextRequest) {
  const params = await req.json();

  const referer = req.headers.get("referer");
  console.log("request referer", referer);

  const origin = req.headers.get("origin");
  console.log("request origin", origin);

  const nextUrl = req.nextUrl;
  const pathname = nextUrl.pathname;
  console.log("request nextUrl pathname", pathname);

  if (pathname.startsWith("/api")) {
    if (
      !req.headers
        .get("referer")
        ?.includes(process.env.APP_URL ?? "http://localhost:3000")
    ) {
      console.error("unauthorized");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  let response = await runLlama(params);

  // Convert the response into a friendly text-stream
  const stream = await ReplicateStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

async function runLlama({
  model,
  prompt,
  systemPrompt,
  maxTokens,
  temperature,
  topP,
}: {
  model: string;
  prompt: string;
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  topP: number;
}) {
  console.log("running llama");

  return await replicate.predictions.create({
    model: model,
    stream: true,
    input: {
      prompt: `${prompt}`,
      max_new_tokens: maxTokens,
      ...(model.includes("llama3")
        ? { max_tokens: maxTokens }
        : { max_new_tokens: maxTokens }),
      temperature: temperature,
      repetition_penalty: 1,
      top_p: topP,
    },
  });
}
