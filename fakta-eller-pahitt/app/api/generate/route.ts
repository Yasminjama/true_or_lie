import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  const { topic } = await request.json();

  const shouldBeTrue = Math.random() > 0.5;

  const prompt = `Ge mig ett ${shouldBeTrue ? "SANT" : "FALSKT och påhittat"} påstående om ${topic}. Svara BARA med JSON i exakt detta format, inget annat: { "statement": "...", "isTrue": ${shouldBeTrue} }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text?.trim() || "";

    // Ta bort eventuella markdown-backticks
    const jsonString = text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    const data = JSON.parse(jsonString);

    return NextResponse.json({
      statement: data.statement,
      isTrue: data.isTrue,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Kunde inte generera påstående" },
      { status: 500 }
    );
  }
}