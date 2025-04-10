import { Form } from "react-router";

import { useTaskStore } from "@/lib/store";


export function TaskForm() {
    const { selectedTask, actionMode, reset } = useTaskStore();

    const isEditMode = actionMode === 'put';
    const isDeleteMode = actionMode === 'delete';

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mb-5">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditMode ? 'Editar Tarea' : isDeleteMode ? 'Eliminar Tarea' : 'Nueva Tarea'}
            </h2>

            <Form
                method={isDeleteMode ? 'delete' : isEditMode ? 'put' : 'post'}
                onSubmit={()=> reset()}
                className="space-y-4"
            >
                {!isDeleteMode ? (
                    <>
                        {/* Campo Título */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Título
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                defaultValue={selectedTask?.title || ''}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Título de la tarea"
                                required
                            />
                        </div>

                        {/* Campo Descripción */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                defaultValue={selectedTask?.description || ''}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Descripción detallada de la tarea"
                            />
                        </div>

                        {/* Campo Fecha de Vencimiento */}
                        <div>
                            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
                                Fecha de Vencimiento
                            </label>
                            <input
                                type="date"
                                id="due_date"
                                name="due_date"
                                defaultValue={selectedTask?.due_date ? selectedTask.due_date.split('T')[0] : ''}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Campo Completado */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="completed"
                                name="completed"
                                defaultChecked={selectedTask?.completed || false}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="completed" className="ml-2 block text-sm text-gray-700">
                                ¿Completada?
                            </label>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <p className="text-lg text-gray-700">
                            ¿Estás seguro que deseas eliminar la tarea "{selectedTask?.title}"?
                        </p>
                        <input type="hidden" name="_id" value={selectedTask?._id || ''} />
                    </div>
                )}

                {/* Botón de Envío */}
                <div className="pt-4">
                    <button
                        type="submit"
                        className={`w-full font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${isDeleteMode
                                ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
                                : 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
                            }`}
                    >
                        {isEditMode ? 'Actualizar Tarea' : isDeleteMode ? 'Confirmar Eliminación' : 'Guardar Tarea'}
                    </button>
                </div>

                {isEditMode && (
                    <input type="hidden" name="_id" value={selectedTask?._id || ''} />
                )}
            </Form>
        </div>
    );
}