import 'react';

const Deployment = () => {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Backend Deployment</h1>
      <p className="mb-8">
        Steps to deploy the ESECURE backend to Render for public access.
      </p>

      <h2 className="text-2xl font-semibold mb-3">1. Repository Setup</h2>
      <p className="mb-6">
        Push your project code (including the <code>BACKEND/</code> folder) to a GitHub repository.
      </p>

      <h2 className="text-2xl font-semibold mb-3">2. Create Render Web Service</h2>
      <ol className="list-decimal list-inside mb-8 space-y-4">
        <li>Login to <a href="https://render.com" target="_blank" className="underline text-blue-600">Render</a> and click <strong>New Web Service</strong>.</li>
        <li>Select your GitHub repository.</li>
        <li><strong>Root Directory:</strong> <code>BACKEND</code></li>
        <li><strong>Environment:</strong> <code>Python 3</code></li>
        <li><strong>Build Command:</strong> <code>pip install -r requirements.txt</code></li>
        <li><strong>Start Command:</strong> <code>gunicorn main:app</code></li>
      </ol>

      <h2 className="text-2xl font-semibold mb-3">3. Environment Variables</h2>
      <p className="mb-4">Add the following keys in the Render "Environment" tab:</p>
      <table className="min-w-full border-collapse border border-gray-200 mb-8">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="border border-gray-200 px-4 py-2 font-semibold">Key</th>
            <th className="border border-gray-200 px-4 py-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-mono text-sm">GEMINI_API_KEY</td>
            <td className="border border-gray-200 px-4 py-2 text-sm">Your Google Gemini API Key</td>
          </tr>
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-mono text-sm">X_ACCESS_TOKEN</td>
            <td className="border border-gray-200 px-4 py-2 text-sm">Secret token for API authentication</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-3">4. Verify Deployment</h2>
      <p className="mb-4">
        Once the build completes, Render will provide a public URL (e.g., <code>https://esecure.onrender.com</code>). Test it by visiting the root URL in your browser.
      </p>
    </article>
  );
};

export default Deployment;
