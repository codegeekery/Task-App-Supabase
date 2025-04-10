import { supabase } from '@/lib/supabase';
import type { Task } from '@/types/task';

// Funciones auxiliares para cada operación
export async function handleCreateTask(taskData: Omit<Task, '_id' | 'created_at'>) {
    const { error } = await supabase.from('tasks').insert([taskData]);
    if (error) throw error;
}

export async function handleUpdateTask(taskId: string, taskData: Partial<Task>) {
    const { error } = await supabase
        .from('tasks')
        .update(taskData)
        .eq('_id', taskId);
    if (error) throw error;
}

export async function handleDeleteTask(taskId: string) {
    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('_id', taskId);
    if (error) throw error;
}