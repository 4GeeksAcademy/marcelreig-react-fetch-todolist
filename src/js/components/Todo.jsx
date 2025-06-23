import React, { useState, useEffect } from "react";

const Todo = () => {
  // Crear un estado para almacenar los elementos de la lista de tareas
  const [todos, setTodos] = useState([]);
  // Crear un estado para almacenar el valor del input
  const [inputValue, setInputValue] = useState("");
  // Función para asegurarse de que el usuario existe (no lo require el ejercicio)
  const ensureUserExists = async () => {
    try {
      const res = await fetch(
        "https://playground.4geeks.com/todo/users/marcel"
      );
      if (res.ok) return true; // si es true aquí se detiene la función
      // Si no existe el usuario, lo creamos
      const createUser = await fetch(
        "https://playground.4geeks.com/todo/users/marcel",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([]),
        }
      );

      if (!createUser.ok) throw new Error("No se pudo crear el usuario");
      console.log("Usuario 'marcel' creado correctamente");
      return true;
    } catch (error) {
      console.error("Error asegurando que el usuario existe:", error);
      return false;
    }
  };

  const fetchTodos = () => {
    fetch("https://playground.4geeks.com/todo/users/marcel")
      .then((response) => {
        if (!response.ok)
          throw new Error("Usuario no encontrado o error en la API");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          setTodos([]);
        }
      })
      .catch((error) => console.error("Error al cargar tareas:", error));
  };
  
  // Usar useEffect para cargar las tareas al montar el componente
  // y asegurarse de que el usuario existe
  // Si el usuario no existe, lo creamos
  useEffect(() => {
    const init = async () => {
      const userOk = await ensureUserExists();
      if (!userOk) return;
      fetchTodos();
    };
    init();
  }, []);

  // Crear una función para manejar la adición de un nuevo elemento a la lista de tareas
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTask = {
      label: inputValue,
      is_done: false,
    };

    fetch("https://playground.4geeks.com/todo/todos/marcel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al crear la tarea");
        return response.json();
      })
      .then((data) => {
        setTodos([...todos, data]);
        setInputValue(""); // Limpiar el input después de agregar la tarea
      })
      .catch((error) => console.error("Error:", error));
  };
  // Crear una función para manejar la eliminación de un elemento de la lista de tareas
  const removeTodo = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al eliminar la tarea");
        fetchTodos(); // Recarga desde la API
      })
      .catch((error) => console.error("Error:", error));
  };
  
  return (
    <div className="todo-app">
      <h1 className="text-center mt-5 todo-app__title">todos</h1>
      <div className="todo-app__box mx-auto">
        <input
          type="text"
          className="todos__input"
          placeholder="Añadir nueva tarea"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="todo-list__item d-flex justify-content-between align-items-center"
            >
              <span className="todo-list__text">{todo.label}</span>
              <span
                className="todo-list__remove"
                onClick={() => removeTodo(todo.id)}
              >
                <i className="fa-solid fa-xmark"></i>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="stack-wrapper">
        <div className="card card--layer3"></div>
        <div className="card card--layer2"></div>
        <div className="card card--main todo-app__footer">
          <p>Tareas pendientes: {todos.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
