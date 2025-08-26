import "dotenv/config";
import { EnsembleRetriever } from "langchain/retrievers/ensemble";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

const docs = [
  new Document({ pageContent: "A maçã é uma fruta doce." }),
  new Document({ pageContent: "A banana é amarela." }),
  new Document({ pageContent: "O limão é azedo." }),
];

const vectorStore = await MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }));

// Dois retrievers vetoriais diferentes
const retriever1 = vectorStore.asRetriever({ k: 1 });
const retriever2 = vectorStore.asRetriever({ k: 2 });

// Ensemble combina ambos
const ensemble = new EnsembleRetriever({
  retrievers: [retriever1, retriever2],
  weights: [0.5, 0.5],
});

const results = await ensemble.invoke("fruta ácida");
console.log("🔎 Resultados Ensemble:", results.map(r => r.pageContent));
