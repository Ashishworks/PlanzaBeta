import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false });

const FlowchartPreview = ({ mermaidCode }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!mermaidCode || !chartRef.current) return;

    const renderMermaid = async () => {
      try {
        const { svg } = await mermaid.render("chart", mermaidCode);
        chartRef.current.innerHTML = svg;
      } catch (err) {
        console.error("⚠️ Mermaid render error:", err.message);
        chartRef.current.innerHTML = `<p style="color:red">⚠️ Invalid Mermaid syntax</p>`;
      }
    };

    renderMermaid();
  }, [mermaidCode]);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-2">📈 Flowchart Preview</h3>
      <div ref={chartRef} />
    </div>
  );
};

export default FlowchartPreview;
