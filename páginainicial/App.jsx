import { useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import {v4} from "uuid";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Cristiano Ronaldo",
      description: ".",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Mighuel Montenegro",
      description: ".",
      isCompleted: false,
    },
    {
      id: 3,
      title: "Luiz Carlos",
      description: "",
      isCompleted: false,
    },
  ]);

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    if (!title.trim()) return; 

    const newTask = {
      id: v4, 
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-700 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Convidados
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick} />
      </div>
    </div>
  );
}

export default App;