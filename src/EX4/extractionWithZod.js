import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { createExtractionChainFromZod } from "langchain/chains";

const personSchema = z.object({
  name: z.nullish(z.string()).describe("O nome da pessoa"),
  hair_color: z.nullish(z.string()).describe("A cor do cabelo da pessoa, se conhecida"),
  height_in_meters: z.nullish(z.string()).describe("Altura medida em metros"),
});

const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

const extractionChain = createExtractionChainFromZod(personSchema, llm);

const text = "João tem cabelo castanho e mede 1.75 metros.";

const result = await extractionChain.run(text);

console.log(result);