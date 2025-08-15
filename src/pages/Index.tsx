import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import RGBLed from '@/components/RGBLed';
import PythonCode from '@/components/PythonCode';
import { Play, Pause, Code } from 'lucide-react';

const Index = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-led-red via-led-green to-led-blue bg-clip-text text-transparent">
            RGB LED Blinker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Raspberry Pi RGB LED simulation - blinks Red → Green → Blue at 2 Hz
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* LED Simulation */}
          <Card className="bg-gradient-card shadow-card">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-2">LED Simulation</h2>
                <p className="text-muted-foreground">
                  Watch the RGB LED blink in sequence
                </p>
              </div>
              
              <div className="flex flex-col items-center space-y-8">
                <RGBLed isRunning={isRunning} />
                
                {/* Controls */}
                <div className="flex gap-4">
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-5 h-5" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Start
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setShowCode(!showCode)}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Code className="w-5 h-5" />
                    {showCode ? 'Hide' : 'Show'} Code
                  </Button>
                </div>
                
                {/* Status */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Status: <span className="font-medium">{isRunning ? 'Running' : 'Stopped'}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Frequency: 2 Hz (0.5s intervals)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Code Panel */}
          <div className={`transition-all duration-300 ${showCode ? 'opacity-100' : 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto'}`}>
            <PythonCode />
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card shadow-card">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-led-red rounded-full mx-auto mb-4 shadow-led-red"></div>
              <h3 className="font-semibold mb-2">Red Phase</h3>
              <p className="text-sm text-muted-foreground">
                GPIO 18 controls the red LED component
              </p>
            </div>
          </Card>
          
          <Card className="bg-gradient-card shadow-card">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-led-green rounded-full mx-auto mb-4 shadow-led-green"></div>
              <h3 className="font-semibold mb-2">Green Phase</h3>
              <p className="text-sm text-muted-foreground">
                GPIO 19 controls the green LED component
              </p>
            </div>
          </Card>
          
          <Card className="bg-gradient-card shadow-card">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-led-blue rounded-full mx-auto mb-4 shadow-led-blue"></div>
              <h3 className="font-semibold mb-2">Blue Phase</h3>
              <p className="text-sm text-muted-foreground">
                GPIO 20 controls the blue LED component
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;