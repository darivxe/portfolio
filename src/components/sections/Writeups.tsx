import { Link } from "react-router-dom";

const writeups = [
  {
    id: 1,
    category: "Jeopardy",
    title: "Bearcat CTF",
    date: "21 Feb 2026",
    readTime: "10 min",
    slug: "/bcctf"
  }
];

const Writeups = () => {
  return (
    <section
      id="writeups"
      className="py-32 border-t border-border scroll-mt-20"
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="section-number">04</span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mt-4">
              WRITEUPS
            </h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            CTF
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {writeups.map((post, index) => (
            <Link
              key={post.id}
              to={post.slug}
              className="group cursor-pointer border border-border p-6 hover-invert"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-sm">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {post.category}
              </span>

              <h3 className="text-xl font-mono font-bold mt-2 mb-4 uppercase tracking-wide">
                {post.title}
              </h3>

              <div className="flex justify-between font-mono text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writeups;