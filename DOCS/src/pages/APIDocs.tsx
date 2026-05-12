import 'react';

const APIDocs = () => {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <h1>API Reference & Protocol</h1>
      
      <p className="mb-8 leading-relaxed text-lg">
        The ESECURE API is designed to be lean, fast, and secure. It follows RESTful principles and 
        utilizes JSON for all request and response payloads.
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Core Endpoint: <code>/analyze_terms</code></h2>
        <p className="mb-4">
          This is the primary gateway for the AI analysis engine. It handles both direct text input 
          and automated URL scraping.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:p-6 mb-6">
          <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Request Structure</h4>
          <p className="mb-2"><strong>URL:</strong> <code>https://your-backend.onrender.com/analyze_terms</code></p>
          <p className="mb-4"><strong>Method:</strong> <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-bold">POST</span></p>
          
          <h5 className="font-bold mb-2">Required Headers:</h5>
          <pre className="text-xs mb-6 overflow-x-auto">
{`{
  "Content-Type": "application/json",
  "X-Access-Token": "your_secure_token" // Validates extension identity
}`}
          </pre>

          <h5 className="font-bold mb-2">Payload Options:</h5>
          <p className="text-sm mb-4">The API accepts two mutually exclusive fields:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 p-3 md:p-4 rounded">
              <p className="font-bold text-blue-700 text-sm mb-2">Option A: URL Scraping</p>
              <pre className="text-xs overflow-x-auto">{`{ "url": "https://site.com/terms" }`}</pre>
              <p className="text-xs text-gray-500 mt-2 italic">Best for convenience. Scraped on-server.</p>
            </div>
            <div className="bg-white border border-gray-200 p-3 md:p-4 rounded">
              <p className="font-bold text-blue-700 text-sm mb-2">Option B: Direct Text</p>
              <pre className="text-xs overflow-x-auto">{`{ "text": "The full T&C text..." }`}</pre>
              <p className="text-xs text-gray-500 mt-2 italic">Best for gated or complex login pages.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Response Lifecycle</h2>
        <p className="mb-6">
          The API returns a structured JSON response. A critical feature of ESECURE is the 
          <strong> Score Extraction</strong> layer, which converts AI-generated text into 
          computable data for the UI.
        </p>

        <div className="bg-gray-900 text-white rounded-lg p-4 md:p-6 mb-8 overflow-x-auto">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Sample JSON Response</h4>
          <pre className="text-sm text-green-400">
{`{
  "score": 65,
  "feedback": "Safety Score: 65/100\\n
               Summary: Moderate risk due to data retention policies.\\n
               Risky Clauses:\\n
               - Data Sharing: The site shares data with 3rd party brokers.\\n
               - Arbitration: Forced individual arbitration for all disputes."
}`}
          </pre>
        </div>

        <h3 className="text-xl font-bold mb-3">Understanding "score" vs "feedback"</h3>
        <ul className="list-disc list-outside ml-6 space-y-3">
          <li>
            <strong>score (Integer):</strong> An extracted value from 0 to 100. The UI uses this 
            to color-code the results (Red &lt; 40, Yellow 40-70, Green &gt; 70).
          </li>
          <li>
            <strong>feedback (String):</strong> The raw, formatted output from the Gemini AI. 
            It is pre-formatted with newlines for direct rendering in the extension's text area.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Why this API design?</h2>
        <p className="mb-4">
          Many AI implementations simply return a large block of text. We chose a 
          <strong> Hybrid JSON</strong> approach because it provides the best of both worlds:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6">
          <div className="p-4 md:p-6 bg-gray-50 border border-gray-200 rounded">
            <h5 className="font-bold mb-2">Machine-Readable Score</h5>
            <p className="text-sm">Allows the extension to show progress bars, visual indicators, and quick-glance safety labels without the user reading a single word.</p>
          </div>
          <div className="p-4 md:p-6 bg-gray-50 border border-gray-200 rounded">
            <h5 className="font-bold mb-2">Rich AI Feedback</h5>
            <p className="text-sm">Provides the "Why" behind the score. By keeping this as a single string, we minimize latency and reduce parsing errors on the client side.</p>
          </div>
        </div>
      </section>

      <footer className="mt-20 pt-8 border-t border-gray-200 text-gray-400 text-sm">
        <p>Endpoint versioning follows semantic rules. Current API version: 1.0.2</p>
      </footer>
    </article>
  );
};

export default APIDocs;
