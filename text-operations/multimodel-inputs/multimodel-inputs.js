import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const image = await genAI.files.upload({
    path: "../../images/orange.jpg",
  });

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      createUserContent([
        "Tell me about this image",
        createPartFromUri(image.uri, "image/jpeg"),
      ]),
    ],
  });

  console.log(response.text);
}

main();
