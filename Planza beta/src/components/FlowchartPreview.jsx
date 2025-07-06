import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { BackgroundGradient } from "./ui/background-gradient";
import { Button as MovingBorderButton } from "./ui/moving-border";

mermaid.initialize({ startOnLoad: false });

const FlowchartPreview = ({ mermaidCode }) => {
  const chartRef = useRef(null);
  const [exportType, setExportType] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);
  const [isRendering, setIsRendering] = useState(true);
  const chartIdRef = useRef(`chart-${Date.now()}`);

  useEffect(() => {
    if (!mermaidCode || !chartRef.current) return;

    let isCancelled = false;
    setIsRendering(true);

    const renderMermaid = async () => {
      try {
        chartRef.current.innerHTML = ""; // Clear previous chart
        await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for DOM

        if (isCancelled) return;

        const { svg } = await mermaid.render(chartIdRef.current, mermaidCode);
        if (!isCancelled && chartRef.current) {
          chartRef.current.innerHTML = svg;
          setIsRendering(false);
        }
      } catch (err) {
        console.error("⚠️ Mermaid render error:", err.message);
        if (chartRef.current) {
          chartRef.current.innerHTML = `
            <div class="flex items-center justify-center p-8 text-red-500">
              <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span class="text-lg font-medium">Invalid Mermaid syntax</span>
            </div>
          `;
          setIsRendering(false);
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

    setIsExporting(true);
    
    try {
      const scaleFactor = 3; // Higher value = clearer image
      const canvas = await html2canvas(chart, {
        scale: scaleFactor,
        useCORS: true,
        backgroundColor: document.documentElement.classList.contains('dark') ? '#111827' : '#ffffff',
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
    } catch (error) {
      console.error("Export error:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <BackgroundGradient className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden card-hover">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 px-6 py-4 animate-gradient-move">
        <h3 className="text-xl font-bold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Flowchart Preview
        </h3>
        <p className="text-green-100 text-sm mt-1">Your AI-generated project flowchart</p>
      </div>

      {/* Chart Container */}
      <div className="p-6">
        <div className="relative">
          {isRendering && (
            <div className="absolute inset-0 bg-white dark:bg-black rounded-xl flex items-center justify-center z-10">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600 dark:text-gray-300">Rendering flowchart...</p>
              </div>
            </div>
          )}
          
          <div
            ref={chartRef}
            className="bg-white dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 overflow-auto min-h-[400px] flex items-center justify-center"
          />
        </div>

        {/* Export Controls */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Export Format
              </label>
                              <select
                  value={exportType}
                  onChange={(e) => setExportType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 input-focus"
                >
                <option value="pdf">📄 PDF Document</option>
                <option value="png">🖼️ PNG Image</option>
              </select>
            </div>
            
            <div className="flex-1 flex items-end mt-6 ml-4">
              <MovingBorderButton
                onClick={handleExport}
                disabled={isExporting || isRendering}
                className={`w-full py-4 px-6 font-semibold text-white whitespace-nowrap transition-all duration-200 transform btn-hover ${
                  isExporting || isRendering
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {isExporting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download {exportType.toUpperCase()}
                  </div>
                )}
              </MovingBorderButton>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Your flowchart is ready! Download it as a {exportType.toUpperCase()} file to share with your team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BackgroundGradient>
  );
};

export default FlowchartPreview;
