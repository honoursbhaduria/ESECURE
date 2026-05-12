const Overview = () => {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>ESECURE Documentation</h1>
      <p className="lead">
        Welcome to the definitive guide for ESECURE, a cutting-edge, AI-driven legal analysis engine. 
        This documentation is crafted to provide an exhaustive, meticulous breakdown of every component, 
        design decision, and workflow present in the ESECURE ecosystem.
      </p>

      <h2>The Problem Space: Legal Obfuscation</h2>
      <p>
        In the digital age, users are subjected to an overwhelming volume of complex legal contracts—specifically, 
        Terms of Service (ToS) and Privacy Policies. According to recent studies, it would take the average user 
        over 76 working days per year to read every privacy policy they encounter. Consequently, users simply click 
        "I Agree," unknowingly consenting to pervasive data brokering, forced arbitration clauses, waiver of class-action 
        rights, and obscure liability limitations.
      </p>
      <p>
        Traditional methods of addressing this involve crowdsourced databases (like "Terms of Service; Didn't Read"). 
        While noble, these methods cannot keep pace with the dynamic, rapidly updating nature of the web. A scalable, 
        automated, and highly intelligent solution was required.
      </p>

      <h2>The ESECURE Solution</h2>
      <p>
        ESECURE bridges this gap by deploying Large Language Models (LLMs) directly into the user's browser workflow. 
        It operates on a hybrid architecture:
      </p>
      <ul>
        <li><strong>The Client (Chrome Extension):</strong> A lightweight, highly optimized React/TypeScript application that lives in the browser, capable of detecting the active context and requesting analysis with zero user friction.</li>
        <li><strong>The API (Python/Flask):</strong> A robust, stateless backend that acts as the orchestration layer between the client, web scraping utilities, and the Google Gemini Generative AI.</li>
        <li><strong>The Brain (Gemini 2.0 Flash):</strong> An advanced LLM with a massive context window capable of ingesting entire legal documents in a single pass, outputting deterministic risk assessments.</li>
      </ul>

      <h3>Why This Paradigm Works</h3>
      <p>
        By separating the orchestration (Flask) from the UI (React), we achieve several architectural guarantees. 
        First, API keys and AI interaction logic are entirely hidden from the client, preventing quota theft. Second, 
        the scraping logic runs server-side, bypassing client-side CORS restrictions that normally prevent an extension 
        from reading arbitrary DOMs across different domains efficiently.
      </p>

      <hr />

      <h2>Navigating This Manual</h2>
      <p>
        This documentation is categorized to serve different stakeholders:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose my-8">
        <a href="/architecture" className="block p-6 bg-white border border-slate-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all">
          <h3 className="text-lg font-bold text-slate-900 mb-2">System Design</h3>
          <p className="text-sm text-slate-600">Deep dive into the underlying architecture, scraping algorithms, and AI prompt engineering.</p>
        </a>
        <a href="/docs-guide" className="block p-6 bg-white border border-slate-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Docs Engineering</h3>
          <p className="text-sm text-slate-600">Learn how this incredibly detailed documentation site was built and how you can contribute to it.</p>
        </a>
      </div>
    </article>
  );
};

export default Overview;
