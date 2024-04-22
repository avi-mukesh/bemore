"use server"

import Replicate from "replicate"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})


export async function testReplicate(formData: FormData) {
    const prompt = formData.get("prompt");
    console.log("Running the model with input:", prompt)
    const input = {
        prompt,
        prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n"
    };

    const output = await replicate.run("meta/meta-llama-3-70b-instruct", {input}) as Array<string>;
    console.log(output.join(""))

}