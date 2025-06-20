import React from "react";

const Test = () => {
  const readTask = () => {
    fetch("https://playground.4geeks.com/todo/users/marcel", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  const createTask = () => {
    fetch("https://playground.4geeks.com/todo/todos/marcel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task), // Convert the task object to a JSON string
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al crear la tarea");
        return response.json();
      })
      .then((data) => console.log("Tarea creada:", data))
      .catch((error) => console.error("Error:", error));
  };
  const task = {
    label: "Lavar la ropa",
    is_done: false,
  };
  const removeTask = () => {
    fetch("https://playground.4geeks.com/todo/todos/23", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al eliminar la tarea");
      })
      .then(() => console.log(`Tarea con ID "el id de la tarea" eliminada correctamente`))
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col bg-success-subtle me-4">
            <h2>Crear usuario method POST</h2>
          </div>
          <div className="col p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
            <code>https://playground.4geeks.com/todo/users/marcel</code>
          </div>
        </div>
        <div className="row my-2">
          <div className="col bg-info-subtle me-4">
            <h2>Mostrar tareas method GET</h2>
          </div>
          <div className="col p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
            <code>https://playground.4geeks.com/todo/users/marcel</code>
          </div>
        </div>
        <div className="row my-2">
          <div className="col bg-success-subtle me-4">
            <h2>Crear tarea method POST</h2>
          </div>
          <div className="col p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
            <code>https://playground.4geeks.com/todo/todos/marcel</code>
          </div>
        </div>
        <div className="row my-2">
          <div className="col">
            <p>Body:</p>
            <code>
              <pre>
                {`{
  "label": "Ir a la playa",
  "is_done": false
}`}
              </pre>
            </code>
          </div>
        </div>
        <div className="row my-2">
          <div className="col bg-danger-subtle me-4">
            <h2>Eliminar tarea method DELETE</h2>
          </div>
          <div className="col p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
            <code>https://playground.4geeks.com/todo/todos/15</code>
          </div>
        </div>
        <div className="row my-2">
          <div className="col-md-12">
            <h1>Testing todo API 🧪</h1>
            <a onClick={readTask} className="btn btn-primary mx-3">
              Mostrar tareas
            </a>
            <a onClick={createTask} className="btn btn-secondary mx-3">
              Crear tarea
            </a>
            <a onClick={removeTask} className="btn btn-danger mx-3">
              Eliminar tarea
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
