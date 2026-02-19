import { useState } from "react";

export default function App() {
  const [projects, setProjects] = useState([]);

  function addProject() {
    const name = prompt("Project name?");
    if (!name) return;

    setProjects([
      ...projects,
      {
        name,
        status: "Planning",
        budget: 0,
      },
    ]);
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Arkhe</h1>
      <p>SaaS Launch Control Center</p>

      <button onClick={addProject}>
        New Project
      </button>

      <ul>
        {projects.map((p, i) => (
          <li key={i}>
            {p.name} — {p.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
