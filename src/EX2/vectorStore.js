import "dotenv/config";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

async function main() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY não definido");
      return;
    }

    const docs = [
      new Document({ pageContent: "O cachorro é um animal doméstico." }),
      new Document({ pageContent: "O gato gosta de dormir bastante." }),
      new Document({ pageContent: "Peixes vivem na água." }),
    ];

    console.log("📝 Criando vector store...");
    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
    );

    console.log("🔍 Configurando retriever...");
    const retriever = vectorStore.asRetriever({
      k: 1, 
    });

    console.log("❓ Fazendo consulta...");
    const results = await retriever.invoke("Quem gosta de dormir?");
    console.log("🔎 Resultados:", results.map(r => r.pageContent));
  } catch (error) {
    console.error("❌ Erro:", error.message);
  }
}

main();
