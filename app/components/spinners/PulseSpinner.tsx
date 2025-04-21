export default function PulseSpinner() {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 border-2 border-red-600 rounded-full"
          style={{
            animation: "pulseSpinner 1.5s ease-out infinite",
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
