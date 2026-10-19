export const EmptyState = ({ icon = '📭', message = 'Nema podataka' }) => (
  <div className="empty-state" role="status">
    <div className="empty-state__icon" aria-hidden="true">
      {icon}
    </div>
    <p>{message}</p>
  </div>
);
