import React, { useState } from "react";
import ProjectForm from "./components/ProjectForm";
import FlowchartPreview from "./components/FlowchartPreview";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [mermaidCode, setMermaidCode] = useState("");

  const handleSubmit = async (description) => {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL, { //"http://localhost:5000/api/generate-mermaid"
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
    const data = await res.json();
    setMermaidCode(data.mermaidCode);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">🧠 Planza Beta</h1>
        <ThemeToggle />
      </div>

      <ProjectForm onSubmit={handleSubmit} />
      {mermaidCode && <FlowchartPreview mermaidCode={mermaidCode} />}
    </div>
  );
}

export default App;
