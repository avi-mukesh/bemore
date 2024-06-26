export const Llama3Template = (defaultSystemPrompt = "") => {
    return function (chat:any) {
      let systemPrompt = defaultSystemPrompt;
  
      let parts = [];
      for (let turn of chat) {
        if (turn.role === "system") {
          systemPrompt = turn.content;
          continue;
        }
  
        if (turn.role === "user") {
          if (systemPrompt !== "") {
            parts.push(
              "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n" +
                systemPrompt +
                "<|eot_id|>" +
                "\n<|start_header_id|>user<|end_header_id|>\n\n" +
                turn.content +
                "<|eot_id|>"
            );
            systemPrompt = "";
          } else {
            parts.push(
              "<|start_header_id|>user<|end_header_id|> " +
                turn.content +
                "<|eot_id|>"
            );
          }
        }
  
        if (turn.role === "assistant") {
          parts.push(
            "<|start_header_id|>assistant<|end_header_id|>" +
              turn.content +
              "<|eot_id|>"
          );
        }
      }
  
      return parts.join("");
    };
  };