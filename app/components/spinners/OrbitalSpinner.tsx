export default function OrbitalSpinner() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-red-600/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-spin" />
      <div
        className="absolute inset-2 border-4 border-transparent border-t-red-400 rounded-full animate-spin"
        style={{ animationDuration: "0.8s" }}
      />
    </div>
  );
}
