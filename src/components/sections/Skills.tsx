import { useState } from 'react';

const skillsData = {
  sec: {
    title: 'security toolkit',
    coreSkills: [
      'Web Application Security Testing',
      'OSINT & IMINT Investigations',
      'Digital Forensics & Traffic Analysis',
      'Steganography & Data Extraction',
    ],
    tooling: [
      { category: 'Network Analysis', tools: 'Wireshark, Proxyman, mitmproxy' },
      { category: 'Reconnaissance', tools: 'Nmap, subfinder, httpx, SpiderFoot, Sherlock' },
      { category: 'Vulnerability & Exploitation', tools: 'Nessus, Metasploit' },
      { category: 'Reverse Engineering', tools: 'IDA Pro' },
    ],
    frameworks: [
      'MITRE ATT&CK',
      'Threat Modeling & Kill Chain Analysis',
    ],
  },
  dev: {
    title: 'dev toolkit',
    coreSkills: [
      'Python',
      'C',
      'Bash Scripting',
      'C#',
    ],
    tooling: [
      { category: 'Web & Frontend', tools: 'HTML/CSS, JavaScript' },
      { category: 'Databases', tools: 'MongoDB' },
      { category: 'DevOps', tools: 'Docker, Git' },
    ],
    frameworks: [
      'MacOS',
      'Kali Linux',
      'Parrot OS',
      'Ubuntu',
      'Windows',
    ],
  },
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState<'sec' | 'dev'>('sec');
  const data = skillsData[activeTab];

  return (
    <section id="skills" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <span className="section-number">02</span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mt-4">SKILLS</h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto">
          <div className="flex">
            <button
              onClick={() => setActiveTab('sec')}
              className={`relative px-6 py-3 font-mono text-sm transition-all duration-300 ${
                activeTab === 'sec'
                  ? 'bg-foreground text-background z-10'
                  : 'bg-muted/30 text-muted-foreground hover:text-foreground'
              }`}
              style={{
                clipPath: activeTab === 'sec'
                  ? 'polygon(0px 100%, 8px 0px, 100% 0px, 100% 100%)'
                  : 'polygon(0px 100%, 8px 0px, calc(100% - 8px) 0px, 100% 100%)',
                marginRight: '-4px',
              }}
            >
              <span className="text-xs mr-2 text-background/60">01</span>
              security toolkit
            </button>
            <button
              onClick={() => setActiveTab('dev')}
              className={`relative px-6 py-3 font-mono text-sm transition-all duration-300 ${
                activeTab === 'dev'
                  ? 'bg-foreground text-background z-10'
                  : 'bg-muted/30 text-muted-foreground hover:text-foreground'
              }`}
              style={{
                clipPath: 'polygon(0px 100%, 8px 0px, calc(100% - 8px) 0px, 100% 100%)',
              }}
            >
              <span className={`text-xs mr-2 ${activeTab === 'dev' ? 'text-background/60' : 'text-muted-foreground'}`}>02</span>
              dev toolkit
            </button>
          </div>

          {/* Content */}
          <div className="border border-foreground/20 bg-foreground text-background p-8 font-mono text-sm">
            <div className="space-y-6 animate-fade-in" key={activeTab}>
              {/* Core Skills */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-background/60 mb-3">Core Skills</h4>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {data.coreSkills.map((skill, index) => (
                    <span key={index} className="text-background flex items-center gap-2">
                      {skill}
                      <span className="text-background/30 hidden sm:inline">|</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="w-full border-t border-dashed border-background/30 my-4"></div>

              {/* Security Tooling / Dev Tooling */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-background/60 mb-3">
                  {activeTab === 'sec' ? 'Security Tooling' : 'Development Tools'}
                </h4>
                <div className="space-y-2">
                  {data.tooling.map((item, index) => (
                    <p key={index} className="text-background">
                      <span className="text-background/60">
                        {item.category}:
                      </span>{' '}
                      <span>{item.tools}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="w-full border-t border-dashed border-background/30 my-4"></div>

              {/* Frameworks & Methodologies */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-background/60 mb-3">
                  {activeTab === 'sec' ? 'Frameworks & Methodologies' : 'Operating Systems'}
                </h4>
                <div className="flex flex-wrap gap-x-6 gap-y-1">
                  {data.frameworks.map((item, index) => (
                    <span key={index} className="text-background flex items-center gap-2">
                      {item}
                      <span className="text-background/30 hidden sm:inline">|</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
