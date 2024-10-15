import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { setTasks, addTask, updateTask, deleteTask } from '../../slices/taskSlice';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: string;
}

const TaskManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    dueDate: '',
    assignedTo: '',
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // TODO: Fetch tasks from API
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Implement login functionality',
        description: 'Create login form and integrate with backend API',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-03-15',
        assignedTo: 'John Doe',
      },
      {
        id: '2',
        title: 'Design dashboard layout',
        description: 'Create wireframes and mockups for the main dashboard',
        status: 'todo',
        priority: 'medium',
        dueDate: '2024-03-20',
        assignedTo: 'Jane Smith',
      },
    ];
    dispatch(setTasks(mockTasks));
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({ ...editingTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      dispatch(updateTask(editingTask));
      setEditingTask(null);
    } else {
      dispatch(addTask({ ...newTask, id: Date.now().toString() } as Task));
      setNewTask({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        dueDate: '',
        assignedTo: '',
      });
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={editingTask?.title || newTask.title}
            onChange={handleInputChange}
            placeholder="Task Title"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="status"
            value={editingTask?.status || newTask.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <textarea
            name="description"
            value={editingTask?.description || newTask.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
            rows={3}
          ></textarea>
          <select
            name="priority"
            value={editingTask?.priority || newTask.priority}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={editingTask?.dueDate || newTask.dueDate}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="assignedTo"
            value={editingTask?.assignedTo || newTask.assignedTo}
            onChange={handleInputChange}
            placeholder="Assigned To"
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
            <div className="mt-2">
              <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                task.priority === 'high' ? 'bg-red-200 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {task.priority}
              </span>
              <span className={`ml-2 inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                task.status === 'todo' ? 'bg-gray-200 text-gray-800' :
                task.status === 'in-progress' ? 'bg-blue-200 text-blue-800' :
                'bg-green-200 text-green-800'
              }`}>
                {task.status}
              </span>
            </div>
            <p className="text-sm mt-2">Due: {task.dueDate}</p>
            <p className="text-sm">Assigned to: {task.assignedTo}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => handleEdit(task)} className="text-blue-500 hover:text-blue-700 mr-2">
                <Edit size={18} />
              </button>
              <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManagement;