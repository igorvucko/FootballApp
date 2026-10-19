export const Loader = ({ label = 'Učitavanje...' }) => (
  <div className="loader" role="status" aria-live="polite" aria-busy="true">
    <div className="loader__spinner" aria-hidden="true" />
    <span className="sr-only">{label}</span>
  </div>
);
