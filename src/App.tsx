import { useState } from "react";
import {
  Smartphone,
  ShieldAlert,
  Sliders,
  Send,
  Sparkles,
  Layers,
  Inbox,
  HelpCircle,
  Clock,
  Settings,
  Database,
  ArrowRight,
  MonitorCheck
} from "lucide-react";
import { motion } from "motion/react";
import {
  INITIAL_PRODUCTS,
  INITIAL_ARTICLES,
  MOCK_MSDS,
  MOCK_CERTIFICATES,
  MOCK_ELECTRODES,
  MOCK_COLUMNS,
  INITIAL_QUOTES,
  INITIAL_TICKETS,
  INITIAL_NOTIFICATIONS
} from "./data/mockData";
import { Product, Article, QuoteRequest, SupportTicket, CertificateItem, PushNotification, UserSession } from "./types";
import AndroidEmulator from "./components/AndroidEmulator";
import AdminPanel from "./components/AdminPanel";
import PlayStoreFacilitator from "./components/PlayStoreFacilitator";

export default function App() {
  // Shared Live Application States (Our "In-Memory Database")
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [quotes, setQuotes] = useState<QuoteRequest[]>(INITIAL_QUOTES);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [certificates, setCertificates] = useState<CertificateItem[]>(MOCK_CERTIFICATES);
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  
  // Custom user session initialized as Guest
  const [userSession, setUserSession] = useState<UserSession>({
    isLoggedIn: false,
    loginType: "Guest"
  });

  // Workbench Tab Selection for the Right Pane
  // "admin" | "playstore"
  const [workbenchTab, setWorkbenchTab] = useState<"admin" | "playstore">("admin");

  // Action methods to change database records dynamically from children components
  const handleAddProduct = (prod: Product) => {
    setProducts((prev) => [prod, ...prev]);
  };

  const handleAddArticle = (art: Article) => {
    setArticles((prev) => [art, ...prev]);
  };

  const handleUpdateQuoteStatus = (id: string, status: QuoteRequest["status"]) => {
    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  };

  const handleUpdateTicketStatus = (id: string, status: SupportTicket["status"]) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  };

  const handleAddSupportReply = (id: string, message: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const currentReplies = t.replies || [];
          return {
            ...t,
            replies: [
              ...currentReplies,
              {
                sender: "Metrohm Support Agent",
                message,
                timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
              }
            ],
            status: "In Progress" as const
          };
        }
        return t;
      })
    );
  };

  const handleAddCertificate = (cert: CertificateItem) => {
    setCertificates((prev) => [cert, ...prev]);
  };

  const handleAddNotification = (not: PushNotification) => {
    setNotifications((prev) => [not, ...prev]);
  };

  const handleAddQuote = (quote: QuoteRequest) => {
    setQuotes((prev) => [quote, ...prev]);
  };

  const handleAddTicket = (ticket: SupportTicket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  // Helper inside phone simulator to register dynamic downloads inside user logs
  const handleTrackDownload = (title: string, type: "Brochure" | "Certificate" | "MSDS" | "Application Note") => {
    if (userSession.isLoggedIn && userSession.userProfile) {
      setUserSession({
        ...userSession,
        userProfile: {
          ...userSession.userProfile,
          downloadHistory: [
            { title, date: new Date().toISOString().substring(0, 10), type },
            ...userSession.userProfile.downloadHistory
          ]
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-slate-800 font-sans antialiased flex flex-col">
      
      {/* GLOBAL HIGH LEVEL BENCHMARK NAVBAR */}
      <header className="bg-[#005596] border-b-4 border-[#F29100] px-6 py-4 flex items-center justify-between shadow-md relative z-10 shrink-0">
        <div className="flex items-center gap-4">
          {/* Rotated Geometric Logo */}
          <div className="w-10 h-10 bg-white flex items-center justify-center rounded-sm shadow-sm shrink-0">
            <div className="w-6 h-6 border-4 border-[#005596] rotate-45"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-black text-lg text-white tracking-wider uppercase">
                METROHM <span className="font-light text-slate-200">SMART LAB 2026</span>
              </h1>
              <span className="text-[10px] bg-white text-[#005596] font-mono font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                INTERNAL SPEC
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-none mt-0.5">Dual-mode mobile emulator & Play Store publishing coordinator</p>
          </div>
        </div>

        {/* Global state metrics */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono pr-2">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded border border-white/20 text-white">
            <span className="opacity-75">Live Quotes:</span>
            <span className="text-[#F29100] font-black">{quotes.length}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded border border-white/20 text-white">
            <span className="opacity-75">SLA Help tickets:</span>
            <span className="text-orange-400 font-black">{tickets.length}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded border border-white/20 text-white">
            <span className="opacity-75">Device count:</span>
            <span className="text-emerald-400 font-black">{products.length}</span>
          </div>
        </div>
      </header>

      {/* DUAL WORKSPACE LAYOUT PANES */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        
        {/* LEFT COMPONENT (Lg: 4/12 columns): REAL-TIME MOBILE SIMULATOR */}
        <section className="lg:col-span-4 flex flex-col items-center justify-start xl:px-4">
          <div className="sticky top-6 w-full max-w-sm">
            <div className="text-center mb-4 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-slate-300 shadow-xs">
              <span className="text-[10px] font-display uppercase bg-[#005596] px-3 py-1 rounded text-white font-bold tracking-wide">
                Interactive Android Emulator (Dual-Sync)
              </span>
              <p className="text-[11px] text-slate-600 leading-snug mt-1.5 font-medium">
                Fully interactable Metrohm Mobile S24 mockup. Adding data in admin panel updates the client app immediately.
              </p>
            </div>

            <AndroidEmulator
              products={products}
              articles={articles}
              quotes={quotes}
              tickets={tickets}
              msdsData={MOCK_MSDS}
              certificates={certificates}
              electrodes={MOCK_ELECTRODES}
              columns={MOCK_COLUMNS}
              userSession={userSession}
              onSetUserSession={setUserSession}
              onAddQuote={handleAddQuote}
              onAddTicket={handleAddTicket}
              onTrackDownload={handleTrackDownload}
            />
          </div>
        </section>

        {/* RIGHT COMPONENT (Lg: 8/12 columns): WORKBENCH WITH SYSTEM CHANNELS */}
        <section className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Workbench Segment Selectors */}
          <div className="bg-white p-1.5 rounded-xl border border-slate-300 flex gap-2 select-none shadow-xs">
            <button
              onClick={() => setWorkbenchTab("admin")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-display font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                workbenchTab === "admin" 
                  ? "bg-[#005596] text-white shadow-md border-b-2 border-[#F29100]" 
                  : "text-slate-600 hover:text-[#005596] hover:bg-slate-100"
              }`}
            >
              <MonitorCheck size={14} />
              <span>Lab Admin Telemetry Panel</span>
            </button>

            <button
              onClick={() => setWorkbenchTab("playstore")}
              className={`flex-1 py-2.5 rounded-lg text-xs font-display font-extrabold uppercase tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                workbenchTab === "playstore" 
                  ? "bg-[#005596] text-white shadow-md border-b-2 border-[#F29100]" 
                  : "text-slate-600 hover:text-[#005596] hover:bg-slate-100"
              }`}
            >
              <Settings size={14} />
              <span>Play Store Launch Assistant & Codebase</span>
            </button>
          </div>

          {/* WORKSPACE AREA */}
          <div className="flex-1">
            {workbenchTab === "admin" ? (
              <AdminPanel
                products={products}
                articles={articles}
                quotes={quotes}
                tickets={tickets}
                certificates={certificates}
                notifications={notifications}
                onAddProduct={handleAddProduct}
                onAddArticle={handleAddArticle}
                onUpdateQuoteStatus={handleUpdateQuoteStatus}
                onUpdateTicketStatus={handleUpdateTicketStatus}
                onAddSupportReply={handleAddSupportReply}
                onAddCertificate={handleAddCertificate}
                onAddNotification={handleAddNotification}
              />
            ) : (
              <PlayStoreFacilitator />
            )}
          </div>
        </section>

      </div>

      {/* COMPLIANT DEPLOYMENT GLOBAL FOOTER */}
      <footer className="bg-white border-t border-slate-300 py-4 px-6 text-center text-xs text-slate-500 font-sans select-none flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl w-full mx-auto rounded-t-xl shrink-0 shadow-sm mt-auto">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#005596] rounded-xs"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Primary Blue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#F29100] rounded-xs"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Accent Orange</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 border border-slate-300 bg-slate-50 rounded-xs"></div>
            <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Secondary Light Grey</span>
          </div>
        </div>
        <p className="font-mono text-[10px] text-slate-400">© 2026 Metrohm AG Switzerland - Smart Instruments Ecosystem. FDA GLP-21 Standards.</p>
      </footer>

    </div>
  );
}
