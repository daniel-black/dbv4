"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Label } from "./ui/label";

export function WaveshaperVariableDutyCycleSquareWaveDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Volume as 0-100 percentage
  const [dutyCycle, setDutyCycle] = useState(50); // Default to 50%
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const waveshaperRef = useRef<WaveShaperNode | null>(null);
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

  // Create square wave using waveshaper
  const createSquareWaveWithWaveshaper = (
    audioContext: AudioContext,
    frequency: number,
    dutyCycle: number
  ) => {
    // Create a sawtooth oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.frequency.value = frequency;

    // Convert duty cycle from percentage to a decimal
    const duty = dutyCycle / 100;

    // Create a waveshaper to transform the sawtooth into a square wave
    const waveshaper = audioContext.createWaveShaper();

    // Create the transfer function that shapes the wave
    const curveLength = 2048;
    const curve = new Float32Array(curveLength);

    // Create a step function at the duty cycle point
    for (let i = 0; i < curveLength; i++) {
      const x = i / (curveLength - 1); // Normalize to 0-1 range
      curve[i] = x < duty ? 1.0 : -1.0; // Step function
    }

    waveshaper.curve = curve;
    oscillator.connect(waveshaper);

    // Store the waveshaper for later reference
    waveshaperRef.current = waveshaper;

    return { oscillator, waveshaper };
  };

  const playSound = () => {
    // Initialize audio on first play
    initializeAudio();

    const audioContext = audioContextRef.current!;

    // Create square wave with current duty cycle using waveshaper
    const { oscillator, waveshaper } = createSquareWaveWithWaveshaper(
      audioContext,
      440, // A4 = 440Hz
      dutyCycle
    );

    // Connect to gain node (which connects to destination)
    waveshaper.connect(gainNodeRef.current!);
    oscillator.start();

    oscillatorRef.current = oscillator;
    setIsPlaying(true);
  };

  const stopSound = () => {
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;

      if (waveshaperRef.current) {
        waveshaperRef.current.disconnect();
        waveshaperRef.current = null;
      }

      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleDutyCycleChange = (value: string) => {
    const newDutyCycle = parseFloat(value);
    setDutyCycle(newDutyCycle);

    // If playing, update the sound immediately with the new value
    if (isPlaying && audioContextRef.current) {
      stopSound();

      // Create and play with the new duty cycle directly
      const audioContext = audioContextRef.current;
      const { oscillator, waveshaper } = createSquareWaveWithWaveshaper(
        audioContext,
        440,
        newDutyCycle // Use the new value directly instead of the state
      );
      waveshaper.connect(gainNodeRef.current!);
      oscillator.start();
      oscillatorRef.current = oscillator;
      waveshaperRef.current = waveshaper;
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-4">
      <p>
        Here is what square waves with variable duty cycles sound like when
        created with the Waveshaper approach.
      </p>

      <div className="flex items-center justify-start gap-8">
        <div>
          <h4 className="text-sm font-medium mb-3">Duty Cycle:</h4>
          <RadioGroup
            value={dutyCycle.toString()}
            onValueChange={handleDutyCycleChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12.5" id="wave-dc-12.5" />
              <Label htmlFor="wave-dc-12.5">12.5%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="25" id="wave-dc-25" />
              <Label htmlFor="wave-dc-25">25%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="50" id="wave-dc-50" />
              <Label htmlFor="wave-dc-50">50%</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="75" id="wave-dc-75" />
              <Label htmlFor="wave-dc-75">75%</Label>
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
