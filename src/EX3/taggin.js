import "dotenv/config";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { ChatOpenAI } from "@langchain/openai";

async function main() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY não definido");
      return;
    }

    const docs = [
      new Document({ pageContent: "O cachorro é um animal doméstico." }),
      new Document({ pageContent: "O gato gosta de dormir bastante." }),
      new Document({ pageContent: "Peixes vivem na água." }),
    ];

    console.log("Criando vector store...");
    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY })
    );

    console.log("Configurando retriever...");
    const retriever = vectorStore.asRetriever({ k: 1 });

    console.log("Fazendo consulta...");
    const results = await retriever.invoke("Quem gosta de dormir?");
    console.log("Resultados brutos:", results.map(r => r.pageContent));

    console.log("\nAplicando Tagging...");
    const llm = new ChatOpenAI({
      model: "gpt-4o-mini", 
      temperature: 0,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const schema = {
      topic: "covered_topic",
      description: "Main topic covered in the text",
    };

    const modelWithStructure = llm.withStructuredOutput(schema);
    for (const doc of results) {
      const tag = await modelWithStructure.invoke(doc.pageContent);
      console.log(`Texto: "${doc.pageContent}"`);
      console.log("Tag:", tag);
      console.log("------");
    }
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

main();
