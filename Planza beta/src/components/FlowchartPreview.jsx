import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

mermaid.initialize({ startOnLoad: false });

const FlowchartPreview = ({ mermaidCode }) => {
  const chartRef = useRef(null);
  const [exportType, setExportType] = useState("pdf");
  const chartIdRef = useRef(`chart-${Date.now()}`);

  useEffect(() => {
    if (!mermaidCode || !chartRef.current) return;

    let isCancelled = false;

    const renderMermaid = async () => {
      try {
        chartRef.current.innerHTML = ""; // Clear previous chart
        await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for DOM

        if (isCancelled) return;

        const { svg } = await mermaid.render(chartIdRef.current, mermaidCode);
        if (!isCancelled && chartRef.current) {
          chartRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("⚠️ Mermaid render error:", err.message);
        if (chartRef.current) {
          chartRef.current.innerHTML = `<p style="color:red">⚠️ Invalid Mermaid syntax</p>`;
        }
      }
    };

    renderMermaid();

    return () => {
      isCancelled = true;
    };
  }, [mermaidCode]);

  const handleExport = async () => {
    const chart = chartRef.current;
    if (!chart) return;

    const scaleFactor = 3; // Higher value = clearer image
    const canvas = await html2canvas(chart, {
      scale: scaleFactor,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const width = canvas.width;
    const height = canvas.height;

    if (exportType === "pdf") {
      const pdf = new jsPDF({
        orientation: width > height ? "landscape" : "portrait",
        unit: "px",
        format: [width, height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
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
        className="bg-white dark:bg-gray-900 p-4 rounded shadow overflow-auto border dark:border-gray-700"
      />

      <div className="flex items-center gap-3">
        <select
          value={exportType}
          onChange={(e) => setExportType(e.target.value)}
          className="border rounded px-3 py-2 text-sm bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
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
