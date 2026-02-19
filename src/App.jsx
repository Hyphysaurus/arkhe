import { useState } from "react";

export default function App() {

  const [projects, setProjects] = useState([
    {
      name: "Arkhe 1",
      status: "Planning",
      budget: 0,
      tasks: []
    }
  ]);

  function addProject() {

    const name = prompt("Project name");

    if (!name) return;

    setProjects([
      ...projects,
      {
        name,
        status: "Planning",
        budget: 0,
        tasks: []
      }
    ]);
  }

  return (

    <div style={{
      background: "#0f172a",
      minHeight: "100vh",
      color: "white",
      padding: 40
    }}>

      <h1>Arkhe</h1>

      <p>SaaS Launch Control Center</p>

      <button onClick={addProject}>
        New Project
      </button>

      {projects.map((project, index) => (

        <div key={index} style={{
          marginTop: 20,
          padding: 20,
          border: "1px solid #334155"
        }}>

          <h2>{project.name}</h2>

          <p>Status: {project.status}</p>

          <p>Budget: ${project.budget}</p>

        </div>

      ))}

    </div>

  );

}
