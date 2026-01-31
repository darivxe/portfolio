const blogPosts = [
  {
    id: 1,
    category: "Bug Bounty",
    title: "How I Broke a Realtime Editor's WebSocket Authentication",
    date: "Nov 21, 2025",
    readTime: "3 min",
    url: "https://medium.com/@darivxe/how-i-broke-a-realtime-editors-websocket-authentication-b3cf6dffd380"
  },
  {
    id: 2,
    category: "Learning",
    title: "The Less I Know The Better",
    date: "Jan 30, 2026",
    readTime: "2 min",
    url: "https://medium.com/@darivxe/the-less-i-know-the-better-124f7cb99d94"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="section-number">04</span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold mt-4">BLOG</h2>
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Research & Notes
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
