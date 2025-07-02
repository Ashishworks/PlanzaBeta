import React, { useState } from "react";

const ProjectForm = ({ onSubmit }) => {
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-blue-700">
        📝 Describe Your Project
      </h2>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Project Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g. Food Delivery App"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Project Summary</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="What does your project do?"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Key Features</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="List features, one per line"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">User Roles</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g. User, Admin, Delivery Partner"
          value={userRoles}
          onChange={(e) => setUserRoles(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">Workflow</label>
        <textarea
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Describe how the app works step by step"
          value={workflow}
          onChange={(e) => setWorkflow(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 w-full text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
      >
        🔄 Generate Flowchart
      </button>
    </form>
  );
};

export default ProjectForm;
