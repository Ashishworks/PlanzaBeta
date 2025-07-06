import React, { useState } from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import { Button as MovingBorderButton } from "./ui/moving-border";

const ProjectForm = ({ onSubmit, isLoading }) => {
  const [projectName, setProjectName] = useState("");
  const [summary, setSummary] = useState("");
  const [features, setFeatures] = useState("");
  const [userRoles, setUserRoles] = useState("");
  const [workflow, setWorkflow] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const description = `
Project Name: ${projectName}

Summary:
${summary}

Key Features:
${features}

User Roles:
${userRoles}

Workflow:
${workflow}
    `.trim();

    if (!summary.trim()) return;
    onSubmit(description);
    console.log("📋 Project Description:", description);
  };

  return (
    <BackgroundGradient className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden card-hover">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-4 animate-gradient-move">
        <h2 className="text-xl font-bold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Describe Your Project
        </h2>
        <p className="text-blue-100 text-sm mt-1">Let AI create beautiful flowcharts from your ideas</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Project Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Name
          </label>
          <div className="relative">
                          <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-400 input-focus"
                placeholder="e.g. Food Delivery App"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Project Summary */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Project Summary <span className="text-red-500">*</span>
          </label>
          <div className="relative">
                          <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-400 input-focus"
                placeholder="What does your project do? Describe the main purpose and functionality..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              />
            <div className="absolute top-3 right-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Key Features
          </label>
          <div className="relative">
                          <textarea
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-400 input-focus"
                placeholder="List the main features of your project, one per line..."
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
              />
            <div className="absolute top-3 right-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
          </div>
        </div>

        {/* User Roles */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            User Roles
          </label>
          <div className="relative">
                          <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-400 input-focus"
                placeholder="e.g. User, Admin, Delivery Partner"
                value={userRoles}
                onChange={(e) => setUserRoles(e.target.value)}
              />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Workflow
          </label>
          <div className="relative">
                          <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-400 input-focus"
                placeholder="Describe how the app works step by step..."
                value={workflow}
                onChange={(e) => setWorkflow(e.target.value)}
              />
            <div className="absolute top-3 right-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <MovingBorderButton
            type="submit"
            disabled={isLoading || !summary.trim()}
            className={`w-full py-4 px-6 font-semibold text-white whitespace-nowrap transition-all duration-200 transform btn-hover ${
              isLoading || !summary.trim()
                ? "opacity-60 cursor-not-allowed"
                : "hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Flowchart...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Flowchart
              </div>
            )}
          </MovingBorderButton>
        </div>
              </form>
      </BackgroundGradient>
    );
};

export default ProjectForm;
