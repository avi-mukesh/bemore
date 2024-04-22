import Replicate from "replicate";
import { ReplicateStream, StreamingTextResponse } from "ai";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
export const runtime = "edge";

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
}: {model: string, prompt: string, systemPrompt: string, maxTokens: number, temperature: number, topP: number}) {
  console.log("running llama");
  console.log("model", model);
  console.log("maxTokens", maxTokens);

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