import 'react';
import { Rocket, Download } from 'lucide-react';

const QuickSetup = () => {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <h1>Quick Setup Guide</h1>
      <p className="mb-8">
        This guide is for users who want to use the ESECURE extension without setting up a local development environment.
      </p>

      <h2 className="text-2xl font-semibold mb-3">1. Download the Extension</h2>
      <p className="mb-4">
        Download the pre-configured extension ZIP file. This version connects to a production backend hosted on Render.
      </p>
      <div className="not-prose my-8">
        <div className="p-6 bg-white border border-slate-200 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded">
              <Rocket className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Production Extension Build</p>
              <p className="text-xs text-slate-500 font-mono">esecure-extension-production.zip</p>
            </div>
          </div>
          <a 
            href="/esecure-extension-production.zip" 
            download 
            className="w-full sm:w-auto text-center px-8 py-3 bg-black text-white text-sm font-bold rounded flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download ZIP
          </a>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-3">2. Install in Browser</h2>
      <ol className="list-decimal list-inside mb-8 space-y-2">
        <li>Extract the ZIP file to a local folder.</li>
        <li>Open Chrome and go to <code>chrome://extensions/</code>.</li>
        <li>Enable <strong>Developer mode</strong>.</li>
        <li>Click <strong>Load unpacked</strong> and select the extracted folder.</li>
      </ol>

      <h2 className="text-2xl font-semibold mb-3">3. Usage</h2>
      <p className="mb-4">
        Once installed, click the ESECURE icon in your toolbar while browsing any site with terms and conditions. Click "Use Current Tab URL" to start the analysis.
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <p className="text-sm text-blue-700 font-bold">Note:</p>
        <p className="text-sm text-blue-700">The quick setup version relies on our shared API quota. For heavy usage, consider a local developer setup.</p>
      </div>
    </article>
  );
};

export default QuickSetup;
