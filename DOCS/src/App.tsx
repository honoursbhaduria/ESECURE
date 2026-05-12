import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import Overview from './pages/Overview';
import QuickSetup from './pages/QuickSetup';
import DeveloperGuide from './pages/DeveloperGuide';
import APIDocs from './pages/APIDocs';
import Deployment from './pages/Deployment';
import Architecture from './pages/Architecture';
import DocsGuide from './pages/DocsGuide';
import FrontendDeployment from './pages/FrontendDeployment';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-primary-100 selection:text-primary-900">
        <TopNav />
        <div className="flex pt-16">
          <Sidebar />
          <main className="flex-1 ml-72">
            <div className="max-w-4xl mx-auto px-8 py-12 lg:px-16 lg:py-16">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/quick-setup" element={<QuickSetup />} />
                <Route path="/developer-guide" element={<DeveloperGuide />} />
                <Route path="/api-docs" element={<APIDocs />} />
                <Route path="/deployment" element={<Deployment />} />
                <Route path="/architecture" element={<Architecture />} />
                <Route path="/docs-guide" element={<DocsGuide />} />
                <Route path="/frontend-deployment" element={<FrontendDeployment />} />
              </Routes>
            </div>
            
            <footer className="max-w-4xl mx-auto px-8 pb-12 lg:px-16 border-t border-slate-200 mt-16 pt-8 text-center text-sm text-slate-500 flex flex-col items-center">
              <p className="mb-2">Designed with precision for the ESECURE project.</p>
              <div className="flex gap-4">
                <span className="hover:text-slate-800 cursor-pointer transition-colors">Privacy</span>
                <span className="hover:text-slate-800 cursor-pointer transition-colors">Terms</span>
                <span className="hover:text-slate-800 cursor-pointer transition-colors">Contact</span>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
