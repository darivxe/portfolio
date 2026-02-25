type Props = {
  label: string;
};

const colorMap: Record<string, string> = {
  web: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  pwn: "bg-red-500/10 text-red-400 border-red-500/20",
  rev: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  crypto: "bg-green-500/10 text-green-400 border-green-500/20",
  misc: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  osint: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const ChallengeTag = ({ label }: Props) => {
  const style =
    colorMap[label.toLowerCase()] ||
    "bg-muted/40 text-foreground border-border";

  return (
    <span
      className={`inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-widest rounded-full border ${style}`}
    >
      {label}
    </span>
  );
};

export default ChallengeTag;