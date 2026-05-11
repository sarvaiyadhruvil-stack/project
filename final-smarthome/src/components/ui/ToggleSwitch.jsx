export default function ToggleSwitch({ on, onToggle, label }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text text-sm font-medium">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          on ? 'bg-accent shadow-[0_0_12px_rgba(0,200,255,0.4)]' : 'bg-white/10'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
            on ? 'left-7' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}
