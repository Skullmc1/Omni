export default function DNASpinner() {
  return (
    <div className="relative w-16 h-16">
      {/* First Helix */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`a-${i}`}
            className="absolute w-2 h-2 bg-red-600 rounded-full animate-dna1"
            style={{
              left: "50%",
              top: i * 33.33 + "%",
              marginLeft: "-4px",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>

      {/* Second Helix */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`b-${i}`}
            className="absolute w-2 h-2 bg-red-400 rounded-full animate-dna2"
            style={{
              left: "50%",
              top: i * 33.33 + "%",
              marginLeft: "-4px",
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
