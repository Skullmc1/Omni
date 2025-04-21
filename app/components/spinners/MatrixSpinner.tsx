export default function MatrixSpinner() {
  return (
    <div className="relative w-16 h-16 grid grid-cols-3 grid-rows-3 gap-1">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="w-full h-full bg-red-600 rounded-sm animate-matrix"
          style={{
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
