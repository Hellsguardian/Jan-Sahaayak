import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Jan Sahaayak" });
  });

  // AI Sahaayak Assistant Endpoint
  app.post("/api/ai-sahaayak", async (req, res) => {
    try {
      const { prompt, category, area } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          category: category || "Water Supply",
          suggestedTitle: "Reported Civic Problem",
          summary: `Analysis for: "${prompt}"`,
          urgency: "Medium",
          department: "Municipal Public Works Department",
          actionSteps: [
            "Ward Inspector Dispatch",
            "Technical Assessment",
            "Resolution Execution"
          ],
          aiResponse: `Thank you for sharing. I've analyzed your issue: "${prompt}". This sounds like a ${category || "civic concern"} needing attention from your local municipal team. You can click 'Lodge Grievance' below to lodge this instantly.`
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const systemInstruction = `You are "AI Sahaayak", the friendly, helpful civic AI assistant for Jan Sahaayak, an Indian citizen grievance portal.
Your job is to analyze user descriptions of public problems (such as potholes, broken streetlights, waterlogging, garbage overflow, damaged roads, open drains, etc.) and return a helpful structured JSON response.

Return ONLY a JSON object matching this schema:
{
  "category": "One of: Pothole, Broken Street Light, Water Leakage, Water Supply, Garbage, Waterlogging, Road Damage, Open Drain, Fallen Tree, Public Toilet, Traffic Signal, Other",
  "suggestedTitle": "Short catchy grievance title (max 6 words)",
  "summary": "Clear 1-2 sentence breakdown of the reported problem and why it matters",
  "urgency": "Low | Medium | High | Critical",
  "department": "Department name e.g. Municipal Road Works, Water & Sewage Board, Electricity Board, Sanitation Dept",
  "actionSteps": ["Step 1 e.g. Ward Inspector Dispatch", "Step 2 e.g. Technical Site Assessment", "Step 3 e.g. Repair Execution"],
  "aiResponse": "Empathetic, clear, 2-3 sentence response directly speaking to the citizen about what to do and how Jan Sahaayak will handle it."
}`;

      const result = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `Citizen description: "${prompt}". Area context: ${area || "Sector 12 Municipal Ward"}. Please analyze and output structured civic assessment JSON.`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
        }
      });

      const responseText = result.text || "";
      try {
        const parsed = JSON.parse(responseText);
        return res.json(parsed);
      } catch (e) {
        return res.json({
          category: category || "Pothole",
          suggestedTitle: "Civic Issue Report",
          summary: prompt,
          urgency: "Medium",
          department: "Municipal Public Works Department",
          actionSteps: ["Inspection scheduled", "Assigned to Ward Engineer"],
          aiResponse: responseText || "Thank you for reporting this issue. We have categorized your request and prepared it for grievance submission."
        });
      }

    } catch (err: any) {
      console.error("AI Sahaayak Error:", err);
      res.status(500).json({
        error: "Failed to process request with AI Sahaayak",
        details: err?.message || String(err)
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Jan Sahaayak server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
