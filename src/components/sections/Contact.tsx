import { ArrowUpRight } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/darivxe',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/lekhana-priya-m/',
  },
  {
    name: 'TryHackMe',
    url: 'https://tryhackme.com/p/darivxe',
  },
  {
    name: 'Email',
    url: 'mailto:darivxeqz@gmail.com',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="section-number">05</span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mt-4 mb-8">CONTACT</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Want to collaborate, discuss cybersecurity, or just say hi? I'd love to hear from you.
            </p>

            <div className="space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Find me at
              </span>
              <div className="space-y-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3 border-b border-border hover:border-foreground transition-colors"
                  >
                    <span className="font-mono text-sm uppercase tracking-widest">
                      {link.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* PC Line Art Illustration Placeholder */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="w-80 h-80 border border-border/30 flex items-center justify-center">
              <svg 
                viewBox="0 0 200 150" 
                className="w-64 h-64 text-foreground/80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                {/* Monitor */}
                <rect x="50" y="20" width="100" height="70" rx="2" />
                <rect x="55" y="25" width="90" height="55" />
                {/* Monitor Stand */}
                <path d="M90 90 L90 105 L70 110 L130 110 L110 105 L110 90" />
                {/* Keyboard */}
                <rect x="40" y="115" width="80" height="20" rx="2" />
                <line x1="50" y1="120" x2="110" y2="120" />
                <line x1="50" y1="125" x2="110" y2="125" />
                <line x1="50" y1="130" x2="110" y2="130" />
                {/* Mouse */}
                <ellipse cx="145" cy="125" rx="12" ry="15" />
                <line x1="145" y1="115" x2="145" y2="120" />
                {/* Cable */}
                <path d="M130 110 Q 140 105 145 110" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
