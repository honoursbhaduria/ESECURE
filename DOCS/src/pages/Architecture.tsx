const Architecture = () => {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <h1>Core Architecture & System Design</h1>
      <p className="lead">
        This section provides an exhaustive technical breakdown of the ESECURE stack. We will examine the 
        rationale behind every library, the lifecycle of a request, and the specific algorithms employed to 
        extract, parse, and analyze legal text.
      </p>

      <h2>1. The Backend Engine (Python / Flask)</h2>
      <p>
        The backend is the beating heart of ESECURE. Built on Python 3.10+, it leverages Flask to expose a 
        RESTful API. 
      </p>
      <h3>Why Flask over Django or FastAPI?</h3>
      <p>
        While FastAPI offers native asynchronous support, the core bottleneck in our application is the network 
        call to the Google Gemini API, which takes roughly 2-5 seconds regardless of the web framework. Flask's 
        simplicity, massive ecosystem, and minimal boilerplate made it the optimal choice for a stateless microservice. 
        It allows us to deploy rapidly on Render using standard WSGI servers like Gunicorn.
      </p>

      <h3>Intelligent Web Scraping (BeautifulSoup4)</h3>
      <p>
        Legal documents are rarely cleanly formatted. They are hidden behind complex DOM structures, popups, and 
        unrelated navigational elements. 
      </p>
      <pre><code>{`def scrape_terms_from_url(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers, timeout=10)
    soup = BeautifulSoup(response.text, "html.parser")
    
    # Heuristic DOM Selection
    selectors = ["article", "main", ".terms", "#terms", ".policy", "#policy", ".content", "body"]
    ...`}</code></pre>
      <p>
        The algorithm utilizes <strong>Heuristic DOM Selection</strong>. Instead of blindly extracting <code>body</code> text, 
        it iterates through a prioritized list of semantic HTML tags and common CSS classes (<code>.terms</code>, <code>#policy</code>). 
        If it finds a container with more than 400 characters, it assumes it has located the primary legal payload, stripping out 
        headers, footers, and sidebars. This reduces the token payload sent to Gemini, lowering costs and increasing inference accuracy.
      </p>

      <h2>2. The Artificial Intelligence Layer (Gemini)</h2>
      <p>
        The integration with <code>google.generativeai</code> represents the most complex engineering challenge in the project: 
        <strong>Deterministic Output from a Probabilistic Model</strong>.
      </p>
      
      <h3>Strict Prompt Engineering</h3>
      <p>
        LLMs inherently want to be conversational ("Here is your analysis..."). For an API, conversational filler breaks JSON parsers 
        and ruins the UI. Our system prompt strictly enforces an output schema:
      </p>
      <div className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm font-mono mb-6 overflow-x-auto">
        "Output in *exactly* this order:<br/>
        Safety Score: X/100<br/>
        Summary: [your one-line summary]<br/>
        Risky Clauses:<br/>
        - [bullet 1]<br/>
        ..."
      </div>
      
      <h3>Regex Score Extraction</h3>
      <p>
        Even with strict prompting, LLMs can hallucinate formatting. Therefore, the backend does not rely on the LLM generating valid JSON. 
        Instead, the backend acts as a parser, utilizing Regular Expressions to reliably extract the <code>Safety Score</code> integer from 
        the raw text stream. This ensures that even if the AI slightly modifies its tone, the core mathematical metric (the score from 0-100) 
        is safely transmitted to the React frontend to update visual progress bars and color codes.
      </p>

      <h2>3. Security & Rate Limiting</h2>
      <p>
        Exposing an AI endpoint to the public web is inherently dangerous due to "Denial of Wallet" attacks. ESECURE mitigates this through 
        layered security:
      </p>
      <ul>
        <li><strong>Flask-Limiter:</strong> We restrict requests to <code>5 per minute</code> per IP address. This allows normal usage but instantly blocks automated scraping bots trying to exhaust our Gemini API quota.</li>
        <li><strong>X-Access-Token Protocol:</strong> A lightweight static bearer token is injected into the HTTP headers by the Chrome Extension. While not as secure as OAuth2, it provides a sufficient barrier against casual script kiddies discovering the Render URL.</li>
      </ul>

      <h2>4. The Client (React Extension)</h2>
      <p>
        The frontend is built using React and compiled via Vite. By utilizing the <code>chrome.tabs</code> API, the extension 
        can automatically inject the active tab's URL into the payload, creating a "one-click" user experience. State management 
        is handled natively via React Hooks, ensuring that the UI perfectly maps to the API's pending, success, and error states.
      </p>
    </article>
  );
};

export default Architecture;
