import { useEffect, useState } from 'react'
import { Calendar, Clock } from '../layout/icons'

/**
 * Pixel-Accurate Figma Task Form (Modal Body) with Dark Mode support.
 */
export default function TaskForm({
  initialData = null,
  onSubmit,
  onCancel,
  submitLabel = 'Create task',
}) {
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState({})

  const getTodayISO = () => {
    const now = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
  }

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setDescription(initialData.description || '')
      setStartTime(initialData.startTime || '')
      setEndTime(initialData.endTime || '')
      setPriority(initialData.priority || 'medium')

      if (initialData.dateTime) {
        const parts = initialData.dateTime.split('T')
        setDate(parts[0] || getTodayISO())
        if (!initialData.startTime && parts[1]) {
          setStartTime(parts[1].slice(0, 5))
        }
      } else {
        setDate(getTodayISO())
      }
    } else {
      setTitle('')
      setDescription('')
      setDate(getTodayISO())
      setStartTime('')
      setEndTime('')
      setPriority('medium')
    }
    setErrors({})
  }, [initialData])

  const validate = () => {
    const errs = {}
    if (!title.trim()) {
      errs.title = 'Task title is required'
    }
    if (!date) {
      errs.date = 'Date is required'
    }
    if (startTime && endTime && startTime > endTime) {
      errs.endTime = 'End time cannot be earlier than start time'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    const combinedDateTime = `${date}T${startTime || '09:00'}`

    onSubmit?.({
      title: title.trim(),
      description: description.trim(),
      dateTime: combinedDateTime,
      startTime: startTime || '',
      endTime: endTime || '',
      priority: priority || 'medium',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left" noValidate>
      {/* ─── Task Title ─── */}
      <div>
        <label htmlFor="task-title" className="block text-xs font-semibold text-text-primary dark:text-slate-200 mb-1.5">
          Task title <span className="text-danger">*</span>
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (errors.title) setErrors((prev) => ({ ...prev, title: null }))
          }}
          placeholder="Doing Homework"
          className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface dark:bg-slate-700/60 border rounded-xl text-text-primary dark:text-white placeholder:text-text-tertiary dark:placeholder:text-slate-400 transition-all
            focus:outline-none focus:ring-1
            ${errors.title ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500'}`}
        />
        {errors.title && (
          <p className="text-[11px] text-danger mt-1">{errors.title}</p>
        )}
      </div>

      {/* ─── Set Time: Two Side-by-Side Inputs ─── */}
      <div>
        <span className="block text-xs font-semibold text-text-primary dark:text-slate-200 mb-1.5">
          Set Time
        </span>
        <div className="grid grid-cols-2 gap-3">
          {/* Start Time */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
              <Clock className="w-4 h-4 text-primary-600" />
            </div>
            <input
              id="task-start-time"
              type="time"
              value={startTime}
              aria-label="Start time"
              onChange={(e) => {
                setStartTime(e.target.value)
                if (errors.endTime) setErrors((prev) => ({ ...prev, endTime: null }))
              }}
              className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-surface dark:bg-slate-700/60 border border-border dark:border-slate-600 rounded-xl text-text-primary dark:text-white placeholder:text-text-tertiary focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all cursor-pointer"
            />
          </div>

          {/* End Time */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-tertiary">
              <Clock className="w-4 h-4 text-primary-600" />
            </div>
            <input
              id="task-end-time"
              type="time"
              value={endTime}
              aria-label="End time"
              onChange={(e) => {
                setEndTime(e.target.value)
                if (errors.endTime) setErrors((prev) => ({ ...prev, endTime: null }))
              }}
              className={`w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-surface dark:bg-slate-700/60 border rounded-xl text-text-primary dark:text-white placeholder:text-text-tertiary focus:outline-none focus:ring-1 transition-all cursor-pointer
                ${errors.endTime ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500'}`}
            />
          </div>
        </div>
        {errors.endTime && (
          <p className="text-[11px] text-danger mt-1">{errors.endTime}</p>
        )}
      </div>

      {/* ─── Set Date ─── */}
      <div>
        <label htmlFor="task-date" className="block text-xs font-semibold text-text-primary dark:text-slate-200 mb-1.5">
          Set Date <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <input
            id="task-date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              if (errors.date) setErrors((prev) => ({ ...prev, date: null }))
            }}
            className={`w-full pl-3.5 pr-10 py-2.5 text-xs sm:text-sm bg-surface dark:bg-slate-700/60 border rounded-xl text-text-primary dark:text-white focus:outline-none focus:ring-1 transition-all cursor-pointer
              ${errors.date ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border dark:border-slate-600 focus:border-primary-500 focus:ring-primary-500'}`}
          />
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-text-tertiary">
            <Calendar className="w-4 h-4 text-primary-600" />
          </div>
        </div>
        {errors.date && (
          <p className="text-[11px] text-danger mt-1">{errors.date}</p>
        )}
      </div>

      {/* ─── Priority Selector ─── */}
      <div>
        <span className="block text-xs font-semibold text-text-primary dark:text-slate-200 mb-1.5">
          Priority
        </span>
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              value: 'low',
              label: 'Low',
              activeClasses: 'bg-blue-50 dark:bg-blue-950/60 border-primary-500 text-primary-600 dark:text-blue-400 font-bold shadow-xs',
            },
            {
              value: 'medium',
              label: 'Medium',
              activeClasses: 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 text-amber-700 dark:text-amber-400 font-bold shadow-xs',
            },
            {
              value: 'high',
              label: 'High',
              activeClasses: 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-600 dark:text-red-400 font-bold shadow-xs',
            },
          ].map((item) => {
            const isSelected = priority === item.value
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setPriority(item.value)}
                className={`py-2 px-3 text-xs rounded-xl border text-center transition-all cursor-pointer
                  ${
                    isSelected
                      ? item.activeClasses
                      : 'border-border dark:border-slate-600 bg-surface dark:bg-slate-700 text-text-secondary dark:text-slate-300 hover:border-primary-300 hover:bg-surface-hover'
                  }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ─── Description ─── */}
      <div>
        <label htmlFor="task-description" className="block text-xs font-semibold text-text-primary dark:text-slate-200 mb-1.5">
          Description
        </label>
        <textarea
          id="task-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add Description"
          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-surface dark:bg-slate-700/60 border border-border dark:border-slate-600 rounded-xl text-text-primary dark:text-white placeholder:text-text-tertiary dark:placeholder:text-slate-400 transition-all focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none"
        />
      </div>

      {/* ─── Full Width Submit Button ─── */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-md shadow-primary-600/25 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 active:scale-[0.99]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
