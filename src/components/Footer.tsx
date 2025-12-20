import { useState, useEffect, useRef } from 'react';

const chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?';
const targetText = "uh-oh, you've reached the end of the page";

const Footer = () => {
  const [scrambledText, setScrambledText] = useState(targetText);
  const [hasAnimated, setHasAnimated] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let iteration = 0;
          const maxIterations = 25;

          const scrambleInterval = setInterval(() => {
            setScrambledText(
              targetText
                .split('')
                .map((char, index) => {
                  if (char === ' ' || char === "'" || char === ',') return char;
                  if (iteration > index * 0.6) {
                    return targetText[index];
                  }
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('')
            );

            iteration += 1;

            if (iteration > maxIterations) {
              clearInterval(scrambleInterval);
              setScrambledText(targetText);
            }
          }, 40);
        }
      },
      { threshold: 0.5 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer ref={footerRef} className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-sm uppercase tracking-widest">
            darivxe
          </span>

          {/* Clickable scrambled text */}
          <button
            onClick={scrollToTop}
            className="font-mono text-xs text-muted-foreground text-center min-w-[300px] hover:text-foreground transition-colors cursor-pointer"
          >
            {scrambledText}
          </button>

          <p className="font-mono text-xs text-muted-foreground">© 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
