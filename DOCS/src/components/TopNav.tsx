import { useState, useEffect } from 'react';
import { Search, Code2, ExternalLink } from 'lucide-react';
import SearchModal from './SearchModal';

const TopNav = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-2 w-72">
          <span className="font-extrabold text-lg tracking-tight text-slate-900">ESECURE Docs</span>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200">
            v1.0.2
          </span>
        </div>

        <div className="flex-1 max-w-2xl px-8 hidden md:block">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center bg-slate-50 border border-slate-200 text-slate-400 text-sm rounded-lg pl-3 pr-4 py-2 hover:border-slate-300 transition-all shadow-inner text-left"
          >
            <Search className="w-4 h-4 mr-2" />
            <span>Search documentation...</span>
            <div className="ml-auto flex items-center gap-1">
              <kbd className="border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-mono bg-white">⌘</kbd>
              <kbd className="border border-slate-200 rounded px-1.5 py-0.5 text-[10px] font-mono bg-white">K</kbd>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://github.com/honoursbhaduria/ESECURE" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-md hover:bg-slate-100">
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors px-4 py-1.5 rounded-md shadow-sm">
            <span>Get API Key</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default TopNav;
