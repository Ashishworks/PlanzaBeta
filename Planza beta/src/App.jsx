import React, { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import FlowchartPreview from "./components/FlowchartPreview";
import ThemeToggle from "./components/ThemeToggle";
import { BackgroundBeams } from "./components/ui/background-beams";
// import BackgroundGradientDemo from "./components/background-gradient-demo";

function App() {
  const [mermaidCode, setMermaidCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (description) => {
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setMermaidCode(data.mermaidCode);
    } catch (err) {
      setError("Failed to generate flowchart. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black dark:via-gray-900 dark:to-black relative overflow-hidden group">
      {/* Background Beams */}
      <BackgroundBeams className="dark:opacity-100 opacity-30" />
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 navbar-blue-light dark:bg-black/40 backdrop-blur-xl border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30 glass-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">🧠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Planza Beta
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-300">AI-Powered Project Planning</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Transform Your Ideas
              </h2>
              <p className="text-gray-600 dark:text-gray-200">
                Describe your project and watch AI create beautiful flowcharts instantly
              </p>
            </div>
            
            {/* Background Gradient Demo */}
            {/* <div className="mb-6">
              <BackgroundGradientDemo />
            </div> */}
            
            <ProjectForm onSubmit={handleSubmit} isLoading={isLoading} />
            
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-24 animate-slide-in-right">
            {mermaidCode ? (
              <FlowchartPreview mermaidCode={mermaidCode} />
            ) : (
              <div className="h-full flex items-center justify-center">
                              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-blue-100 to-purple-100 dark:from-black/20 dark:to-gray-900/20 rounded-full flex items-center justify-center animate-pulse-slow">
                  <svg className="w-12 h-12 text-gray-400 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Ready to Generate</h3>
                    <p className="text-gray-500 dark:text-gray-300">Fill out the form to see your flowchart here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
