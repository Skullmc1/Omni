export default function AtomSpinner() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-600 border-b-red-600 animate-atom-1" />
      <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-red-600 border-r-red-600 animate-atom-2" />
      <div className="absolute inset-4 bg-red-600 rounded-full animate-pulse" />
    </div>
  );
}
