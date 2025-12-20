const About = () => {
  return (
    <section id="about" className="py-20 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="relative max-w-6xl mx-auto border border-border bg-foreground text-background overflow-hidden">
          
          {/* Inset dashed border */}
          <div className="absolute inset-3 border border-dashed border-background/30 pointer-events-none" />

          {/* Header */}
          <div className="relative flex justify-between items-center px-6 py-3 border-b border-dashed border-background/30">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-background/60" />
                <span className="font-mono text-xs">01</span>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest">
                About
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-background" />
              <span className="font-mono text-xs uppercase tracking-widest">
                Cyber Security
              </span>
              <span className="w-2 h-2 bg-background" />
            </div>
          </div>

          {/* Content Grid */}
          <div className="relative grid lg:grid-cols-2 gap-6 p-6 md:p-8">
            
            {/* Left Column */}
            <div className="space-y-5">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold leading-none tracking-tight">
                DARIVXE
              </h2>

              {/* Role (static, no animation) */}
              <div className="flex items-center gap-3">
                <span className="text-background/40">&lt;</span>
                <span className="text-sm font-mono italic text-background/80">
                  security researcher
                </span>
                <span className="text-background/40">&gt;</span>
              </div>

              {/* Terminal box */}
              <div className="border border-background/30 p-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-background/60">
                  <span>$</span>
                  <span>cat focus.txt</span>
                </div>
                <div className="mt-2 space-y-1 text-background/80">
                  <p>→ SaaS Security</p>
                  <p>→ Web Vulnerabilities</p>
                  <p>→ OSINT Investigations</p>
                  <p>→ Responsible Disclosure</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center space-y-4">
              <p className="font-mono text-xs md:text-sm leading-normal">
                I'm a cybersecurity researcher driven by curiosity about how systems work and how they fail.
              </p>

              <p className="font-mono text-xs md:text-sm leading-normal opacity-80">
                I focus on SaaS security, web vulnerabilities, and OSINT-driven investigations. I enjoy dissecting protocols, breaking assumptions, and turning complex findings into clear, structured technical reports.
              </p>

              <p className="font-mono text-xs md:text-sm leading-normal opacity-60">
                When I'm not testing systems or chasing bugs, I document what I learn and explore emerging technologies to sharpen my understanding of real-world security.
              </p>
            </div>
          </div>

          {/* Vertical sidebar */}
          <div className="hidden lg:flex absolute right-0 top-0 bottom-0 w-10 items-center justify-center border-l border-dashed border-background/30">
            <span className="font-mono text-xs uppercase tracking-widest transform -rotate-90 whitespace-nowrap">
              darivxe.sh
            </span>
          </div>

          {/* Footer */}
          <div className="relative flex flex-col md:flex-row justify-between items-center px-6 py-3 border-t border-dashed border-background/30 gap-2">
            <span className="font-mono text-xs uppercase tracking-widest">
              Currently based in
            </span>
            <span className="font-mono text-xs">
              Vizag, IN
            </span>
            <span className="hidden md:block w-2 h-2 bg-background" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
