export default function LoadingDots() {
  return (
    <div className="flex space-x-2 items-center p-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1s",
          }}
        />
      ))}
    </div>
  );
}
