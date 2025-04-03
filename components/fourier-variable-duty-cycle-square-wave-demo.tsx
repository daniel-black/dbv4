"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Label } from "./ui/label";

export function FourierVariableDutyCycleSquareWaveDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Volume as 0-100 percentage
  const [dutyCycle, setDutyCycle] = useState(50); // Default to 50%
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Clean up audio resources when component unmounts
  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Initialize AudioContext and GainNode
  const initializeAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();

      // Create gain node
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = volume / 100; // Convert percentage to 0-1 range
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
  };

  // Update gain value when volume changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume / 100;
    }
  }, [volume]);

  // Function to create square wave using Fourier series
  const createSquareWaveWithFourier = (
    audioContext: AudioContext,
    frequency: number,
    dutyCycle: number
  ) => {
    const oscillator = audioContext.createOscillator();

    // Convert duty cycle from percentage to decimal
    const duty = dutyCycle / 100;

    // Set up Fourier coefficients
    const harmonics = 64; // More harmonics = sharper edges
    const real = new Float32Array(harmonics);
    const imag = new Float32Array(harmonics);

    // DC offset (average value based on duty cycle)
    real[0] = 2 * duty - 1;
    imag[0] = 0;

    // Calculate harmonic amplitudes for desired duty cycle
    for (let n = 1; n < harmonics; n++) {
      real[n] = 0; // Cosine terms are zero for square waves
      // Sine terms follow this formula for duty cycle D:
      imag[n] = (2 / (n * Math.PI)) * Math.sin(n * duty * Math.PI * 2);
    }

    // Create a periodic wave from our Fourier coefficients
    const wave = audioContext.createPeriodicWave(real, imag, {
      disableNormalization: false,
    });

    oscillator.setPeriodicWave(wave);
    oscillator.frequency.value = frequency;

    return oscillator;
  };

  const playSound = () => {
    // Initialize audio on first play
    initializeAudio();

    const audioContext = audioContextRef.current!;

    // Create square wave with current duty cycle using Fourier series
    const oscillator = createSquareWaveWithFourier(
      audioContext,
      440,
      dutyCycle
    );

    // Connect to gain node (which connects to destination)
    oscillator.connect(gainNodeRef.current!);
    oscillator.start();

    oscillatorRef.current = oscillator;
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleDutyCycleChange = (value: string) => {
    const newDutyCycle = parseFloat(value);
    setDutyCycle(newDutyCycle);

    // If playing, update the sound immediately
    if (isPlaying && audioContextRef.current) {
      stopSound();
      playSound();
    }
  };

  return (
    <div className="space-y-4">
      <p>
        Here is what square waves with variable duty cycles sound like when
        created with the Fourier Series approach.
      </p>

      <div className="flex items-center justify-start gap-8">
        <div>
          <h4 className="text-sm font-medium mb-3">Duty Cycle:</h4>
          <RadioGroup
            value={dutyCycle.toString()}
            onValueChange={handleDutyCycleChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12.5" id="fourier-dc-12.5" />
              <Label htmlFor="fourier-dc-12.5">12.5%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="25" id="fourier-dc-25" />
              <Label htmlFor="fourier-dc-25">25%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="50" id="fourier-dc-50" />
              <Label htmlFor="fourier-dc-50">50%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="75" id="fourier-dc-75" />
              <Label htmlFor="fourier-dc-75">75%</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-x-1">
          <Button onClick={playSound} disabled={isPlaying} size="icon">
            <PlayIcon className="h-4 w-4" />
          </Button>
          <Button onClick={stopSound} disabled={!isPlaying} size="icon">
            <PauseIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 w-44">
          <div className="flex justify-between text-xs text-muted-foreground">
            <label htmlFor="volume">Volume:</label>
            <span>{volume}%</span>
          </div>
          <Slider
            id="volume"
            min={0}
            max={100}
            step={1}
            defaultValue={[50]}
            value={[volume]}
            onValueChange={handleVolumeChange}
            disabled={false}
            aria-label="Volume"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
