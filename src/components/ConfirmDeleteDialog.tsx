import { AlertTriangle, X } from "lucide-react";

interface ConfirmDeleteProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

export function ConfirmDeleteDialog({
  open,
  onConfirm,
  onCancel,
  title = "Delete this item?",
  description = "This action cannot be undone. All associated data will be permanently removed.",
  confirmLabel = "Delete",
}: ConfirmDeleteProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onCancel}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-2 shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 id="confirm-title" className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p id="confirm-desc" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          </div>
          <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close">
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            autoFocus
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
