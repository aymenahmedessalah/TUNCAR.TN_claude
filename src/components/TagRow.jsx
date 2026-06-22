import "./TagRow.css";

/**
 * Generic horizontally-scrolling row of selectable "pill" tags.
 * Reused for model, variant, and year selection on the Buyer page —
 * each consumer just passes its own title/options/selection handler.
 */
export default function TagRow({ title, options, selectedValue, onSelect }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="tag-row">
      <div className="tag-row__title">{title}</div>
      <div className="tag-row__list no-scrollbar">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`tag-pill ${selectedValue === option ? "is-active" : ""}`}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
