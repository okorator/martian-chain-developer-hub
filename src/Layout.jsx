import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

const docsPages = [
  'DocsOverview', 'DocsQuickstart', 'DocsWallet', 'DocsRpc', 
  'DocsExplorer', 'DocsContracts', 'DocsRecipeRead', 'DocsRecipeSend', 
  'DocsRecipeEvents', 'DocsTroubleshooting', 'DocsChangelog'
];

export default function Layout({ children, currentPageName }) {
  const isDocsPage = docsPages.includes(currentPageName);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        :root {
          --background: 222.2 84% 4.9%;
          --foreground: 210 40% 98%;
          --card: 222.2 84% 4.9%;
          --card-foreground: 210 40% 98%;
          --popover: 222.2 84% 4.9%;
          --popover-foreground: 210 40% 98%;
          --primary: 167 100% 50%;
          --primary-foreground: 210 40% 98%;
          --secondary: 217.2 32.6% 17.5%;
          --secondary-foreground: 210 40% 98%;
          --muted: 217.2 32.6% 17.5%;
          --muted-foreground: 215 20.2% 65.1%;
          --accent: 217.2 32.6% 17.5%;
          --accent-foreground: 210 40% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 210 40% 98%;
          --border: 217.2 32.6% 17.5%;
          --input: 217.2 32.6% 17.5%;
          --ring: 167 100% 50%;
        }

        body {
          background-color: rgb(2, 6, 23);
          position: relative;
          overflow-x: hidden;
        }

        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 10% 20%, white, transparent),
            radial-gradient(1px 1px at 15% 35%, white, transparent),
            radial-gradient(2px 2px at 20% 60%, white, transparent),
            radial-gradient(1px 1px at 25% 80%, white, transparent),
            radial-gradient(2px 2px at 30% 15%, white, transparent),
            radial-gradient(1px 1px at 35% 45%, white, transparent),
            radial-gradient(1px 1px at 40% 70%, white, transparent),
            radial-gradient(2px 2px at 45% 25%, white, transparent),
            radial-gradient(1px 1px at 50% 55%, white, transparent),
            radial-gradient(2px 2px at 55% 85%, white, transparent),
            radial-gradient(1px 1px at 60% 10%, white, transparent),
            radial-gradient(1px 1px at 65% 40%, white, transparent),
            radial-gradient(2px 2px at 70% 65%, white, transparent),
            radial-gradient(1px 1px at 75% 30%, white, transparent),
            radial-gradient(1px 1px at 80% 75%, white, transparent),
            radial-gradient(2px 2px at 85% 50%, white, transparent),
            radial-gradient(1px 1px at 90% 20%, white, transparent),
            radial-gradient(2px 2px at 95% 90%, white, transparent),
            radial-gradient(1px 1px at 5% 50%, white, transparent),
            radial-gradient(1px 1px at 12% 75%, white, transparent),
            radial-gradient(2px 2px at 22% 40%, white, transparent),
            radial-gradient(1px 1px at 38% 90%, white, transparent),
            radial-gradient(1px 1px at 48% 8%, white, transparent),
            radial-gradient(2px 2px at 58% 95%, white, transparent),
            radial-gradient(1px 1px at 68% 22%, white, transparent),
            radial-gradient(1px 1px at 78% 58%, white, transparent),
            radial-gradient(2px 2px at 88% 35%, white, transparent),
            radial-gradient(1px 1px at 92% 68%, white, transparent);
          background-size: 100% 100%;
          animation: twinkle 4s ease-in-out infinite;
          pointer-events: none;
          opacity: 0.5;
          z-index: 0;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgb(15, 23, 42);
        }
        ::-webkit-scrollbar-thumb {
          background: rgb(51, 65, 85);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgb(71, 85, 105);
        }
      `}</style>
      
      <Navbar currentPage={currentPageName} />
      
      {isDocsPage ? (
        <div className="flex">
          <Sidebar currentPage={currentPageName} />
          <main className="flex-1 min-w-0 overflow-x-hidden">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {children}
            </div>
          </main>
        </div>
      ) : (
        <main>{children}</main>
      )}
      
      <footer className="border-t border-slate-800 py-6 px-4 text-center text-xs text-slate-500">
        For development and informational purposes only. Not financial advice.
      </footer>
    </div>
  );
}