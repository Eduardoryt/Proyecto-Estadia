export function Button({ onClick, children }) {
  return (
    <button
      className=""
      onClick={onClick}
    >
      {children}
    </button>
  );
}
