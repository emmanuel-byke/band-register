
export const BackgroundImage = ({ 
    children, 
    src, 
    alt='background', 
    overlayClassName="absolute inset-0 backdrop-blur-md bg-black/40", 
    imgClassName="w-full h-full object-cover" 
}) => (
  <div className="fixed inset-0 z-0">
    <img 
      src={src} 
      alt={alt} 
      className={imgClassName}
    />
    <div className={overlayClassName} />
    {children}
  </div>
);