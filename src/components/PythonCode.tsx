import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Copy, Check } from 'lucide-react';

const PythonCode = () => {
  const [copied, setCopied] = useState(false);

  const pythonCode = `#!/usr/bin/env python3
"""
RGB LED Blinker for Raspberry Pi
Blinks an RGB LED in sequence: Red -> Green -> Blue -> Repeat
Frequency: 2 Hz (twice per second)
"""

import RPi.GPIO as GPIO
import time

# GPIO pin assignments (adjust based on your wiring)
RED_PIN = 18    # GPIO 18 (Pin 12)
GREEN_PIN = 19  # GPIO 19 (Pin 35)  
BLUE_PIN = 20   # GPIO 20 (Pin 38)

def setup():
    """Initialize GPIO pins"""
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(RED_PIN, GPIO.OUT)
    GPIO.setup(GREEN_PIN, GPIO.OUT)
    GPIO.setup(BLUE_PIN, GPIO.OUT)
    
    # Turn off all LEDs initially
    GPIO.output(RED_PIN, GPIO.LOW)
    GPIO.output(GREEN_PIN, GPIO.LOW)
    GPIO.output(BLUE_PIN, GPIO.LOW)

def blink_color(pin):
    """Blink a specific color"""
    GPIO.output(pin, GPIO.HIGH)
    time.sleep(0.1)  # LED on for 100ms
    GPIO.output(pin, GPIO.LOW)
    time.sleep(0.4)  # LED off for 400ms (total 500ms = 2 Hz)

def main():
    """Main program loop"""
    setup()
    
    try:
        print("Starting RGB LED blinker...")
        print("Press Ctrl+C to stop")
        
        while True:
            # Red
            blink_color(RED_PIN)
            
            # Green  
            blink_color(GREEN_PIN)
            
            # Blue
            blink_color(BLUE_PIN)
            
    except KeyboardInterrupt:
        print("\\nStopping...")
    
    finally:
        # Clean up GPIO
        GPIO.cleanup()
        print("GPIO cleaned up. Goodbye!")

if __name__ == "__main__":
    main()`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pythonCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Raspberry Pi Python Code</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        
        <div className="bg-background rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-foreground">
            <code>{pythonCode}</code>
          </pre>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="mb-2"><strong>Wiring Guide:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Red LED: GPIO 18 (Pin 12) → 220Ω resistor → Red LED → Ground</li>
            <li>Green LED: GPIO 19 (Pin 35) → 220Ω resistor → Green LED → Ground</li>
            <li>Blue LED: GPIO 20 (Pin 38) → 220Ω resistor → Blue LED → Ground</li>
          </ul>
          <p className="mt-2"><strong>To run:</strong> Save as <code>rgb_blinker.py</code> and run with <code>python3 rgb_blinker.py</code></p>
        </div>
      </div>
    </Card>
  );
};

export default PythonCode;