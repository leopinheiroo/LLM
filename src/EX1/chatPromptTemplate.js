import { ChatPromptTemplate } from "@langchain/core/prompts";

const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "TESTE DE PROMPT TEMPLATE."],
  ["user", "Conte uma historia sobre {tema}."],
]);

const resposta = await promptTemplate.invoke({ tema: "cachorros" });
console.log(resposta.messages);