import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const main = async () => {
  // #region agent log
  fetch("http://127.0.0.1:7242/ingest/9460f585-3a7a-4ad8-8497-123bc3f97041", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: "debug-session",
      runId: "initial",
      hypothesisId: "H1",
      location: "text-operations/index.js:main:entry",
      message: "Entering main before generateContent",
      data: {},
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Explain how AI works in 10 words",
    });

    console.log(JSON.stringify(response, null, 2));
  } catch (error) {
    console.error("Error while calling Gemini API:", error?.message || error);
  }
};

main();

/**
 * Response object from Gemini API
{
  "sdkHttpResponse": {
    "headers": {
      "alt-svc": "h3=\":443\"; ma=2592000,h3-29=\":443\"; ma=2592000", // This is the headers of the response
      "content-encoding": "gzip",
      "content-type": "application/json; charset=UTF-8", // This is the content type of the response
      "date": "Tue, 16 Dec 2025 13:23:35 GMT", // This is the date of the response
      "server": "scaffolding on HTTPServer2", // This is the server of the response
      "server-timing": "gfet4t7; dur=2550", // gfet4t7: Server timing name, dur=2550: Server timing duration
      "transfer-encoding": "chunked", // chunked: This is the transfer encoding of the response
      "vary": "Origin, X-Origin, Referer", // Origin: This is the origin of the request, X-Origin: This is the x origin of the request, Referer: This is the referer of the request
      "x-content-type-options": "nosniff", // nosniff: This is the x content type options of the response
      "x-frame-options": "SAMEORIGIN", // SAMEORIGIN: This is the x frame options of the response
      "x-xss-protection": "0" // 0: This is the x xss protection of the response
    }
  },
  "candidates": [
    {
      "content": { // This is the content of the response
        "parts": [
          {
            "text": "It learns patterns from data to make smart decisions."
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP", // This is the reason for the response
      "index": 0
    }
  ],
  "modelVersion": "gemini-2.5-flash",
  "responseId": "V11BacuIFI2UxN8P3amIsAQ",
  "usageMetadata": { // This is the metadata about the request and response
    "promptTokenCount": 10, // This is the number of tokens in the prompt
    "candidatesTokenCount": 10, // This is the number of tokens in the candidates
    "totalTokenCount": 225, // This is the total number of tokens in the request and response
    "promptTokensDetails": [ // This is the details of the tokens in the prompt
      {
        "modality": "TEXT",
        "tokenCount": 10 // This is the number of tokens in the prompt
      }
    ],
    "thoughtsTokenCount": 205 // This is the number of tokens in the thoughts
  }
}
*/
