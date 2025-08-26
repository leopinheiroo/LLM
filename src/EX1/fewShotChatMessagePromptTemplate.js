import { ChatPromptTemplate, FewShotChatMessagePromptTemplate } from "@langchain/core/prompts";

async function runFewShotExample() {
  try {
    console.log("Iniciando exemplo Few-Shot...\n");

    const examples = [
      { input: "2+2", output: "4" },
      { input: "2+3", output: "5" },
    ];

    console.log("Exemplos de treinamento:");
    examples.forEach((ex, index) => {
      console.log(`   ${index + 1}. ${ex.input} = ${ex.output}`);
    });

    const examplePrompt = ChatPromptTemplate.fromMessages([
      ["human", "{input}"],
      ["ai", "{output}"],
    ]);

    const fewShotPrompt = new FewShotChatMessagePromptTemplate({
      examplePrompt,
      examples,
      inputVariables: [],
    });

    console.log("\nGerando prompt few-shot...");
    const result = await fewShotPrompt.invoke({});
    
    console.log("\nPrompt gerado:");
    const messages = result.toChatMessages();
    messages.forEach((message, index) => {
      console.log(`   ${index + 1}. ${message.constructor.name}: ${message.content}`);
    });

    return messages;
  } catch (error) {
    console.error("Erro:", error.message);
    throw error;
  }
}
runFewShotExample();