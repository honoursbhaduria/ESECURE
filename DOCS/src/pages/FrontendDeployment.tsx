import 'react';

const FrontendDeployment = () => {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <h1>Frontend Documentation Deployment</h1>
      <p className="lead">
        This documentation site is built as a React SPA. For the best experience, we recommend deploying to 
        <strong> Vercel</strong> or <strong>Netlify</strong>.
      </p>

      <h2>Deploying to Vercel</h2>
      <p>
        Vercel is the preferred platform for this documentation due to its native support for monorepos 
        and Vite-based projects.
      </p>

      <ol>
        <li>
          <strong>Connect GitHub:</strong> Push your code to GitHub and import the repository into Vercel.
        </li>
        <li>
          <strong>Set Root Directory:</strong> During configuration, set the <strong>Root Directory</strong> to <code>DOCS</code>.
        </li>
        <li>
          <strong>Build Settings:</strong>
          <ul>
            <li>Framework Preset: <code>Vite</code></li>
            <li>Build Command: <code>npm run build</code></li>
            <li>Output Directory: <code>dist</code></li>
          </ul>
        </li>
      </ol>

      <h2>Handling Single Page Application (SPA) Routes</h2>
      <p>
        Since we use <code>react-router-dom</code> for navigation, you must ensure that all requests are 
        redirected to <code>index.html</code>. We have included a <code>vercel.json</code> in the 
        <code>DOCS/</code> directory that handles this automatically:
      </p>
      <pre><code>{`{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`}</code></pre>

      <h2>Alternative: Netlify</h2>
      <p>
        If using Netlify, create a file named <code>_redirects</code> in the <code>DOCS/public/</code> folder 
        with the following content:
      </p>
      <pre><code>/* /index.html 200</code></pre>
    </article>
  );
};

export default FrontendDeployment;
