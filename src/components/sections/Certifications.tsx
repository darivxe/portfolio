import { ArrowUpRight } from 'lucide-react';

const Certifications = () => {
  return (
    <section id="certifications" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-8">Certifications</h3>
        <div className="border border-border bg-card text-foreground p-8 font-mono text-sm transition-colors duration-300 hover:bg-foreground hover:text-background group/card">
          <div className="text-center pb-4 mb-4">
            <p className="font-bold tracking-widest">CERTIFICATIONS</p>
          </div>
          <div className="border-t border-dashed border-border group-hover/card:border-background/30 transition-colors mb-4"></div>
          <a
            href="https://storage.googleapis.com/cyber-platform-prod.appspot.com/milestone-certificates/GdnFtVlDAcaZcYIp85qp9kaWhy72-mois-certified-osint-expert.png?timestamp=1766090023871"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-2 -mx-4 px-4 group hover:bg-muted/20 group-hover/card:hover:bg-background/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground group-hover/card:text-background/60 transition-colors">01</span>
              <span className="group-hover:underline">MOIS – Certified OSINT Expert</span>
            </div>
            <span className="flex items-center gap-2 text-xs">
              [VERIFIED]
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
          </a>
          <div className="border-t border-dashed border-border group-hover/card:border-background/30 transition-colors mt-4 mb-4"></div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground group-hover/card:text-background/60 transition-colors">CLICK TO VERIFY</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
