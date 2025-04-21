export default function GradientSpinner() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full animate-spin-slow">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-transparent animate-pulse" />
      </div>
      <div className="absolute inset-2 bg-gray-900 rounded-full" />
      <div className="absolute inset-4 rounded-full border-2 border-red-600/50 animate-ping" />
    </div>
  );
}
