'use client';

import * as React from "react";

type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "destructive" | "success";
};

type ToastContextType = {
  toasts: { id: string; title?: string; description?: string; variant?: ToastProps["variant"] }[];
  addToast: (toast: { title?: string; description?: string; variant?: ToastProps["variant"] }) => void;
  removeToast: (id: string) => void;
};

export const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<
    { id: string; title?: string; description?: string; variant?: ToastProps["variant"] }[]
  >([]);

  const addToast = React.useCallback(
    (toast: { title?: string; description?: string; variant?: ToastProps["variant"] }) => {
      const id = Math.random().toString(36).slice(2, 11);
      setToasts((prev) => [...prev, { id, ...toast }]);

      // Auto remove toast after 5 seconds
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:top-0 md:right-0 md:bottom-auto max-w-md">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 shadow-lg transition-all
              ${toast.variant === "destructive" ? "bg-red-600 text-white border-red-700" : 
                toast.variant === "success" ? "bg-green-600 text-white border-green-700" : 
                "bg-white text-gray-900 border-gray-200"}
            `}
          >
            <div className="flex justify-between gap-2">
              <div className="grid gap-1">
                {toast.title && (
                  <h2 className="font-semibold">{toast.title}</h2>
                )}
                {toast.description && (
                  <p className="text-sm opacity-90">{toast.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="rounded-full p-1 text-foreground/50 opacity-70 transition-opacity hover:opacity-100"
                aria-label="Close toast"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return {
    toast: (props: { title?: string; description?: string; variant?: ToastProps["variant"] }) => {
      context.addToast(props);
    }
  };
}

export function Toaster() {
  return (
    <ToastProvider>
      <ToastListener />
    </ToastProvider>
  );
}

function ToastListener() {
  const { toast } = useToast();

  React.useEffect(() => {
    const handleToastEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        toast(customEvent.detail);
      }
    };

    // Listen for custom toast events
    document.addEventListener('show-toast', handleToastEvent);

    return () => {
      document.removeEventListener('show-toast', handleToastEvent);
    };
  }, [toast]);

  return null;
} 