export default function Tag({ label, banned, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`tag ${banned ? "tag--banned" : ""}`}
      title={banned ? "Banned — click to remove" : "Click to ban"}
    >
      {label}
      {banned && <span className="tag-x">✕</span>}
    </button>
  );
}