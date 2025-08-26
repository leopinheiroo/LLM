import { PromptTemplate } from "@langchain/core/prompts";

const promptTemplate = PromptTemplate.fromTemplate(
  "Conte uma historia sobre {tema}."
);
const resposta = await promptTemplate.invoke({ tema: "descobrimento do Brasil" });
console.log(resposta.value);