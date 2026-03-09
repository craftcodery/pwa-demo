import { useState } from 'react'
import {
  PlusIcon,
  CheckIcon,
  SparklesIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

interface Task {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
}

const initialTasks: Task[] = [
  { id: '1', text: 'Review PWA manifest configuration', completed: true, priority: 'high' },
  { id: '2', text: 'Test offline functionality', completed: false, priority: 'high' },
  { id: '3', text: 'Add app shortcuts to manifest', completed: false, priority: 'medium' },
  { id: '4', text: 'Implement notification permissions', completed: false, priority: 'medium' },
  { id: '5', text: 'Create maskable icons', completed: true, priority: 'low' },
]

export function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState('')

  const completedCount = tasks.filter(t => t.completed).length
  const totalCount = tasks.length

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      completed: false,
      priority: 'medium'
    }

    setTasks([task, ...tasks])
    setNewTask('')
  }

  const priorityColors = {
    high: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    medium: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    low: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
            <SparklesIcon className="w-4 h-4" />
            <span className="text-xs font-medium">Focus</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalCount - completedCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">remaining</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
            <CheckIcon className="w-4 h-4" />
            <span className="text-xs font-medium">Done</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedCount}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">completed</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
            <FireIcon className="w-4 h-4" />
            <span className="text-xs font-medium">Streak</span>
          </div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">7</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">days</p>
        </div>
      </div>

      {/* Quick Add */}
      <form onSubmit={addTask} className="relative">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new focus item..."
          className="w-full px-4 py-3 pr-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </form>

      {/* Today's Focus */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Today's Focus
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer transition-all duration-200 hover:border-indigo-300 dark:hover:border-indigo-700 ${
                task.completed ? 'opacity-60' : ''
              }`}
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                task.completed
                  ? 'border-emerald-500 bg-emerald-500'
                  : 'border-slate-300 dark:border-slate-600 hover:border-indigo-500'
              }`}>
                {task.completed && (
                  <CheckCircleIcon className="w-6 h-6 text-white" />
                )}
              </div>

              <span className={`flex-1 text-sm ${
                task.completed
                  ? 'text-slate-400 line-through'
                  : 'text-slate-900 dark:text-white'
              }`}>
                {task.text}
              </span>

              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priorityColors[task.priority]}`}>
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Daily Progress</span>
          <span className="text-sm">{Math.round((completedCount / totalCount) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
