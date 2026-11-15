import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface Toast {
  id: number;
  title: string;
  description?: string;
  status: 'success' | 'error';
}

interface ToastContextValue {
  toast: (t: Omit<Toast, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext).toast;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  useEffect(
    () => () => {
      for (const id of timers.current) clearTimeout(id);
    },
    [],
  );

  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...t, id }]);
    const timer = setTimeout(() => {
      timers.current.delete(timer);
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 5000);
    timers.current.add(timer);
  }, []);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <section
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.status === 'error' ? 'alert' : 'status'}
            className={`px-4 py-3 shadow-lg max-w-sm animate-slide-up border font-body ${
              t.status === 'success'
                ? 'bg-surface border-fired-gold text-aged-parchment'
                : 'bg-surface border-ember-orange text-aged-parchment'
            }`}>
            <div className="flex justify-between items-start gap-2">
              <div>
                <p className="font-headline text-hmd">{t.title}</p>
                {t.description && (
                  <p className="text-sm mt-1 opacity-70">{t.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => remove(t.id)}
                aria-label="Fermer la notification"
                className="text-aged-parchment/50 hover:text-aged-parchment text-lg leading-none">
                &times;
              </button>
            </div>
          </div>
        ))}
      </section>
    </ToastContext.Provider>
  );
}
