import Home from './pages/Home';
import DocsOverview from './pages/DocsOverview';
import DocsQuickstart from './pages/DocsQuickstart';
import DocsWallet from './pages/DocsWallet';
import DocsRpc from './pages/DocsRpc';
import DocsExplorer from './pages/DocsExplorer';
import DocsContracts from './pages/DocsContracts';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "DocsOverview": DocsOverview,
    "DocsQuickstart": DocsQuickstart,
    "DocsWallet": DocsWallet,
    "DocsRpc": DocsRpc,
    "DocsExplorer": DocsExplorer,
    "DocsContracts": DocsContracts,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};