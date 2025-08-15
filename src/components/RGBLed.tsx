import { useState, useEffect } from 'react';

interface RGBLedProps {
  isRunning: boolean;
}

const RGBLed = ({ isRunning }: RGBLedProps) => {
  const [currentColor, setCurrentColor] = useState<'off' | 'red' | 'green' | 'blue'>('off');
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (!isRunning) {
      setCurrentColor('off');
      setIsBlinking(false);
      return;
    }

    const colors: ('red' | 'green' | 'blue')[] = ['red', 'green', 'blue'];
    let colorIndex = 0;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setCurrentColor(colors[colorIndex]);
      
      // Turn off LED after 100ms (short blink)
      setTimeout(() => {
        setIsBlinking(false);
        setCurrentColor('off');
      }, 100);
      
      colorIndex = (colorIndex + 1) % colors.length;
    }, 500); // 2 Hz = 500ms intervals

    return () => clearInterval(blinkInterval);
  }, [isRunning]);

  const getColorClass = () => {
    if (!isBlinking && currentColor === 'off') return 'bg-led-off';
    
    switch (currentColor) {
      case 'red':
        return 'bg-led-red shadow-led-red';
      case 'green':
        return 'bg-led-green shadow-led-green';
      case 'blue':
        return 'bg-led-blue shadow-led-blue';
      default:
        return 'bg-led-off';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        {/* LED Base */}
        <div className="w-32 h-32 bg-secondary rounded-full border-4 border-border flex items-center justify-center">
          {/* LED */}
          <div 
            className={`
              w-24 h-24 rounded-full transition-all duration-75 ease-in-out
              ${getColorClass()}
              ${isBlinking ? 'scale-110' : 'scale-100'}
            `}
          />
        </div>
        
        {/* LED Pins */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <div className="w-2 h-8 bg-muted rounded-b-sm"></div>
          <div className="w-2 h-8 bg-muted rounded-b-sm"></div>
          <div className="w-2 h-8 bg-muted rounded-b-sm"></div>
          <div className="w-2 h-8 bg-muted rounded-b-sm"></div>
        </div>
      </div>
      
      {/* Color indicator */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Current Color</p>
        <p className="text-lg font-semibold capitalize">
          {currentColor === 'off' ? 'Off' : currentColor}
        </p>
      </div>
    </div>
  );
};

export default RGBLed;