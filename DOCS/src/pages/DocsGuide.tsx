const DocsGuide = () => {
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Documentation Engineering</h1>
      <p className="lead">
        This is an exhaustive meta-guide on how this exact documentation website is constructed, styled, and maintained. 
        We treat documentation not as an afterthought, but as a primary engineering artifact. It utilizes a modern "Docs as Code" 
        philosophy powered by React, Vite, and Tailwind CSS.
      </p>

      <h2>1. The Technology Stack</h2>
      <p>
        Unlike traditional static site generators (like Jekyll or Sphinx) or heavy CMS platforms, this documentation 
        is a bespoke React Single Page Application (SPA). This approach was chosen to afford us absolute, pixel-perfect 
        control over the UI/UX.
      </p>
      <ul>
        <li><strong>Framework:</strong> React 19 via Vite. Vite provides instantaneous Hot Module Replacement (HMR), making the writing process incredibly fast.</li>
        <li><strong>Routing:</strong> <code>react-router-dom</code> handles client-side navigation, ensuring pages transition instantly without browser reloads.</li>
        <li><strong>Styling:</strong> Tailwind CSS v4, augmented with the <code>@tailwindcss/typography</code> plugin.</li>
        <li><strong>Iconography:</strong> <code>lucide-react</code> provides the sharp, professional SVG icons used in the TopNav and Sidebar.</li>
      </ul>

      <h2>2. Achieving the "Pro Senior UI" Aesthetic</h2>
      <p>
        The user experience of this site is modeled after industry-leading documentation platforms like Stripe, Tailwind, and Next.js. 
        Achieving this "premium" look requires strict adherence to specific design principles.
      </p>

      <h3>Typography is Everything</h3>
      <p>
        We rely on the <code>prose</code> class provided by Tailwind's typography plugin. This automatically applies optimal 
        line heights (leading), character spacing (tracking), and margin/padding between block elements (paragraphs, headers, lists). 
        To prevent text from stretching too wide across large screens—which strains the eyes—we apply <code>max-w-4xl</code> to the main container 
        and let the typography plugin naturally cap the line length.
      </p>

      <h3>Layout Architecture</h3>
      <p>
        The layout utilizes a <strong>Fixed CSS Grid/Flexbox approach</strong>:
      </p>
      <pre><code>{`// Simplified App.tsx structure
<div className="min-h-screen bg-slate-50">
  <TopNav className="fixed top-0 h-16 z-50 backdrop-blur" />
  <div className="flex pt-16">
    <Sidebar className="fixed left-0 w-72" />
    <main className="ml-72 flex-1">
      {/* Scrollable Content Here */}
    </main>
  </div>
</div>`}</code></pre>
      <p>
        By fixing the TopNav and Sidebar, the user never loses context. The use of <code>backdrop-blur-md</code> on the TopNav 
        creates a modern glassmorphism effect as the text scrolls underneath it.
      </p>

      <h2>3. How to Contribute to the Docs</h2>
      <p>
        Adding new content to this documentation is straightforward but requires adherence to the component structure.
      </p>

      <h3>Step-by-Step Addition</h3>
      <ol>
        <li>
          <strong>Create a New Component:</strong> Inside <code>DOCS/src/pages/</code>, create a new <code>.tsx</code> file (e.g., <code>Security.tsx</code>).
        </li>
        <li>
          <strong>Use the Prose Wrapper:</strong> Ensure your root element is an <code>&lt;article&gt;</code> tag with the correct prose classes:
          <pre><code>{`const Security = () => {
  return (
    <article className="prose prose-slate prose-lg max-w-none">
      <h1>Security Policies</h1>
      <p>Content goes here...</p>
    </article>
  );
}`}</code></pre>
        </li>
        <li>
          <strong>Register the Route:</strong> Open <code>DOCS/src/App.tsx</code>, import your component, and add a <code>&lt;Route&gt;</code> entry.
        </li>
        <li>
          <strong>Update the Sidebar:</strong> Open <code>DOCS/src/components/Sidebar.tsx</code>, import a relevant icon from <code>lucide-react</code>, and add your new path to the <code>navGroups</code> array.
        </li>
      </ol>

      <h2>4. Future Roadmap for Docs</h2>
      <p>
        While currently robust, the roadmap for this documentation platform includes:
      </p>
      <ul>
        <li><strong>MDX Integration:</strong> Transitioning from raw TSX files to MDX, allowing non-developers to write standard Markdown while still embedding interactive React components.</li>
        <li><strong>Algolia DocSearch:</strong> Replacing the placeholder TopNav search bar with a fully indexed, typo-tolerant search engine.</li>
        <li><strong>Dark Mode Toggle:</strong> Implementing a <code>next-themes</code> provider to dynamically switch between Tailwind's <code>slate-50</code> light mode and a deep <code>slate-900</code> dark mode.</li>
      </ul>
      <p>
        Maintaining high-quality documentation is a continuous process. Treat these files with the same rigor, code review, and architectural care as the core ESECURE application logic.
      </p>
    </article>
  );
};

export default DocsGuide;
