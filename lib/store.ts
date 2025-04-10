// Store selected Tasks
import { create } from 'zustand'


// almacenar el estado de los tasks seleccionados desde la tabla
import type { Task } from '@/types/task'


type ActionMode = 'create' | 'put' | 'delete'

interface TaskStore {
  selectedTask: Task | null
  actionMode: ActionMode
  setSelectedTask: (task: Task | null) => void
  setActionMode: (mode: ActionMode) => void
  reset: () => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  selectedTask: null,
  actionMode: 'create',
  setSelectedTask: (task) => set({ selectedTask: task }),
  setActionMode: (mode) => set({ actionMode: mode }),
  reset: () => set({ selectedTask: null, actionMode: 'create' })
}))
