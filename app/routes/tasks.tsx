
import type { Route } from "./+types/tasks";

import { supabase } from "@/lib/supabase";


import { useLoaderData, redirect } from "react-router";

import type { Task } from "@/types/task";
import { TaskForm } from "~/components/TaskForm";
import { useTaskStore } from "@/lib/store";
import { handleCreateTask, handleUpdateTask, handleDeleteTask } from "@/lib/query";



export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const method = request.method;

    // Extraer datos comunes
    const taskData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        due_date: formData.get('due_date') as string,
        completed: formData.get('completed') === 'on'
    };

    const taskId = formData.get('_id') as string;

    try {
        switch (method) {
            case 'POST':
                await handleCreateTask(taskData);
                break;

            case 'PUT':
                await handleUpdateTask(taskId, taskData);
                break;

            case 'DELETE':
                await handleDeleteTask(taskId);
                break;

            default:
                return new Response("Method Not Allowed", { status: 405 });
        }

        // Redirect to the tasks page after action
        return new Response("Success", { status: 200 });
    } catch (error) {
        return new Response("Server Error", { status: 500 });
    }
}

// Loader
export async function loader() {
    // Fetch tasks from your API here
    // supabase fetch tasks from your API here
    const { data, error } = await supabase.from('tasks').select('*');

    if (error) {
        return new Response("Server Error Internal", { status: 500 });
    }

    return data
}


export default function Tasks() {

    const tasks = useLoaderData();

    const { setSelectedTask, setActionMode } = useTaskStore();

    const handleEdit = (task: Task) => {
        setSelectedTask(task);
        setActionMode('put');
    };

    const handleDelete = (task: Task) => {
        setSelectedTask(task);
        setActionMode('delete');
    };

    return (
        <>

            <TaskForm />


            {tasks.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
                </div>
            ) : (
                <div className="flex justify-center p-2">
                    <div className="overflow-x-auto max-w-7xl w-full">
                        <table className="w-full bg-white rounded-lg overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">ID</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Title</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Description</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Due Date</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Status</th>
                                    <th className="py-3 px-4 text-left text-gray-700 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {tasks.map((task: Task) => (
                                    <tr key={task._id} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-800">{task._id}</td>
                                        <td className="py-3 px-4 text-gray-800">{task.title}</td>
                                        <td className="py-3 px-4 text-gray-600 truncate max-w-xs">{task.description}</td>
                                        <td className="py-3 px-4 text-gray-600">
                                            {new Date(task.due_date).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span
                                                className={`px-2 py-1 text-xs rounded-full ${task.completed
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                            >
                                                {task.completed ? "Completed" : "Pending"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEdit(task)}
                                                    className="px-4 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md text-sm font-medium transition-colors border border-blue-200 cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(task)}
                                                    className="px-4 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition-colors border border-red-200 cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}