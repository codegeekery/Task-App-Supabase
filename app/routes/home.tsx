

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      <p className="text-lg mb-8">Manage your tasks efficiently.</p>
      <a href="/tasks" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        View Tasks
      </a>
    </div>
  );
}