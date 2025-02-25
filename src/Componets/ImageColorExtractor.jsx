import { useState, useEffect } from 'react';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';

const ColorDisplay = ({ imageSrc }) => {
  const [colors, setColors] = useState({
    dominantColor: '#ffffff',
    oppositeColor: '#000000'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getColors = async () => {
      try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        
        img.onload = () => {
          const colorThief = new ColorThief();
          const dominantColor = colorThief.getColor(img);
          
          // Convert RGB to hex
          const dominantHex = chroma(dominantColor).hex();
          
          // Get contrasting color using chroma-js
          const oppositeColor = chroma(dominantHex).luminance() > 0.5 ? '#000000' : '#ffffff';
          
          setColors({
            dominantColor: dominantHex,
            oppositeColor: oppositeColor
          });
          setLoading(false);
        };

        img.src = imageSrc;
      } catch (error) {
        console.error('Error extracting colors:', error);
        setLoading(false);
      }
    };

    getColors();
  }, [imageSrc]);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="animate-pulse h-40 bg-gray-200 rounded-lg" />
      ) : (
        <>
          <div 
            className="p-8 rounded-lg shadow-lg text-center"
            style={{ 
              backgroundColor: colors.dominantColor,
              color: colors.oppositeColor
            }}
          >
            <h2 className="text-2xl font-bold mb-4">Dominant Color Preview</h2>
            <p className="mb-2">Background: {colors.dominantColor}</p>
            <p>Text: {colors.oppositeColor}</p>
          </div>
          
          {/* Color Palette from Image */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Color Palette</h3>
            <div className="flex gap-2">
              {chroma.scale([colors.dominantColor, colors.oppositeColor])
                .colors(5)
                .map((color, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
            </div>
          </div>

          <div className="w-full">
            <img 
              src={imageSrc} 
              alt="Source image" 
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ColorDisplay;