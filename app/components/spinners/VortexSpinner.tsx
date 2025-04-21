export default function VortexSpinner() {
  return (
    <div className="relative w-16 h-16">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full"
          style={{
            transform: `rotate(${i * 45}deg)`,
          }}
        >
          <div
            className="absolute w-2 h-2 bg-red-600 rounded-full animate-vortex"
            style={{
              left: "50%",
              marginLeft: "-4px",
              top: 0,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
