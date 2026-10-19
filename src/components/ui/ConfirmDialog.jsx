export const ConfirmDialog = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      onClick={onCancel}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="modal__actions">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Odustani
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>
            Potvrdi
          </button>
        </div>
      </div>
    </div>
  );
};
