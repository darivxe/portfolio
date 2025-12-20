import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const projects = [
  {
    id: 1,
    title: 'Commercial Spyware Ecosystem Analysis',
    description:
      'A comprehensive intelligence-led study of the global commercial spyware market, examining vendor operations, documented misuse cases, and resulting legal and regulatory responses.',
    tags: ['Threat Intelligence', 'OSINT', 'Policy Impact'],
    category: 'Threat Intelligence',
    year: '2025',
    highlights: [
      'Mapped major commercial spyware vendors and suppliers',
      'Analyzed high-profile abuse cases using public forensic disclosures',
      'Assessed corporate, geopolitical, and legal consequences',
      'Produced a structured intelligence report using OSINT methodologies',
    ],
  },
  {
    id: 2,
    title: 'Technology Footprint Analysis: Cloudflare',
    description:
      "An investigation into Cloudflare's publicly observable infrastructure, technology stack, partnerships, and security posture, based entirely on open-source intelligence.",
    tags: ['OSINT', 'Infra Intelligence', 'Cloud Security'],
    category: 'Technology Footprint',
    year: '2025',
    highlights: [
      "Mapped Cloudflare's publicly observable global infrastructure and service footprint",
      'Analyzed DNS, certificate transparency, routing, and metadata to infer architectural patterns',
      'Correlated open-source data including job postings, documentation, and incident disclosures',
      'Produced a structured OSINT report following responsible intelligence methodologies',
    ],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] =
    useState<(typeof projects)[0] | null>(null);

  return (
    <section id="projects" className="section-container py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="section-number">03</span>
            <h2 className="text-3xl md:text-4xl font-mono font-bold uppercase tracking-widest mt-3">
              Projects
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {projects.length} Works
          </span>
        </div>

        {/* Project List */}
        <div>
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group border-b border-border py-6 cursor-pointer hover:bg-card/40 transition-colors px-4 -mx-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left Side */}
                <div className="flex items-start gap-5">
                  <span className="font-mono text-xs text-muted-foreground pt-1">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-mono font-bold uppercase tracking-[0.12em] group-hover:text-outline transition-all">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-muted-foreground mt-1.5 max-w-md leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex gap-3 mt-3 flex-wrap">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6 justify-center md:justify-end w-full md:w-auto mt-2 md:mt-0">
                  <div className="text-center md:text-right">
                    <span className="font-mono text-xs text-muted-foreground block">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {project.year}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            More projects coming soon...
          </span>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="bg-card/80 backdrop-blur-xl border border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-mono text-sm font-bold uppercase tracking-widest">
              Highlights of the Research
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            <ul className="space-y-3">
              {selectedProject?.highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="text-foreground mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
