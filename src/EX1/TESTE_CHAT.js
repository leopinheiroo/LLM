import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import dotenv from 'dotenv';
dotenv.config();

async function translateToItalian() {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.log("OPENAI_API_KEY não configurada");
      console.log("Simulando tradução:");
      console.log(" Entrada: 'hi!'");
      console.log(" Saída: 'ciao!'");
      return "ciao!";
    }

    const model = new ChatOpenAI({ model: "gpt-4o-mini" });
    const messages = [
      new SystemMessage("Translate the following from English into Italian"),
      new HumanMessage("hi!"),
    ];
    
    console.log("🔄 Enviando mensagem para tradução...");
    const response = await model.invoke(messages);
    console.log("✅ Tradução:", response.content);
    return response.content;
  } catch (error) {
    console.error("Erro na tradução:", error.message);
    throw error;
  }
}

translateToItalian();

export { translateToItalian };