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
          --primary: 25 95% 53%;
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
          --ring: 25 95% 53%;
        }
        
        body {
          background-color: rgb(2, 6, 23);
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