import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface FoodScanResult {
  name: string;
  calories: number;
  protein: number;
  carb: number;
  fat: number;
}

@Injectable({ providedIn: 'root' })
export class FoodScannerService {

  async scanImage(base64Image: string, mimeType: string): Promise<FoodScanResult> {
    const apiKey = environment.geminiApiKey;
    if (!apiKey) {
      throw new Error('Gemini API key is not configured. Please set it in environment.ts');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          parts: [
            {
              text: `Analyze this food image. Return ONLY a JSON object with these exact fields (no markdown, no explanation):
{
  "name": "food name in Thai or English",
  "calories": number (kcal per serving),
  "protein": number (grams),
  "carb": number (grams),
  "fat": number (grams)
}

If you cannot identify the food, return:
{"name": "", "calories": 0, "protein": 0, "carb": 0, "fat": 0}

Estimate based on a standard single serving size. Be reasonable with estimates.`
            },
            {
              inlineData: {
                mimeType,
                data: base64Image,
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 256,
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini API error: ${response.status} — ${err}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    // Extract JSON from response (handle markdown code blocks)
    const jsonMatch = text.match(/\{[\s\S]*?\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse food data from AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return {
      name: String(parsed.name || ''),
      calories: Math.round(Number(parsed.calories) || 0),
      protein: Math.round(Number(parsed.protein) || 0),
      carb: Math.round(Number(parsed.carb) || 0),
      fat: Math.round(Number(parsed.fat) || 0),
    };
  }
}
