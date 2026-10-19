import { useToast } from '../../hooks/useToast';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`toast toast--${type}`}
          role="alert"
          onClick={() => removeToast(id)}
          onKeyDown={(e) => e.key === 'Enter' && removeToast(id)}
          tabIndex={0}
        >
          {message}
        </div>
      ))}
    </div>
  );
};
