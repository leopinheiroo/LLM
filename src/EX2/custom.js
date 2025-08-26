import { BaseRetriever } from "@langchain/core/retrievers";
import { Document } from "@langchain/core/documents";

class CustomRetriever extends BaseRetriever {
  async _getRelevantDocuments(query) {
    // Aqui poderia estar um fetch para uma API ou BD
    return [
      new Document({
        pageContent: `📌 Resultado customizado para: "${query}"`,
        metadata: { fonte: "CustomRetriever" }
      })
    ];
  }
}

async function main() {
  try {
    const retriever = new CustomRetriever({});
    const results = await retriever.invoke("Qualquer pergunta");
    console.log("Resultados:", results.map(r => r.pageContent));
  } catch (error) {
    console.error("Erro:", error.message);
  }
}

main();
