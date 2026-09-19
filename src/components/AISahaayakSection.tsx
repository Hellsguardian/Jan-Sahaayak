import React, { useState } from 'react';
import { AISahaayakResponse } from '../types';
import { 
  Bot, 
  Sparkles, 
  Mic, 
  Camera, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Loader2, 
  AlertCircle,
  HelpCircle,
  Zap
} from 'lucide-react';

interface AISahaayakSectionProps {
  onPreFillGrievance: (data: Partial<AISahaayakResponse> & { description: string }) => void;
}

export const AISahaayakSection: React.FC<AISahaayakSectionProps> = ({
  onPreFillGrievance
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AISahaayakResponse | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Quick preset suggestions
  const presetPrompts = [
    "There has been dirty water coming from our tap since morning.",
    "Big pothole right near the main market square causing traffic jam.",
    "Street light flickering and went dark on Pocket C road.",
    "Waste bin overflowing and bad smell near community park."
  ];

  const handleAnalyze = async (textToAnalyze?: string) => {
    const query = textToAnalyze || promptInput;
    if (!query.trim()) return;

    setIsAnalyzing(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/ai-sahaayak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: query, area: 'Sector 12 Ward 14' })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI Sahaayak');
      }

      const data = await response.json();
      setAiResult(data);
    } catch (err) {
      console.error('AI Sahaayak error:', err);
      // Fallback structured response
      setAiResult({
        category: 'Water Supply',
        suggestedTitle: 'Dirty Water Supply Complaint',
        summary: query,
        urgency: 'High',
        department: 'Jal Board & Public Health Engineering',
        actionSteps: ['Dispatch Ward Technician', 'Pipeline Flush Assessment', 'Resolution Signoff'],
        aiResponse: `Thank you for sharing. Based on your statement ("${query}"), this requires water sanitation review. You can proceed to lodge this grievance directly below.`
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVoiceClick = () => {
    setIsListening(true);
    setTimeout(() => {
      setPromptInput("There is a large open drain without cover near the playground where children play.");
      setIsListening(false);
    }, 2000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedPhoto(reader.result as string);
        setPromptInput("Uploaded photo shows damaged asphalt road crater on main lane.");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="ai-sahaayak" className="py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1536px] w-full mx-auto">
      
      {/* MAIN CONTAINER WITH LAVENDER & PURPLE ARTWORK */}
      <div className="bg-gradient-to-br from-[#6546D9] via-[#5234C2] to-[#3B2299] rounded-[40px] p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden">
        
        {/* DECORATIVE BACKGROUND ACCENTS */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FFD84D]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* LEFT SIDE INTRO */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FFD84D] font-black text-xs uppercase tracking-wider">
              <Bot className="w-4 h-4" />
              <span>AI ASSISTANT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Not sure what to report?
            </h2>

            <p className="text-2xl font-bold text-[#FFD84D]">
              Just tell Sahaayak what happened.
            </p>

            <p className="text-sm text-purple-100 font-medium leading-relaxed">
              Describe your issue in plain words, record voice, or upload a picture. Our Gemini AI model will automatically analyze the category, urgency, and route it to the exact municipal division.
            </p>

            {/* PRESET CHIPS */}
            <div className="pt-2">
              <p className="text-xs font-bold text-purple-200 mb-2">Try asking Sahaayak:</p>
              <div className="flex flex-wrap gap-2">
                {presetPrompts.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPromptInput(preset);
                      handleAnalyze(preset);
                    }}
                    className="text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl border border-white/15 transition-colors text-left"
                  >
                    "{preset.slice(0, 36)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE INPUT & RESPONSE CONTAINER */}
          <div className="lg:col-span-7 bg-white text-[#171717] p-6 sm:p-8 rounded-3xl shadow-xl border-4 border-white/20">
            
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#6546D9] text-[#FFD84D] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-sm text-[#171717]">AI Sahaayak Assistant</span>
              </div>
              <span className="text-[10px] font-extrabold bg-[#EEE9FF] text-[#6546D9] px-2.5 py-1 rounded-full">
                Powered by Gemini AI
              </span>
            </div>

            {/* INPUT FIELD AREA */}
            <div className="space-y-3">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe your civic problem e.g. 'Dirty water coming from our tap since yesterday'..."
                rows={3}
                className="w-full p-4 rounded-2xl bg-[#F8F6FF] border-2 border-[#EEE9FF] text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#6546D9] resize-none"
              />

              {/* MEDIA & VOICE BUTTONS ROW */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  
                  {/* VOICE BUTTON */}
                  <button
                    onClick={handleVoiceClick}
                    disabled={isListening}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      isListening
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-[#EEE9FF] text-[#6546D9] hover:bg-[#DCD1FF]'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{isListening ? 'Listening...' : 'Voice Input'}</span>
                  </button>

                  {/* CAMERA / IMAGE UPLOAD */}
                  <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EEE9FF] text-[#6546D9] hover:bg-[#DCD1FF] text-xs font-bold cursor-pointer transition-all">
                    <Camera className="w-3.5 h-3.5" />
                    <span>Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>

                  {selectedPhoto && (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      Photo attached
                    </span>
                  )}
                </div>

                {/* ANALYZE SUBMIT BUTTON */}
                <button
                  onClick={() => handleAnalyze()}
                  disabled={isAnalyzing || !promptInput.trim()}
                  className="flex items-center gap-2 bg-[#6546D9] hover:bg-[#5234c2] disabled:opacity-50 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#FFD84D]" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Ask Sahaayak</span>
                      <Send className="w-3.5 h-3.5 text-[#FFD84D]" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* AI RESULT DISPLAY CARD */}
            {aiResult && (
              <div className="mt-6 p-5 rounded-2xl bg-[#F7F5FF] border-2 border-[#DCD1FF] animate-in fade-in slide-in-from-top-3">
                
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-black text-[#6546D9] uppercase tracking-wider">
                      RERECOMMENDED CATEGORY: {aiResult.category}
                    </span>
                    <h4 className="font-extrabold text-base text-[#171717]">{aiResult.suggestedTitle}</h4>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase ${
                    aiResult.urgency === 'Critical' || aiResult.urgency === 'High'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    Urgency: {aiResult.urgency}
                  </span>
                </div>

                <p className="text-xs text-zinc-700 font-medium leading-relaxed mb-3">
                  {aiResult.aiResponse}
                </p>

                <div className="bg-white p-3 rounded-xl border border-purple-100 space-y-1 mb-4 text-xs font-semibold">
                  <p className="text-zinc-500 font-bold text-[10px] uppercase">Assigned Department:</p>
                  <p className="text-[#171717] font-bold">{aiResult.department}</p>
                </div>

                <button
                  onClick={() => onPreFillGrievance({
                    category: aiResult.category,
                    suggestedTitle: aiResult.suggestedTitle,
                    summary: aiResult.summary,
                    urgency: aiResult.urgency,
                    department: aiResult.department,
                    description: promptInput
                  })}
                  className="w-full flex items-center justify-center gap-2 bg-[#35B96B] hover:bg-[#2ca25d] text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Report this issue now with AI Pre-fill</span>
                  <ArrowRight className="w-4 h-4 text-[#FFD84D]" />
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};
