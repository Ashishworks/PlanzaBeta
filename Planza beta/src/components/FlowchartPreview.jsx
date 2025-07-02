import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

mermaid.initialize({ startOnLoad: false });

const FlowchartPreview = ({ mermaidCode }) => {
  const chartRef = useRef(null);
  const [exportType, setExportType] = useState("pdf");

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

  const handleExport = async () => {
    const chart = chartRef.current;
    if (!chart) return;

    const canvas = await html2canvas(chart);
    const imgData = canvas.toDataURL("image/png");

    if (exportType === "pdf") {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("flowchart.pdf");
    } else {
      const link = document.createElement("a");
      link.download = "flowchart.png";
      link.href = imgData;
      link.click();
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-semibold mb-2">📈 Flowchart Preview</h3>

      <div
        ref={chartRef}
        className="bg-white p-4 rounded shadow overflow-auto border"
      />

      <div className="flex items-center gap-3">
        <select
          value={exportType}
          onChange={(e) => setExportType(e.target.value)}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="pdf">📄 Export as PDF</option>
          <option value="png">🖼️ Export as PNG</option>
        </select>

        <button
          onClick={handleExport}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
        >
          ⬇️ Download
        </button>
      </div>
    </div>
  );
};

export default FlowchartPreview;
