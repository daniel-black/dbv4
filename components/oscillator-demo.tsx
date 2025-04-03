"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { PauseIcon, PlayIcon } from "lucide-react";

export function OscillatorDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Volume as 0-100 percentage
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

  const playSound = () => {
    // Initialize audio on first play
    initializeAudio();

    const audioContext = audioContextRef.current!;

    // Create and configure oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = "square"; // Square wave
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 = 440Hz

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

  return (
    <div className="space-y-4">
      <p>Here is what an A4 sounds like with a 50% duty cycle square wave:</p>

      <div className="flex items-center justify-center gap-8">
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
