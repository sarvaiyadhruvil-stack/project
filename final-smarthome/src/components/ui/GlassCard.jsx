export default function GlassCard({ children, className = '', hover = true }) {
  return (
    <div className={`glass-card ${hover ? '' : 'hover:border-border hover:shadow-none'} ${className}`}>
      {children}
    </div>
  );
}
