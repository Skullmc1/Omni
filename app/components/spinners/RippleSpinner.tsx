export default function RippleSpinner() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full rounded-full animate-ripple"
          style={{
            border: "4px solid",
            borderColor: "rgb(220 38 38 / 0.2)",
            borderTopColor: "rgb(220 38 38)",
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
