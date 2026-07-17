"use client";
import React, { useState } from "react";
import { ReactTransliterate } from "react-transliterate";
import { Copy, Check, Languages, Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingTransliteratePad() {
  const [text, setText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset icon status
    } catch (err) {
      console.error("Failed to copy text into layout clipboard:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 shadow-2xl transition-all duration-300 antialiased">
      {isMinimized ? (
        /* Minimized Fab Toggle Button */
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl flex items-center justify-center p-0 transition-transform active:scale-95"
          title="Open Tamil Transliterate Pad"
        >
          <Languages className="h-6 w-6" />
        </Button>
      ) : (
        /* Full Expanded Dock Layer Container */
        <div className="w-80 bg-background border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
          {/* Header Panel Toolbar */}
          <div className="bg-slate-900 text-white px-4 py-2.5 flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-bold tracking-wide uppercase">
                English ➜ தமிழ்
              </span>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Interactive Input Layer Container */}
          <div className="p-4 space-y-3 bg-card">
            <div className="relative border border-input rounded-md overflow-hidden bg-background">
              <ReactTransliterate
                value={text}
                onChangeText={(txt) => setText(txt)}
                lang="ta"
                placeholder="Type 'vanakkam' to get வணக்கம்..."
                className="w-full min-h-[90px] p-3 text-sm bg-transparent outline-none border-none resize-none focus:ring-0 text-foreground"
                renderComponent={(props) => <textarea {...props} />}
              />
            </div>

            {/* Interface Toolbar Control Footer */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <span className="text-[10px] text-muted-foreground font-medium italic">
                Press Space bar to convert word
              </span>
              <Button
                size="sm"
                onClick={handleCopy}
                disabled={!text}
                variant={isCopied ? "default" : "secondary"}
                className={`text-xs flex items-center gap-1.5 min-w-[85px] transition-all ${
                  isCopied
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : ""
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copy Text
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
