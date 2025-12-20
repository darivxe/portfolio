import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showSubtext, setShowSubtext] = useState(false);
  const [scrambledText, setScrambledText] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const [scrambleComplete, setScrambleComplete] = useState(false);
  const [helloItalic, setHelloItalic] = useState(false);

  const fullText = 'hello, visitor!';
  const targetName = 'darivxe';

  // Typing animation (NORMAL text)
  useEffect(() => {
    let currentIndex = 0;

    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextChar, 100);
      } else {
        setTimeout(() => {
          setShowSubtext(true);
          setIsScrambling(true);
        }, 400);
      }
    };

    const startDelay = setTimeout(typeNextChar, 500);
    return () => clearTimeout(startDelay);
  }, []);

  // Scramble animation
  useEffect(() => {
    if (!isScrambling) return;

    let iteration = 0;
    const maxIterations = 15;

    const scrambleInterval = setInterval(() => {
      setScrambledText(
        targetName
          .split('')
          .map((_, index) =>
            iteration > index * 2
              ? targetName[index]
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join('')
      );

      iteration++;

      if (iteration > maxIterations) {
        clearInterval(scrambleInterval);
        setScrambledText(targetName);
        setScrambleComplete(true);

        // 👇 switch hello to italic AFTER everything appears
        setTimeout(() => setHelloItalic(true), 300);
      }
    }, 50);

    return () => clearInterval(scrambleInterval);
  }, [isScrambling]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden pt-14">
      {/* Noise background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="flex-1" />

      {/* Main content */}
      <div className="relative z-10 text-center">
        <h1
          className={`
            font-terminal text-3xl md:text-4xl lg:text-5xl tracking-wide
            drop-shadow-[0_0_25px_hsl(var(--foreground)/0.5)]
            transition-all duration-700
            ${helloItalic ? 'italic' : 'not-italic'}
          `}
        >
          {displayText}
          <span
            className={`ml-1 inline-block font-terminal transition-opacity duration-75 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          >
            |
          </span>
        </h1>

        {/* darivxe — slow fade-in + scramble */}
        <p
          className={`
            mt-6 font-mono text-xs tracking-[0.2em] text-muted-foreground italic
            transition-opacity duration-1000 ease-out
            ${showSubtext ? 'opacity-100' : 'opacity-0'}
            ${scrambleComplete ? 'animate-flicker' : ''}
          `}
        >
          {scrambledText || '\u00A0'}
        </p>
      </div>

      <div className="flex-1" />

      {/* Scroll indicator */}
      <div
        className={`relative z-10 pb-8 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-700 ${
          scrambleComplete ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={scrollToAbout}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollToAbout()}
      >
        <span className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
          SCROLL TO EXPLORE
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground animate-bounce-slow" />
      </div>
    </section>
  );
};

export default Hero;

