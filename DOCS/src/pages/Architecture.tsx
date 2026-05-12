import 'react';

const Architecture = () => {
  return (
    <article className="prose prose-slate max-w-none">
      <div className="mb-8 md:mb-12">
        <h1 className="tracking-tight">Core Architecture & System Design</h1>
        <p className="lead text-slate-600 border-l-4 border-primary-500 pl-4 md:pl-6 py-2 bg-slate-50/50 rounded-r-lg italic">
          This section provides an exhaustive technical breakdown of the ESECURE stack. We will examine the 
          rationale behind every library, the lifecycle of a request, and the specific algorithms employed to 
          extract, parse, and analyze legal text.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-slate-900">1. The Backend Engine (Python / Flask)</h2>
        <p>
          The backend is the beating heart of ESECURE. Built on Python 3.10+, it leverages Flask to expose a 
          RESTful API. 
        </p>
        
        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-6 my-8 shadow-sm">
          <h3 className="mt-0 font-bold">Why Flask over Django or FastAPI?</h3>
          <p className="mb-0 text-slate-600">
            While FastAPI offers native asynchronous support, the core bottleneck in our application is the network 
            call to the Google Gemini API, which takes roughly 2-5 seconds regardless of the web framework. Flask's 
            simplicity, massive ecosystem, and minimal boilerplate made it the optimal choice for a stateless microservice. 
            It allows us to deploy rapidly on Render using standard WSGI servers like Gunicorn.
          </p>
        </div>

        <h3 className="font-bold">Intelligent Web Scraping (BeautifulSoup4)</h3>
        <p>
          Legal documents are rarely cleanly formatted. They are hidden behind complex DOM structures, popups, and 
          unrelated navigational elements. 
        </p>
        <div className="relative group my-6">
          <pre className="!mt-0 overflow-x-auto shadow-lg rounded-xl"><code>{`def scrape_terms_from_url(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Heuristic DOM Selection
    selectors = ["article", "main", ".terms", "#terms", ".policy", "#policy", ".content", "body"]
    ...`}</code></pre>
        </div>
        <p>
          The algorithm utilizes <strong>Heuristic DOM Selection</strong>. Instead of blindly extracting <code>body</code> text, 
          it iterates through a prioritized list of semantic HTML tags and common CSS classes (<code>.terms</code>, <code>#policy</code>). 
          If it finds a container with more than 400 characters, it assumes it has located the primary legal payload.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-slate-900">2. The Artificial Intelligence Layer (Gemini)</h2>
        <p>
          The integration with <code>google.generativeai</code> represents the most complex engineering challenge in the project: 
          <strong>Deterministic Output from a Probabilistic Model</strong>.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 my-10 not-prose">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="mt-0 text-base md:text-lg font-bold text-slate-900 mb-2">Strict Prompt Engineering</h3>
            <p className="text-[11px] md:text-sm text-slate-600 mb-4">
              LLMs inherently want to be conversational. Our system prompt strictly enforces an output schema to ensure API reliability:
            </p>
            <div className="bg-slate-900 text-green-400 p-3 md:p-4 rounded-lg text-[10px] md:text-xs font-mono overflow-x-auto shadow-inner">
              "Output in *exactly* this order:<br/>
              Safety Score: X/100<br/>
              Summary: [your one-line summary]<br/>
              Risky Clauses:<br/>
              - [bullet 1]<br/>
              ..."
            </div>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm">
            <h3 className="mt-0 text-base md:text-lg font-bold text-slate-900 mb-2">Regex Score Extraction</h3>
            <p className="text-[11px] md:text-sm text-slate-600 mb-4">
              Even with strict prompting, LLMs can hallucinate formatting. We use Regular Expressions to reliably extract the mathematical metric.
            </p>
            <div className="p-3 md:p-4 bg-primary-50 border border-primary-100 rounded-lg">
              <code className="text-[10px] md:text-xs text-primary-700 font-bold block break-all">
                re.search(r'Safety Score:\s*(\d+)', ai_output)
              </code>
              <p className="text-[10px] text-primary-600 mt-3 mb-0 italic">This ensures the core safety score is always successfully parsed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-slate-900">3. Security & Rate Limiting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 not-prose">
          <div className="p-4 md:p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h4 className="mt-0 text-slate-900 font-bold flex items-center gap-2 mb-2 text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Flask-Limiter
            </h4>
            <p className="text-xs md:text-sm text-slate-600 mb-0 leading-relaxed">We restrict requests to <code>5 per minute</code> per IP. This blocks automated bots trying to exhaust our Gemini API quota.</p>
          </div>
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <h4 className="mt-0 text-slate-900 font-bold flex items-center gap-2 mb-2 text-sm md:text-base">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              X-Access-Token
            </h4>
            <p className="text-xs md:text-sm text-slate-600 mb-0 leading-relaxed">A static bearer token is injected into headers by the extension, providing a barrier against unauthorized API discovery.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-slate-900">4. The Client (React Extension)</h2>
        <p>
          The frontend is built using React and compiled via Vite. By utilizing the <code>chrome.tabs</code> API, the extension 
          can automatically inject the active tab's URL into the payload, creating a "one-click" user experience. State management 
          is handled natively via React Hooks, ensuring that the UI perfectly maps to the API's pending, success, and error states.
        </p>
      </section>
    </article>
  );
};

export default Architecture;
