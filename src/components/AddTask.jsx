import { useState } from "react";

function AddTask({ onAddTaskSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleAddTask() {
    if (!title.trim()) {
      setError("Preencha o nome do convidado!"); 
      return;
    }

    onAddTaskSubmit(title, description);

    setTitle(""); 
    setDescription("");
    setError(""); 
  }

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <input
        type="text"
        placeholder="Digite o nome do convidado"
        className={`border border-slate-300 outline-slate-400 px-4 py-2 rounded-md ${
          error ? "border-red-500" : ""
        }`} 
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
          setError(""); 
        }}
      />
      <input
        type="text"
        placeholder="Quantidade de acompanhantes"
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleAddTask}
        className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium hover:bg-slate-600 transition"
      >
        Adicionar
      </button>
    </div>
  );
}

export default AddTask;
