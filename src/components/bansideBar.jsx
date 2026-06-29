export default function BanSidebar({ banList, onToggleBan, onClearAll }) {
  return (
    <aside className="ban-sidebar">
      <div className="ban-header">
        <h3 className="ban-title">Ban List</h3>
        {banList.length > 0 && (
          <button className="clear-btn" onClick={onClearAll}>
            Clear all
          </button>
        )}
      </div>

      {banList.length === 0 ? (
        <p className="ban-empty">
          Click any <span className="ban-hint">attribute tag</span> on a result
          to ban it from future discoveries.
        </p>
      ) : (
        <ul className="ban-list">
          {banList.map((val) => (
            <li key={val} className="ban-item" onClick={() => onToggleBan(val)}>
              <span className="ban-val">{val}</span>
              <span className="ban-remove">✕</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}