import { NavLink, useLocation } from 'react-router-dom';
import { BookText, Rocket, Code2, Server, KeySquare, Blocks, GraduationCap, X } from 'lucide-react';
import { useEffect } from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  // Close sidebar when route changes on mobile
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  const navGroups = [
    {
      title: "Introduction",
      items: [
        { path: "/", label: "Overview & Vision", icon: BookText },
        { path: "/quick-setup", label: "Quickstart Guide", icon: Rocket },
      ]
    },
    {
      title: "Core Architecture",
      items: [
        { path: "/architecture", label: "System Design", icon: Blocks },
        { path: "/api-docs", label: "API Protocol", icon: Server },
      ]
    },
    {
      title: "Developer Guides",
      items: [
        { path: "/developer-guide", label: "Local Setup", icon: Code2 },
        { path: "/deployment", label: "Backend Deployment", icon: KeySquare },
        { path: "/frontend-deployment", label: "Frontend Deployment", icon: Rocket },
        { path: "/docs-guide", label: "Documentation Engineering", icon: GraduationCap },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside className={`
        w-72 fixed left-0 top-0 lg:top-16 bottom-0 z-50 lg:z-30
        bg-white border-r border-slate-200 py-6 px-4
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <span className="font-extrabold text-lg tracking-tight text-slate-900">ESECURE</span>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-900">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-8">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                {group.title}
              </h4>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-2 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                            isActive 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`
                        }
                      >
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        
        <div className="mt-12 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <h5 className="text-sm font-semibold text-slate-800 mb-1">Need Help?</h5>
          <p className="text-xs text-slate-500 mb-3">If you encounter issues during setup, check out the community discussions.</p>
          <a href="https://github.com/honoursbhaduria/ESECURE/issues" target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
            Open an Issue &rarr;
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
