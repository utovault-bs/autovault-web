const Pagination = ({ current, total, onChange }) => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, current - Math.floor(maxVisible / 2));
  let end = Math.min(total, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1);
  }
  for (let i = start; i <= end; i++) pages.push(i);
  if (total <= 1) return null;
  return (
    <div className="pagination">
      <button disabled={current <= 1} onClick={() => onChange(current - 1)}>Previous</button>
      {start > 1 && <><button onClick={() => onChange(1)}>1</button>{start > 2 && <span>...</span>}</>}
      {pages.map(p => <button key={p} className={current === p ? 'active' : ''} onClick={() => onChange(p)}>{p}</button>)}
      {end < total && <>{end < total - 1 && <span>...</span>}<button onClick={() => onChange(total)}>{total}</button></>}
      <button disabled={current >= total} onClick={() => onChange(current + 1)}>Next</button>
    </div>
  );
};
export default Pagination;
