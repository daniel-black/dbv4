import { CodeBlock } from "@/components/code-block";
import { FourierVariableDutyCycleSquareWaveDemo } from "@/components/fourier-variable-duty-cycle-square-wave-demo";
import { InlineCode } from "@/components/inline-code";
import { OscillatorDemo } from "@/components/oscillator-demo";
import { WaveshaperVariableDutyCycleSquareWaveDemo } from "@/components/waveshaper-variable-duty-cycle-square-wave-demo";

export default function VariableDutyCycleSquareWaveBlog() {
  return (
    <div className="space-y-5">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Creating variable duty cycle square waves with the Web Audio API
      </h1>
      <div className="flex flex-col text-muted-foreground text-xs">
        <span>Created on 4/2/2025</span>
        <span>Updated on 4/7/2025</span>
      </div>
      <p>
        Lately, I&apos;ve been playing around with the{" "}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API"
          target="_blank"
          className="text-blue-600"
        >
          Web Audio API
        </a>{" "}
        for a side project I&apos;m working on. I am building a web-based{" "}
        <a
          href="https://en.wikipedia.org/wiki/Music_tracker"
          target="_blank"
          className="text-blue-600"
        >
          music tracker software
        </a>{" "}
        for creating{" "}
        <a
          href="https://gbdev.io/pandocs/Audio.html"
          target="_blank"
          className="text-blue-600"
        >
          audio in the original style of the Gameboy.
        </a>{" "}
        To faithfully recreate the sounds of the Gameboy, I need variable duty
        cycle square waves.
      </p>
      <p>
        The iconic 8-bit, chiptune style of music is heavily reliant on square
        waves. The Web Audio API allows you to create{" "}
        <InlineCode code="OscillatorNode" />s that represent periodic waveforms
        like a sine, sawtooth, triangle, or square waves.
      </p>
      <CodeBlock>{`
~~~ts
const ctx = new AudioContext();

const osc = new OscillatorNode(ctx, {
  type: "square",
});
~~~
      `}</CodeBlock>
      <OscillatorDemo />
      <p>
        Not the most pleasant musical thing you&apos;ve ever heard but you get
        the gist.
      </p>
      <p>
        Seems like we have our square wave, pretty easy right? Unfortunately no,
        not quite. Oscillators with the type &quot;square&quot; only allow for a
        duty cycle of 50%. This means that for one cycle, the wave is high for
        half the time and low for the other half.
      </p>
      <p>
        One of the neat things about the Gameboy was that its two pulse channels
        allowed for variable duty cycles. Specifically, the duty cycle could be
        set to 12.5%, 25%, 50% or 75%. This allowed game developers to create
        richer, more textured sounds for their games.
      </p>
      <p>
        To get around this 50%-duty-cycle limitation of the Web Audio API, I had
        to find a way to create square waves from a different type of periodic
        waveform.
      </p>
      <p>
        We have a couple of options. One approach is to use the Fourier Series.
        Another is to use a <InlineCode code="WaveShaperNode" /> to bend a
        sawtooth wave into the desired duty cycle square wave. First, let&apos;s
        take a look at the Fourier Series.
      </p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        The Fourier Series Approach
      </h3>
      <p>
        In short, the Fourier Series is a way to represent a periodic function
        or waveform as an infinite sum of sines and cosines. It is like building
        up waves from harmonics like lego bricks. Basically, we can do a little
        bit of math to create a periodic waveform that we can shape an{" "}
        <InlineCode code="OscillatorNode" />
        &apos;s output with. The Web Audio API exposes a function on the{" "}
        <InlineCode code="AudioContext" /> that we can use to create a periodic
        waveform from a set of Fourier coefficients. This is how that looks.
      </p>
      <CodeBlock>
        {`
~~~ts
// Create your audio context & oscillator
const ctx = new AudioContext();
const osc = new OscillatorNode(ctx);
osc.frequency.value = 440; // A4 = 440Hz

// Configure your desired duty cycle & number of harmonics
const dutyCycle = 0.25;
const harmonics = 64; // More harmonics = more accurate square wave

// Create arrays for real and imaginary parts of Fourier coefficients
const real = new Float32Array(harmonics);
const imag = new Float32Array(harmonics);

// DC offset (average value based on duty cycle)
real[0] = 2 * dutyCycle - 1;
imag[0] = 0;

// Calculate harmonic amplitudes for desired duty cycle
for (let n = 1; n < harmonics; n++) {
    // Cosine terms are zero for square waves
    real[n] = 0;

    // Sine terms follow this formula for duty cycle D:
    imag[n] = (2 / (n * Math.PI)) * Math.sin(n * dutyCycle * Math.PI * 2);
}

// Create a periodic wave from our Fourier coefficients
const wave = ctx.createPeriodicWave(real, imag, {
    disableNormalization: false
});

// Set the oscillator to use our custom wave
osc.setPeriodicWave(wave);
~~~`}
      </CodeBlock>
      <p>
        Now we have a square wave oscillator with a duty cycle of 25% or
        whatever we would like to set it as.
      </p>
      <FourierVariableDutyCycleSquareWaveDemo />
      <p>
        This approach is a little more math heavy than the next - the next
        method is a little bit more intuitive to grasp.
      </p>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        The WaveShaper Approach
      </h3>
      <p>
        The Web Audio API provides us with a way to distort signals. This is the{" "}
        <InlineCode code="WaveShaperNode" />. When creating audio with the Web
        Audio API, you connect audio nodes in a graph. Typically it will be
        something like this:
      </p>
      <div>
        <InlineCode code="OscillatorNode" /> → <InlineCode code="GainNode" /> →{" "}
        <InlineCode code="AudioDestinationNode" />
      </div>
      <p>
        The <InlineCode code="WaveShaperNode" /> lets us transform the output
        from something like an <InlineCode code="OscillatorNode" />. We can do a
        fun little thing with a sawtooth wave where we create a step function to
        bracket the value to either 0 or 1 depending on where it falls in
        relation to the duty cycle point.
      </p>
      <CodeBlock>{`
~~~ts
const ctx = new AudioContext();
const osc = new OscillatorNode(ctx, {
  type: "sawtooth",
});

const dutyCycle = 0.125;

// Create the waveshaper
const waveShaper = new WaveShaperNode(ctx);

// Create the transfer function that shapes the wave
const curveLength = 2048;
const curve = new Float32Array(curveLength);

// The magic happens here - create a step function at the duty cycle point
for (let i = 0; i < curveLength; i++) {
    const x = i / (curveLength - 1);  // Normalize to 0-1 range
    curve[i] = x < dutyCycle ? 1.0 : -1.0; // Step function
}

waveShaper.curve = curve;
oscillator.connect(waveShaper);
~~~
      `}</CodeBlock>
      <p>
        From here, we can connect the <InlineCode code="waveShaper" /> to an
        output node and now we have a square wave of whatever duty cycle we
        like. I prefer this approach because of how simple and easy it is to
        grasp.
      </p>
      <WaveshaperVariableDutyCycleSquareWaveDemo />
      <p>
        You might notice that the square waves created with the Waveshaper
        approach sound &quot;buzzier&quot; than the Fourier Series approach.
        This is because the Waveshaper approach creates an almost mathematically
        perfect square wave with extremely sharp transitions.
      </p>
      <p>
        There are pros and cons to each approach. One of the cons of the Fourier
        Series approach is that you need a lot of harmonics for it to sound
        decent, which is costly in CPU cycles. This is especially true if your
        application supports any duty cycle between 0% and 100% and calculates
        the curve on the fly. The nice thing about the music tracker software
        that I am working on is that I only need to support four duty cycles so
        I can compute my waveShaper curves once ahead of time and reuse them
        throughout the application. One of the downsides of the Waveshaper
        approach is that you start running into aliasing and buzziness.
      </p>
      <p>
        For my purposes, the Waveshaper approach is my preferred method. I like
        the simplicity of it and I also believe that it creates a more authentic
        Gameboy sound. This is just the tip of the iceberg as it relates to the
        Web Audio API - I really do think there is a lot of potential for
        building cool things with this tool and more devs should check it out.
      </p>
    </div>
  );
}
