import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, FileText, X, CornerDownLeft } from 'lucide-react';
import { searchIndex } from '../searchIndex';
import type { SearchItem } from '../searchIndex';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>(searchIndex);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const fuse = new Fuse(searchIndex, {
    keys: ['title', 'description', 'category'],
    threshold: 0.3,
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults(searchIndex);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchIndex);
    } else {
      const searchResults = fuse.search(query).map(r => r.item);
      setResults(searchResults);
    }
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % results.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + results.length) % results.length);
      }
      if (e.key === 'Enter' && results.length > 0) {
        handleSelect(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSelect = (item: SearchItem) => {
    navigate(item.path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center px-4 border-b border-slate-100 py-4">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search ESECURE docs..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 text-lg placeholder-slate-400"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-md transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto max-h-[50vh] p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item, idx) => (
                <div
                  key={item.path}
                  className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all ${
                    idx === selectedIndex ? 'bg-primary-50 border-primary-100' : 'hover:bg-slate-50 border-transparent'
                  } border`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className={`p-2 rounded-lg ${idx === selectedIndex ? 'bg-white text-primary-600 shadow-sm' : 'bg-slate-100 text-slate-400'}`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-bold text-sm ${idx === selectedIndex ? 'text-primary-700' : 'text-slate-900'}`}>{item.title}</p>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className={`text-xs truncate ${idx === selectedIndex ? 'text-primary-600' : 'text-slate-500'}`}>{item.description}</p>
                  </div>
                  {idx === selectedIndex && (
                    <CornerDownLeft className="w-4 h-4 text-primary-400 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-400">No results for <span className="text-slate-900 font-bold">"{query}"</span></p>
            </div>
          )}
        </div>

        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><kbd className="border border-slate-200 rounded px-1 bg-white">↵</kbd> to select</span>
            <span className="flex items-center gap-1.5"><kbd className="border border-slate-200 rounded px-1 bg-white">↑↓</kbd> to navigate</span>
          </div>
          <span className="flex items-center gap-1.5"><kbd className="border border-slate-200 rounded px-1 bg-white">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
