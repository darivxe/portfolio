const Experience = () => {
  return (
    <section id="experience" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Section Label */}
        <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-8">
          Experience
        </h3>

        {/* Experience Card */}
        <div
          className="
            border border-border p-6 md:p-8 font-mono
            transition-all duration-300 hover:scale-[1.01]

            bg-card text-foreground
            hover:bg-foreground hover:text-background

            dark:bg-foreground dark:text-background
            dark:hover:bg-card dark:hover:text-foreground
          "
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h4 className="text-lg md:text-xl font-bold uppercase tracking-wide">
                Vocational OSINT Researcher
              </h4>
              <p className="mt-1 text-muted-foreground">
                Deveilliance
              </p>
            </div>

            <div className="mt-2 md:mt-0 md:text-right text-sm text-muted-foreground">
              <p>July 2025 — Dec 2025</p>
              <p>[Remote]</p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-dashed border-border/60 mb-6"></div>

          {/* Highlights */}
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <span className="text-foreground">→</span>
              <span>
                Conducted open-source intelligence investigations including spyware market analysis and corporate technology footprint mapping
              </span>
            </li>

            <li className="flex gap-3">
              <span className="text-foreground">→</span>
              <span>
                Produced professional intelligence reports with hypothesis testing and threat-actor contextualization
              </span>
            </li>

            <li className="flex gap-3">
              <span className="text-foreground">→</span>
              <span>
                Utilized archival searches, CSEs, metadata extractors, dark web indexing, and geolocation services
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
