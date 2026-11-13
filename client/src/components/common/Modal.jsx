import { useEffect, useRef } from 'react'

import { XMark } from '../layout/icons'

/**
 * Reusable accessible modal dialog component with Dark Mode support.
 *
 * Props:
 *   isOpen - boolean
 *   onClose - callback when dismissed
 *   title - dialog header title
 *   children - content inside modal body
 */
export default function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-surface dark:bg-slate-800 rounded-2xl border border-border dark:border-slate-700 shadow-xl z-10 overflow-hidden flex flex-col max-h-[90vh] transition-colors"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-slate-700">
          <h3 id="modal-title" className="text-base font-semibold text-text-primary dark:text-white">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-lg text-text-tertiary dark:text-slate-400 hover:text-text-primary dark:hover:text-white hover:bg-surface-hover dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <XMark className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
