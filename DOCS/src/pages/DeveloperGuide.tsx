import 'react';

const DeveloperGuide = () => {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <h1>Developer Setup Guide</h1>
      <p className="mb-8">
        Instructions for setting up ESECURE locally for development.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Backend Configuration</h2>
      <ol className="list-decimal list-inside mb-6 space-y-4">
        <li>
          <strong>Install Dependencies:</strong>
          <pre className="mt-2">pip install -r BACKEND/requirements.txt</pre>
        </li>
        <li>
          <strong>Environment Variables:</strong>
          <p className="mt-2">Create a <code>.env</code> file in the <code>BACKEND/</code> directory:</p>
          <pre className="mt-2">
{`GEMINI_API_KEY=your_api_key
MY_PUBLIC_TOKEN=your_token
PORT=5000`}
          </pre>
        </li>
        <li>
          <strong>Start Server:</strong>
          <pre className="mt-2">python BACKEND/main.py</pre>
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mb-3">Frontend Configuration</h2>
      <ol className="list-decimal list-inside mb-6 space-y-4">
        <li>
          <strong>Install Dependencies:</strong>
          <pre className="mt-2">cd FRONTEND && npm install</pre>
        </li>
        <li>
          <strong>Environment Variables:</strong>
          <p className="mt-2">Create a <code>.env</code> file in the <code>FRONTEND/</code> directory:</p>
          <pre className="mt-2">
{`VITE_BACKEND_URL=http://127.0.0.1:5000
VITE_PUBLIC_TOKEN=your_token`}
          </pre>
        </li>
        <li>
          <strong>Build & Load:</strong>
          <pre className="mt-2">npm run build</pre>
          <p className="mt-2">Load the <code>dist/</code> folder into Chrome as an unpacked extension.</p>
        </li>
      </ol>
    </article>
  );
};

export default DeveloperGuide;
