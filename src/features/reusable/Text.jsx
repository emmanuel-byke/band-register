

export const HighlightedText = ({ children }) => (
  <span className="text-[var(--color-secondary)] font-bold bg-gradient-to-r from-[var(--color-secondary)]/30 to-transparent px-4 py-2 rounded-xl">
    {children}
  </span>
);

export const BlurHighlightedText = ({ children, variant = 'primary' }) => {
  const variants = {
    primary: `bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent
      drop-shadow-sm`,
    secondary: `bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent
      drop-shadow-sm`,
    accent: `bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent
      drop-shadow-sm`,
  };

  return (
    <span className={`font-bold relative inline-block ${variants[variant]}`}>
      {children}
      {/* Subtle glow effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 
        blur-sm -z-10 rounded-lg" 
        aria-hidden="true"
      />
    </span>
  );
};