// App.jsx
import React, { useState } from "react";
import axios from "axios";
import ProjectForm from "./components/ProjectForm";
import FlowchartPreview from "./components/FlowchartPreview";

const App = () => {
  const [mermaidCode, setMermaidCode] = useState("");

  const handleSubmit = async (description) => {
    try {
      const res = await axios.post("http://localhost:5000/api/generate-mermaid", {
        description,
      });
      setMermaidCode(res.data.mermaidCode);
    } catch (err) {
      console.error("Error:", err.message);
      alert("Failed to generate Mermaid code");
    }
  };

  return (
    
    <div className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">🚀 Planza – AI Flowchart Builder (Beta)</h1>
      <ProjectForm onSubmit={handleSubmit} />
      {mermaidCode && <FlowchartPreview mermaidCode={mermaidCode} />}
    </div>
  );
};

export default App;
