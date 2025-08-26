import "dotenv/config";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

// docs
const docs = [
  new Document({ pageContent: "LangChain é um framework para LLMs." }),
  new Document({ pageContent: "LangSmith é uma ferramenta de observabilidade." }),
  new Document({ pageContent: "OpenAI cria modelos de linguagem como GPT-4." }),
];

const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }));
const retriever = vectorStore.asRetriever();

//  contexto
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "Você é um assistente que responde com base no contexto."],
  ["human", "Contexto: {context}\n\nPergunta: {question}"]
]);

//  chain
const chain = RunnableSequence.from([
  {
    context: async (input) => {
      const docs = await retriever.invoke(input.question);
      return docs.map(d => d.pageContent).join("\n");
    },
    question: (input) => input.question,
  },
  prompt,
  new ChatOpenAI({ modelName: "gpt-4o-mini", temperature: 0 }),
]);

//  pergunta
const result = await chain.invoke({ question: "O que é LangSmith?" });
console.log("🤖 Resposta:", result.content);
