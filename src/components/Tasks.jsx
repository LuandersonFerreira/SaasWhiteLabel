import { ChevronRightIcon, TrashIcon, CheckIcon } from "lucide-react";

function Tasks({ tasks, onTaskClick, onDeleteTaskClick }) {
  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {tasks.map ((task) => (
        <li key={task.id} className="flex gap-2 items-center">
          <button
            onClick={() => onTaskClick(task.id)}
            className={`bg-slate-400 flex items-center gap-2 text-left w-full text-white p-2 ${
              task.isCompleted ? "line-through" : ""
            }`}
          >
            {task.isCompleted && <CheckIcon size={20} className="text-green-400" />} 
            {task.title}
          </button>
          <button className="bg-slate-400 text-white p-2">
            <ChevronRightIcon />
          </button>
          <button
            onClick={() => onDeleteTaskClick(task.id)}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;



