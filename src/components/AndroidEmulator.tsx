import { useState, useMemo, FormEvent } from "react";
import {
  Smartphone,
  Search,
  BookOpen,
  FileText,
  Briefcase,
  HelpCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  Download,
  Filter,
  Layers,
  File,
  Cpu,
  Bookmark,
  Share2,
  Trash2,
  User,
  LogOut,
  Mail,
  Building,
  CheckCircle,
  Menu,
  Home,
  Info,
  Phone,
  ArrowLeft,
  Sliders,
  Send,
  Linkedin,
  Facebook,
  Youtube,
  Instagram,
  Lock,
  MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Product, Article, UserSession, QuoteRequest, SupportTicket, MSDSItem, CertificateItem, ElectrodeItem, ColumnItem } from "../types";

interface AndroidEmulatorProps {
  products: Product[];
  articles: Article[];
  quotes: QuoteRequest[];
  tickets: SupportTicket[];
  msdsData: MSDSItem[];
  certificates: CertificateItem[];
  electrodes: ElectrodeItem[];
  columns: ColumnItem[];
  userSession: UserSession;
  onSetUserSession: (session: UserSession) => void;
  onAddQuote: (quote: QuoteRequest) => void;
  onAddTicket: (ticket: SupportTicket) => void;
  onTrackDownload: (title: string, type: "Brochure" | "Certificate" | "MSDS" | "Application Note") => void;
}

export default function AndroidEmulator({
  products,
  articles,
  quotes,
  tickets,
  msdsData,
  certificates,
  electrodes,
  columns,
  userSession,
  onSetUserSession,
  onAddQuote,
  onAddTicket,
  onTrackDownload
}: AndroidEmulatorProps) {
  // Mobile navigation state
  // "home" | "products" | "product-detail" | "industries" | "knowledge" | "support" | "quote" | "contact" | "finders" | "omnis-nir" | "profile" | "login"
  const [currentScreen, setCurrentScreen] = useState<string>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  // Instant search input
  const [searchQuery, setSearchQuery] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("All");
  const [industryFilter, setIndustryFilter] = useState<string>("All");
  const [knowledgeCategory, setKnowledgeCategory] = useState<string>("All");
  
  // Finder tools specific sub-states
  const [activeFinderTab, setActiveFinderTab] = useState<"msds" | "certificate" | "electrode" | "column" | "accessory">("msds");
  const [finderSearchText, setFinderSearchText] = useState("");
  const [certificateSerialInput, setCertificateSerialInput] = useState("");
  const [matMatchOption, setMatMatchOption] = useState("All");

  // OMNIS NIR custom configurator tool
  const [nirSampleForm, setNirSampleForm] = useState<"liquid" | "solid" | "slurry">("liquid");
  const [nirIndustrySelection, setNirIndustrySelection] = useState<string>("Pharmaceuticals");
  const [nirAutomationReq, setNirAutomationReq] = useState<boolean>(false);

  // Form states
  const [quoteForm, setQuoteForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    country: "United States",
    productInterest: "OMNIS NIR Analyzer Liquid",
    industry: "Pharmaceuticals",
    message: ""
  });

  const [ticketForm, setTicketForm] = useState({
    fullName: "",
    email: "",
    type: "Technical Support" as const,
    subject: "",
    message: ""
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    companyCode: "",
    userType: "Email" as "Email" | "Google" | "Company"
  });

  // Message alert state (simulated overlay toast)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentScreen("product-detail");
  };

  const handleArticleClick = (id: string) => {
    setSelectedArticleId(id);
    setCurrentScreen("article-detail");
  };

  // Helper toggle save product
  const toggleSaveProduct = (prodId: string) => {
    if (!userSession.isLoggedIn) {
      triggerToast("Please login step first to save favorite equipment!");
      setCurrentScreen("login");
      return;
    }
    const currentSaved = userSession.userProfile?.savedProducts || [];
    let nextSaved = [...currentSaved];
    if (currentSaved.includes(prodId)) {
      nextSaved = nextSaved.filter(id => id !== prodId);
      triggerToast("Product removed from saved items.");
    } else {
      nextSaved.push(prodId);
      triggerToast("Product added to saved items!");
    }
    onSetUserSession({
      ...userSession,
      userProfile: userSession.userProfile ? {
        ...userSession.userProfile,
        savedProducts: nextSaved
      } : undefined
    });
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = productCategoryFilter === "All" || p.category === productCategoryFilter;
      
      // Filter products by industry segment mapping
      let matchInd = true;
      if (industryFilter !== "All") {
        if (industryFilter === "Pharmaceuticals") {
          matchInd = p.category.includes("OMNIS") || p.category === "Titration" || p.category === "Ion Chromatography";
        } else if (industryFilter === "Chemicals") {
          matchInd = p.category === "Titration" || p.category === "Ion Chromatography" || p.category === "Electrochemistry";
        } else if (industryFilter === "Environmental") {
          matchInd = p.category === "Ion Chromatography" || p.category === "Titration";
        } else if (industryFilter === "Food & Beverage") {
          matchInd = p.category === "Titration" || p.category === "Ion Chromatography" || p.category.includes("NIR");
        }
      }
      return matchSearch && matchCat && matchInd;
    });
  }, [products, searchQuery, productCategoryFilter, industryFilter]);

  // Handle support ticket create
  const handleCreateTicket = (e: FormEvent) => {
    e.preventDefault();
    if (!ticketForm.fullName || !ticketForm.email || !ticketForm.subject || !ticketForm.message) {
      triggerToast("Please complete standard fields.");
      return;
    }
    const num = "TK-" + Math.floor(10000 + Math.random() * 90000);
    const newTick: SupportTicket = {
      id: "t-" + Date.now(),
      ticketNumber: num,
      fullName: ticketForm.fullName,
      email: ticketForm.email,
      type: ticketForm.type,
      subject: ticketForm.subject,
      message: ticketForm.message,
      status: "Open",
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      replies: [
        {
          sender: "User",
          message: ticketForm.message,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
        }
      ]
    };
    onAddTicket(newTick);
    
    // update download / action history if logged in
    if (userSession.isLoggedIn && userSession.userProfile) {
      onSetUserSession({
        ...userSession,
        userProfile: {
          ...userSession.userProfile,
          downloadHistory: [
            ...userSession.userProfile.downloadHistory,
            { title: `Service Ticket ${num} Created`, date: "Today", type: "Certificate" } // custom log
          ]
        }
      });
    }

    triggerToast(`Support ticket ${num} created successfully! Our systems team will notify you.`);
    // Reset
    setTicketForm({
      fullName: "",
      email: "",
      type: "Technical Support",
      subject: "",
      message: ""
    });
    setCurrentScreen("profile");
  };

  // Handle quote request submit
  const handleRequestQuote = (e: FormEvent) => {
    e.preventDefault();
    if (!quoteForm.fullName || !quoteForm.companyName || !quoteForm.email) {
      triggerToast("Missing name, company, or email.");
      return;
    }
    const newQuote: QuoteRequest = {
      id: "q-" + Date.now(),
      fullName: quoteForm.fullName,
      companyName: quoteForm.companyName,
      email: quoteForm.email,
      phone: quoteForm.phone,
      country: quoteForm.country,
      productInterest: quoteForm.productInterest,
      industry: quoteForm.industry,
      message: quoteForm.message,
      status: "Pending",
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    onAddQuote(newQuote);

    // Track state
    if (userSession.isLoggedIn && userSession.userProfile) {
      onSetUserSession({
        ...userSession,
        userProfile: {
          ...userSession.userProfile,
          downloadHistory: [
            ...userSession.userProfile.downloadHistory,
            { title: `Quotation Inquiry: ${newQuote.productInterest}`, date: "Today", type: "Brochure" }
          ]
        }
      });
    }

    triggerToast("Inquiry submitted! Check verification details in Admin Dashboard or Profile.");
    setQuoteForm({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      country: "United States",
      productInterest: "OMNIS NIR Analyzer Liquid",
      industry: "Pharmaceuticals",
      message: ""
    });
    setCurrentScreen("profile");
  };

  // Perform Simulated PDF Download
  const handleSimulateDownload = (title: string, type: "Brochure" | "Certificate" | "MSDS" | "Application Note") => {
    onTrackDownload(title, type);
    triggerToast(`Downloaded: ${title} (${type})`);
  };

  // Handle login simulate
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!loginForm.email) {
      triggerToast("Enter email address to authenticate.");
      return;
    }
    
    // Mock successful login
    const nameStr = loginForm.email.split("@")[0].toUpperCase();
    onSetUserSession({
      isLoggedIn: true,
      loginType: loginForm.userType,
      userProfile: {
        name: nameStr.charAt(0) + nameStr.slice(1).toLowerCase() + " (Lab Associate)",
        email: loginForm.email,
        company: loginForm.companyCode || "Consolidated Lab Services",
        phone: "+1 (555) 349-2041",
        country: "United States",
        savedProducts: ["omnis-nir-liquid"],
        downloadHistory: [
          { title: "OMNIS NIR Liquid Brochure", date: "2026-06-18", type: "Brochure" },
          { title: "iUnitrode User Manual", date: "2026-06-19", type: "Application Note" }
        ]
      }
    });

    triggerToast(`Welcome back, ${loginForm.email}! Connected to Metrohm Enterprise Cloud.`);
    setCurrentScreen("home");
  };

  const handleGuestBrowsing = () => {
    onSetUserSession({
      isLoggedIn: false,
      loginType: "Guest"
    });
    triggerToast("Entering Metrohm Lab Portal as Guest.");
    setCurrentScreen("home");
  };

  const handleLogout = () => {
    onSetUserSession({ isLoggedIn: false, loginType: "Guest" });
    triggerToast("User logged out successfully.");
    setCurrentScreen("home");
  };

  // OMNIS NIR Custom Advisor matching
  const dynamicNirAdvice = useMemo(() => {
    let title = "";
    let systemId = "";
    let accuracy = "";
    let justification = "";

    if (nirSampleForm === "liquid") {
      title = "OMNIS NIR Analyzer Liquid";
      systemId = "omnis-nir-liquid";
      accuracy = "±0.04% repeat rate";
      justification = "Optimized for raw organic solvents, liquid chemicals, water traces, alcohols, and pharmaceutical excipients. Integrates seamlessly with our constant temperature vial bath.";
    } else if (nirSampleForm === "solid" && !nirAutomationReq) {
      title = "OMNIS NIR Analyzer Solid";
      systemId = "omnis-nir-solid";
      accuracy = "±0.09% repeat rate";
      justification = "Features our specialized rotating turntable sample tray. Bypasses granularity issues in solids, crystalline powders, and polymer raw materials without manual stirring.";
    } else {
      title = "OMNIS Automated NIR Solid Station";
      systemId = "omnis-sample-robot";
      accuracy = "±0.07% high-precision run";
      justification = "For high-throughput requirements! Matches the OMNIS NIR Spectrometers with modular conveyor robot cells. Allows zero-touch raw material screening for up to 175 tubes.";
    }

    return { title, systemId, accuracy, justification };
  }, [nirSampleForm, nirAutomationReq]);

  return (
    <div className="relative mx-auto max-w-sm w-full">
      {/* 🛑 TOAST NOTIFIER */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 15 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-4 right-4 z-50 bg-[#005B94] border border-orange-500 text-white text-xs px-4 py-3 rounded-lg shadow-lg flex items-start gap-2 shadow-black/40"
          >
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0 animated-ping"></div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHONE EMULATOR SHELL */}
      <div className="relative border-[10px] border-slate-800 bg-slate-900 rounded-[48px] shadow-2xl overflow-hidden aspect-[9/19.5] w-full flex flex-col ring-8 ring-slate-700/30">
        
        {/* Notch / Speaker bar */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-32 bg-slate-800 rounded-full z-40 flex items-center justify-around px-4">
          <div className="h-1.5 w-1.5 bg-slate-900 rounded-full"></div>
          <div className="h-1 w-12 bg-slate-700 rounded-full"></div>
          <div className="h-1.5 w-1.5 bg-sky-500/80 rounded-full animate-pulse"></div>
        </div>

        {/* Operating System Status Bar */}
        <div className="h-10 pt-1.5 pb-1 px-6 bg-slate-900 text-[10px] text-gray-300 flex items-center justify-between font-mono select-none z-30 shrink-0">
          <span>09:41 AM</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] px-1 bg-teal-800/40 border border-teal-500/40 rounded text-teal-300">5G LTE</span>
            <div className="w-3.5 h-2 border border-gray-400 rounded-sm relative p-0.5">
              <div className="h-full bg-orange-500 rounded-3xs w-full"></div>
              <div className="w-0.5 h-0.8 bg-gray-400 absolute right-[-2px] top-1/2 -translate-y-1/2"></div>
            </div>
            <span>100%</span>
          </div>
        </div>

        {/* MAIN BODY WINDOW */}
        <div className="flex-1 bg-gray-50 flex flex-col justify-between overflow-y-auto overflow-x-hidden relative">
          
          {/* TOP INNER BRAND BAR (Mobile Header) */}
          <div className="sticky top-0 bg-[#005B94] text-white px-4 py-2.5 flex items-center justify-between shadow-sm z-20">
            <div className="flex items-center gap-1.5">
              {currentScreen !== "home" && (
                <button 
                  onClick={() => {
                    // Quick stack navigation
                    if (currentScreen === "product-detail") setCurrentScreen("products");
                    else if (currentScreen === "article-detail") setCurrentScreen("knowledge");
                    else setCurrentScreen("home");
                  }} 
                  className="p-1 -ml-1 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <div className="flex flex-col">
                <span className="font-sans font-bold tracking-tight text-[11px] text-orange-400">METROHM SMART LAB</span>
                <span className="text-[10px] text-white/90 leading-none">2026 App companion</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentScreen(userSession.isLoggedIn ? "profile" : "login")} 
                className="p-1 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1.5"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${userSession.isLoggedIn ? 'bg-emerald-400' : 'bg-orange-400'}`}></div>
                <User size={15} />
              </button>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto">
            
            {/* SCREEN CONTENT CONDITIONAL */}
            {currentScreen === "home" && (
              <div className="p-3 space-y-4">
                
                {/* Brand Visual Welcome */}
                <div className="bg-gradient-to-r from-[#003B64] to-[#005B94] rounded-xl p-4 text-white relative overflow-hidden shadow-sm">
                  <div className="absolute right-0 bottom-0 opacity-10 font-black text-6xl text-white pointer-events-none p-1">
                    m
                  </div>
                  <h3 className="font-sans font-bold text-sm tracking-tight text-white mb-0.5">Secure Chemical Analysis</h3>
                  <p className="text-[11px] text-gray-200 leading-normal max-w-[80%]">
                    Providing high-end electrochemical, titration, chromatography & Near-Infrared analyzers built with lifetime compliance guides.
                  </p>
                  
                  {userSession.isLoggedIn ? (
                    <div className="mt-3 inline-flex items-center gap-1 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] text-emerald-300">
                      <CheckCircle size={10} />
                      Connected as {userSession.userProfile?.name.split(" ")[0]}
                    </div>
                  ) : (
                    <button 
                      onClick={() => setCurrentScreen("login")}
                      className="mt-3 text-[10px] bg-orange-500 hover:bg-orange-600 text-white font-medium px-2.5 py-1 rounded transition-all"
                    >
                      Authenticate Company Account
                    </button>
                  )}
                </div>

                {/* Instant Search Bar */}
                <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-3xs space-y-1.5 focus-within:border-[#005B94] transition-colors">
                  <span className="text-[10px] font-bold text-gray-700 tracking-wide uppercase">Core Catalog Search</span>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      className="w-full text-xs bg-gray-50 border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#005B94] focus:bg-white"
                      placeholder="e.g. OMNIS NIR, Diaphragm, iUnitrode..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (currentScreen !== "products") {
                          // redirect to products catalog for instant results
                          setCurrentScreen("products");
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Quick Instruments & Finder Tools Grid */}
                <div>
                  <h4 className="text-[11px] font-bold text-gray-700 tracking-wider uppercase mb-2">Smart Finder Tools</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { icon: <FileText size={16} className="text-blue-600" />, label: "MSDS Finder", tab: "msds" },
                      { icon: <CheckCircle size={16} className="text-teal-600" />, label: "Certificate", tab: "certificate" },
                      { icon: <Cpu size={16} className="text-purple-600" />, label: "Electrode Finder", tab: "electrode" },
                      { icon: <Sliders size={16} className="text-orange-600" />, label: "IC Columns", tab: "column" },
                    ].map((btn, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveFinderTab(btn.tab as any);
                          setCurrentScreen("finders");
                        }}
                        className="bg-white p-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-all flex flex-col items-center text-center space-y-1 shadow-3xs"
                      >
                        {btn.icon}
                        <span className="text-[8px] font-medium text-gray-700 leading-tight block truncate w-full">{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Promotional Banner: OMNIS NIR featured */}
                <div className="bg-orange-50 border border-orange-200/60 rounded-xl p-3 shadow-3xs">
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] bg-orange-500 text-white font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Featured Technology</span>
                    <span className="text-[9px] font-mono text-gray-500">2026 Model Release</span>
                  </div>
                  <h4 className="font-sans font-bold text-sm text-[#003B64] mt-1.5">OMNIS NIR Analyzer Platform</h4>
                  <p className="text-[10px] text-gray-600 leading-snug mt-1">
                    Achieve molecular composition diagnostics within 10 seconds. Fully automated, reagent-free, zero waste.
                  </p>
                  
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => setCurrentScreen("omnis-nir")}
                      className="bg-[#005B94] hover:bg-[#003B64] text-white text-[10px] font-medium px-3 py-1 rounded transition-colors"
                    >
                      Virtual Configurator
                    </button>
                    <button
                      onClick={() => handleProductClick("omnis-nir-liquid")}
                      className="text-gray-700 hover:text-[#005B94] text-[10px] font-semibold flex items-center gap-0.5"
                    >
                      Specs <ChevronRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Quick Navigation Cards */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-gray-700 tracking-wider uppercase">More Services</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setProductCategoryFilter("All");
                        setCurrentScreen("products");
                      }}
                      className="bg-white p-2.5 rounded-lg border border-gray-200 flex items-center gap-2 hover:bg-gray-50 text-left shadow-3xs"
                    >
                      <div className="p-1.5 bg-blue-100 rounded-md text-[#005B94]">
                        <Layers size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-800 block">Catalog</span>
                        <span className="text-[8px] text-gray-400">9 core categories</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setCurrentScreen("knowledge")}
                      className="bg-white p-2.5 rounded-lg border border-gray-200 flex items-center gap-2 hover:bg-gray-50 text-left shadow-3xs"
                    >
                      <div className="p-1.5 bg-teal-100 rounded-md text-teal-700">
                        <BookOpen size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-800 block">Knowledge Hub</span>
                        <span className="text-[8px] text-gray-400">App notes, videos</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setCurrentScreen("support")}
                      className="bg-white p-2.5 rounded-lg border border-[#005B94]/20 flex items-center gap-2 hover:bg-gray-50 text-left shadow-3xs"
                    >
                      <div className="p-1.5 bg-sky-100 rounded-md text-sky-700">
                        <HelpCircle size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-gray-800 block">Help Center</span>
                        <span className="text-[8px] text-gray-400">Tickets & repairs</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setCurrentScreen("quote")}
                      className="bg-[#005B94] p-2.5 rounded-lg text-white flex items-center gap-2 hover:bg-[#003B64] text-left shadow-3xs"
                    >
                      <div className="p-1.5 bg-white/15 rounded-md text-orange-400">
                        <FileText size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold block">Quotation Request</span>
                        <span className="text-[8px] text-orange-200">Instant quote dispatcher</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* About Quick block */}
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-3xs text-center">
                  <h4 className="text-[10px] font-sans font-bold text-gray-800 uppercase tracking-wide">About Metrohm AG</h4>
                  <p className="text-[9px] text-gray-500 leading-normal mt-1 max-w-xs mx-auto">
                    Metrohm is a global provider of highly trusted instruments and chemical know-how for analytical chemistry laboratories and process environments.
                  </p>
                </div>
              </div>
            )}

            {/* PRODUCT CATALOG SCREEN */}
            {currentScreen === "products" && (
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-sans font-bold text-gray-800 uppercase tracking-wide">Product Catalog</h3>
                  <span className="text-[9px] text-gray-400 font-mono">{filteredProducts.length} devices</span>
                </div>

                {/* Horizontal Category Pill filters */}
                <div className="flex gap-1 overflow-x-auto pb-1 select-none whitespace-nowrap scrollbar-none">
                  {["All", "Titration", "OMNIS NIR Liquid", "OMNIS NIR Solid", "Ion Chromatography", "Electrochemistry", "Accessories"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setProductCategoryFilter(cat)}
                      className={`text-[9px] px-2.5 py-1 rounded-full border transition-all ${
                        productCategoryFilter === cat 
                          ? "bg-[#005B94] text-white border-transparent font-medium" 
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Filter segments (Industries shortcut) */}
                <div className="bg-white p-2 rounded-lg border border-gray-200 flex items-center justify-between">
                  <span className="text-[8px] text-gray-500 font-bold uppercase tracking-wider">Industry Relevance:</span>
                  <select
                    className="text-[9px] bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 focus:outline-none"
                    value={industryFilter}
                    onChange={(e) => setIndustryFilter(e.target.value)}
                  >
                    <option value="All">All Industries</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Chemicals">Chemicals</option>
                    <option value="Environmental">Environmental Systems</option>
                    <option value="Food & Beverage">Food & Beverage Labs</option>
                  </select>
                </div>

                {/* Products Grid */}
                <div className="space-y-2.5">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => {
                      const isSaved = userSession.userProfile?.savedProducts.includes(p.id);
                      return (
                        <div key={p.id} className="bg-white rounded-lg border border-gray-200 p-2.5 flex gap-2.5 relative hover:border-gray-300 transition-colors">
                          <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-md bg-gray-100 shrink-0" />
                          <div className="flex-1 min-w-0 space-y-1">
                            <span className="text-[8px] font-extrabold text-[#005B94] tracking-wider uppercase block">{p.category}</span>
                            <h4 
                              onClick={() => handleProductClick(p.id)} 
                              className="text-xs font-bold text-gray-900 cursor-pointer hover:text-orange-500 transition-colors leading-tight truncate"
                            >
                              {p.name}
                            </h4>
                            <p className="text-[9px] text-gray-500 leading-snug line-clamp-2">
                              {p.description}
                            </p>
                            <div className="flex items-center gap-1.5 pt-1">
                              <span className="text-[9px] font-mono text-gray-800 font-bold">{p.priceEstimate || "Request pricing"}</span>
                              <span className="text-gray-300 text-[8px]">•</span>
                              <button
                                onClick={() => handleProductClick(p.id)}
                                className="text-[#005B94] hover:underline text-[9px]"
                              >
                                View Specs
                              </button>
                            </div>
                          </div>

                          {/* Quick Inquiry and Bookmark buttons */}
                          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5">
                            <button
                              onClick={() => toggleSaveProduct(p.id)}
                              className={`p-1 rounded-sm border transition-colors ${
                                isSaved 
                                  ? "bg-orange-50 border-orange-400 text-orange-500" 
                                  : "bg-white border-gray-200 hover:bg-gray-100 text-gray-400"
                              }`}
                              title="Pin to Saved Products"
                            >
                              <Bookmark size={10} className={isSaved ? "fill-orange-500" : ""} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="bg-white p-6 rounded-lg text-center border border-dashed border-gray-300">
                      <span className="text-gray-400 text-[10px] block font-mono">No products match core filters.</span>
                      <button 
                        onClick={() => {
                          setSearchQuery("");
                          setProductCategoryFilter("All");
                          setIndustryFilter("All");
                        }} 
                        className="mt-2 text-[10px] text-[#005B94] font-medium hover:underline"
                      >
                        Reset search filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PRODUCT SPEC DETAIL SCREEN */}
            {currentScreen === "product-detail" && (() => {
              const p = products.find(prod => prod.id === selectedProductId);
              if (!p) return <div className="p-4 text-xs">Product not loaded.</div>;
              const isSaved = userSession.userProfile?.savedProducts.includes(p.id);

              return (
                <div className="space-y-3 p-3">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setCurrentScreen("products")}
                      className="text-[#005B94] text-[10px] hover:underline flex items-center gap-0.5"
                    >
                      <ArrowLeft size={10} /> Back to Catalog
                    </button>
                    <button 
                      onClick={() => toggleSaveProduct(p.id)}
                      className={`text-[9px] flex items-center gap-1 border px-2 py-0.5 rounded ${
                        isSaved ? "bg-orange-50 border-orange-400 text-orange-500" : "bg-white border-gray-200"
                      }`}
                    >
                      <Bookmark size={10} className={isSaved ? "fill-orange-500" : ""} />
                      {isSaved ? "Pinned" : "Pin Product"}
                    </button>
                  </div>

                  <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-xl shadow-3xs" />
                  
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-orange-500 tracking-widest uppercase block">{p.category}</span>
                    <h3 className="text-sm font-sans font-bold text-gray-900 leading-tight">{p.name}</h3>
                    <p className="text-[10px] text-gray-500 font-mono">Est: {p.priceEstimate || "Inquiry needed"}</p>
                  </div>

                  <div className="bg-white rounded-lg p-2.5 border border-gray-100 font-sans text-[10px] text-gray-600 leading-relaxed">
                    {p.longDescription}
                  </div>

                  {/* Highlights / Benefits */}
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">Key Benefits</h4>
                    <div className="space-y-1">
                      {p.benefits.map((b, idx) => (
                        <div key={idx} className="flex gap-1.5 items-start text-[9px] text-gray-600">
                          <CheckCircle size={10} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specs Table */}
                  <div className="space-y-1.5">
                    <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">Technical Specs</h4>
                    <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 text-[8px] font-mono">
                      {Object.entries(p.specs).map(([key, val]) => (
                        <div key={key} className="flex py-1.5 px-2">
                          <span className="w-1/3 text-gray-400 font-bold">{key}</span>
                          <span className="w-2/3 text-gray-700 pl-2">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational controls */}
                  <div className="bg-[#003B64] text-white p-3 rounded-lg flex items-center justify-between shadow-3xs">
                    <div className="space-y-0.5">
                      <span className="text-[8px] text-orange-400 font-bold uppercase block">Procurement</span>
                      <span className="text-[10px] font-sans">Need physical demonstration?</span>
                    </div>
                    <button
                      onClick={() => {
                        setQuoteForm({
                          ...quoteForm,
                          productInterest: p.name
                        });
                        setCurrentScreen("quote");
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-[9px] px-2.5 py-1 rounded transition-colors"
                    >
                      Instant Quote Request
                    </button>
                  </div>

                  {/* Action row (Brochure) */}
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleSimulateDownload(p.name + " User manual", "Application Note")}
                      className="text-[9px] text-[#005B94] hover:underline border border-[#005B94]/30 px-3 py-1 rounded flex items-center gap-1 hover:bg-sky-50"
                    >
                      <Download size={11} /> Manual (PDF)
                    </button>
                    {p.brochureUrl && (
                      <button
                        onClick={() => handleSimulateDownload(p.name + " Product Brochure", "Brochure")}
                        className="text-[9px] bg-[#005B94] text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-[#003B64]"
                      >
                        <FileText size={11} /> Brochure (PDF)
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* KNOWLEDGE HUB SCREEN */}
            {currentScreen === "knowledge" && (
              <div className="p-3 space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-sans font-bold text-gray-800 uppercase tracking-wide">Knowledge Hub</h3>
                  <span className="text-[9px] text-gray-400 font-mono">Expert Articles</span>
                </div>

                {/* Subcategory selectors */}
                <div className="flex gap-1 overflow-x-auto pb-1 whitespace-nowrap scrollbar-none select-none">
                  {["All", "Did You Know?", "Application Note", "Product Guide", "Training Video", "Blog"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setKnowledgeCategory(cat)}
                      className={`text-[9px] px-2.5 py-1 rounded-sm border transition-all ${
                        knowledgeCategory === cat 
                          ? "bg-slate-800 text-white border-transparent" 
                          : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Articles Feed */}
                <div className="space-y-3">
                  {articles
                    .filter(a => knowledgeCategory === "All" || a.category === knowledgeCategory)
                    .map((a) => (
                      <div 
                        key={a.id} 
                        onClick={() => handleArticleClick(a.id)}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:border-gray-300 transition-colors flex flex-col"
                      >
                        {a.imageUrl && (
                          <img src={a.imageUrl} alt={a.title} className="w-full h-24 object-cover" />
                        )}
                        <div className="p-2.5 space-y-1">
                          <div className="flex justify-between items-center text-[8px] font-mono">
                            <span className="text-[#005B94] font-bold uppercase">{a.category}</span>
                            <span className="text-gray-400">{a.publishDate}</span>
                          </div>
                          <h4 className="text-[11px] font-sans font-bold text-gray-800 leading-tight">
                            {a.title}
                          </h4>
                          <p className="text-[10px] text-gray-500 leading-normal line-clamp-2">
                            {a.summary}
                          </p>
                          <div className="flex justify-between items-center pt-1.5 border-t border-gray-50">
                            <span className="text-[9px] font-bold text-gray-400 font-mono">{a.readTime}</span>
                            <span className="text-[10px] text-orange-500 font-mono flex items-center gap-0.5 hover:underline">
                              Read More <ChevronRight size={12} />
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* KNOWLEDGE HUB ARTICLE DETAIL */}
            {currentScreen === "article-detail" && (() => {
              const a = articles.find(art => art.id === selectedArticleId);
              if (!a) return <div className="p-4 text-xs">Article not found.</div>;

              return (
                <div className="p-3 space-y-3">
                  <button 
                    onClick={() => setCurrentScreen("knowledge")}
                    className="text-[#005B94] text-[10px] hover:underline flex items-center gap-0.5"
                  >
                    <ArrowLeft size={10} /> Back to Hub
                  </button>

                  <div className="space-y-1">
                    <span className="text-[8px] font-mono text-[#005B94] uppercase tracking-wider block">{a.category}</span>
                    <h3 className="text-xs font-sans font-bold text-gray-900 leading-snug">{a.title}</h3>
                    <span className="text-[9px] text-gray-400 font-mono">{a.publishDate} • {a.readTime}</span>
                  </div>

                  {a.imageUrl && (
                    <img src={a.imageUrl} alt={a.title} className="w-full h-32 object-cover rounded-lg" />
                  )}

                  {/* If training video, render simulation play screen */}
                  {a.category === "Training Video" && (
                    <div className="bg-slate-900 text-white p-3 rounded-lg space-y-2 text-center aspect-video flex flex-col justify-center items-center shadow-inner relative border border-slate-700">
                      <div className="absolute top-2 left-2 flex items-center gap-1 text-[8px] text-red-500 font-mono font-bold">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
                        STREAM-LINK ONLINE
                      </div>
                      <Youtube size={32} className="text-red-500 animate-pulse cursor-pointer" />
                      <span className="text-[10px] block font-semibold">Simulated Technical Masterclass</span>
                      <span className="text-[8px] text-gray-400 max-w-[80%]">Click to query real-time training credentials in Metrohm support database.</span>
                    </div>
                  )}

                  <div className="bg-white p-3 rounded-lg border border-gray-100 text-[10px] text-gray-700 leading-relaxed whitespace-pre-line font-sans">
                    {a.content}
                  </div>

                  {/* Call to actions */}
                  <div className="bg-gray-100 p-2.5 rounded-lg flex items-center justify-between text-[9px]">
                    <span className="text-gray-400 font-mono">Reference documentation</span>
                    <button
                      onClick={() => handleSimulateDownload(a.title + " Reference Sheet", "Application Note")}
                      className="bg-slate-800 text-white font-medium px-2.5 py-1 rounded hover:bg-slate-900 transition-colors"
                    >
                      Save App Note (PDF)
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* VIRTUAL OMNIS NIR CONFIGURATOR */}
            {currentScreen === "omnis-nir" && (
              <div className="p-3 space-y-4">
                <div className="space-y-1">
                  <span className="text-[8px] bg-indigo-500 text-white font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">Virtual Configurator</span>
                  <h3 className="text-sm font-sans font-bold text-gray-900">OMNIS Spectrometer Finder</h3>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    Select your operational targets below to extract the exact calibrated wavelength grids and robotic modules.
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-3.5 shadow-3xs">
                  {/* Sample State */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-extrabold text-gray-700 uppercase tracking-wider block">1. What is your chemical state?</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: "liquid", label: "Liquids" },
                        { id: "solid", label: "Powders / Coarse" },
                        { id: "slurry", label: "Slurries / Oils" }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setNirSampleForm(opt.id as any)}
                          className={`p-1.5 text-[9px] border rounded transition-all text-center ${
                            nirSampleForm === opt.id 
                              ? "bg-[#005B94] text-white border-transparent" 
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Industry Space */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-extrabold text-gray-700 uppercase tracking-wider block">2. Primary Industry Segment</label>
                    <select
                      className="w-full text-[10px] border border-gray-200 bg-gray-50 rounded px-2 py-1"
                      value={nirIndustrySelection}
                      onChange={(e) => setNirIndustrySelection(e.target.value)}
                    >
                      <option value="Pharmaceuticals">Pharmaceutical assays (FDA Compliance)</option>
                      <option value="Chemicals">Dense Industrial Chemicals / Resins</option>
                      <option value="Environmental">Water profiling / Saline soil</option>
                      <option value="Food">Food quality assay (Fats & Moisture)</option>
                    </select>
                  </div>

                  {/* Automation */}
                  <div className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-bold text-gray-700 block">3. Automated Processing</span>
                      <span className="text-[8px] text-gray-400">Need parallel vial robots?</span>
                    </div>
                    <input
                      type="checkbox"
                      className="rounded text-[#005B94] focus:ring-1 focus:ring-[#005B94] h-3.5 w-3.5 cursor-pointer"
                      checked={nirAutomationReq}
                      onChange={(e) => setNirAutomationReq(e.target.checked)}
                    />
                  </div>
                </div>

                {/* Recommender Result Display */}
                <div className="bg-gradient-to-br from-indigo-900 to-[#003B64] text-white p-3.5 rounded-xl space-y-2.5 shadow-sm">
                  <span className="text-[8px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">Algorithmic Recommendation</span>
                  
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-orange-400">{dynamicNirAdvice.title}</h4>
                    <span className="text-[9px] font-mono text-gray-300">Accuracy limits: {dynamicNirAdvice.accuracy}</span>
                  </div>

                  <p className="text-[9px] text-gray-200 leading-normal">
                    {dynamicNirAdvice.justification}
                  </p>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => {
                        // Quick click specs
                        handleProductClick(dynamicNirAdvice.systemId);
                      }}
                      className="text-[9px] text-white hover:underline flex items-center gap-0.5"
                    >
                      Technical spec worksheet <ExternalLink size={10} />
                    </button>
                    <button
                      onClick={() => {
                        setQuoteForm({
                          ...quoteForm,
                          productInterest: dynamicNirAdvice.title,
                          industry: nirIndustrySelection,
                          message: `Generated via App Configurator. State: ${nirSampleForm}, Automation required: ${nirAutomationReq ? 'Yes' : 'No'}`
                        });
                        setCurrentScreen("quote");
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium text-[9px] px-2.5 py-1 rounded transition-colors"
                    >
                      Request Quotation
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* REQUEST A QUOTATION SCREEN */}
            {currentScreen === "quote" && (
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-sans font-bold text-gray-800 uppercase tracking-wide">Quotation Request Desk</h3>
                  <p className="text-[10px] text-gray-400">
                    Submit chemical/instrument parameters. Our system streams immediate pricing options to your inbox.
                  </p>
                </div>

                <form onSubmit={handleRequestQuote} className="bg-white p-3 rounded-xl border border-gray-200 space-y-3 shadow-3xs">
                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded"
                      required
                      placeholder="e.g. Dr. Jane Smith"
                      value={quoteForm.fullName}
                      onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Company Name</label>
                    <input
                      type="text"
                      className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded"
                      required
                      placeholder="e.g. Pfizer Diagnostics"
                      value={quoteForm.companyName}
                      onChange={(e) => setQuoteForm({ ...quoteForm, companyName: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded"
                        required
                        placeholder="corplink@company.com"
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
                      <input
                        type="tel"
                        className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded"
                        placeholder="+1 (---) --- ----"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Product Choice</label>
                      <select
                        className="w-full text-[10px] p-1.5 bg-gray-50 border border-gray-200 rounded"
                        value={quoteForm.productInterest}
                        onChange={(e) => setQuoteForm({ ...quoteForm, productInterest: e.target.value })}
                      >
                        {products.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Industry Space</label>
                      <select
                        className="w-full text-[10px] p-1.5 bg-gray-50 border border-gray-200 rounded"
                        value={quoteForm.industry}
                        onChange={(e) => setQuoteForm({ ...quoteForm, industry: e.target.value })}
                      >
                        <option value="Pharmaceuticals">Pharmaceuticals</option>
                        <option value="Chemicals">Chemical Solvents</option>
                        <option value="Environmental">Water / Ecology</option>
                        <option value="Food & Beverage">Food & Biotech</option>
                        <option value="Academic">University Research</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] font-bold text-gray-500 uppercase tracking-wide">Inquiry Message</label>
                    <textarea
                      rows={2}
                      className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded focus:outline-none"
                      placeholder="e.g. Looking for custom warranty tiers, calibration standards..."
                      value={quoteForm.message}
                      onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#005B94] hover:bg-[#003B64] text-white font-bold py-2 rounded text-xs transition-colors shadow-3xs"
                  >
                    Submit Quotation Dispatcher
                  </button>
                </form>
              </div>
            )}

            {/* SUPPORT & SERVICE DESK */}
            {currentScreen === "support" && (
              <div className="p-3 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-sans font-bold text-gray-800 uppercase tracking-wide text-[#005B94]">Technical Help Desk</h3>
                  <p className="text-[10px] text-gray-500 leading-normal">
                    Lodge repair requests, download service logs, and create high-priority engineering tickers.
                  </p>
                </div>

                {/* Grid utility metrics */}
                <div className="grid grid-cols-2 gap-2 text-center text-gray-800">
                  <div className="bg-white p-2.5 rounded-lg border border-gray-200 space-y-1 shadow-3xs">
                    <Clock size={14} className="text-[#005B94] mx-auto" />
                    <span className="text-[10px] font-bold block">4 Hours</span>
                    <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wide">Average SLA</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-gray-200 space-y-1 shadow-3xs">
                    <CheckCircle size={14} className="text-emerald-500 mx-auto" />
                    <span className="text-[10px] font-bold block">99.8%</span>
                    <span className="text-[7.5px] text-gray-400 uppercase font-bold tracking-wide">Resolution rate</span>
                  </div>
                </div>

                {/* Form to submit support ticket */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 space-y-3 shadow-3xs">
                  <h4 className="text-[10px] font-bold text-gray-800 uppercase tracking-wide">Create Engineering Ticket</h4>
                  
                  <form onSubmit={handleCreateTicket} className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">Full Name</label>
                        <input
                          type="text"
                          className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded"
                          required
                          value={ticketForm.fullName}
                          onChange={(e) => setTicketForm({ ...ticketForm, fullName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">Email</label>
                        <input
                          type="email"
                          className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded"
                          required
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">Support Category</label>
                      <select
                        className="w-full text-[10px] p-1.5 bg-gray-50 border border-gray-200 rounded"
                        value={ticketForm.type}
                        onChange={(e) => setTicketForm({ ...ticketForm, type: e.target.value as any })}
                      >
                        <option value="Technical Support">Technical Support (Software/HW)</option>
                        <option value="Repair Service">Repair Service & Alignment</option>
                        <option value="Installation Support">Installation Request</option>
                        <option value="Training Request">User/Team Training Request</option>
                        <option value="Warranty Support">Warranty validation</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">Subject</label>
                      <input
                        type="text"
                        className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded"
                        required
                        placeholder="e.g. IC column pressure leak issues"
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">Detail message</label>
                      <textarea
                        rows={2}
                        className="w-full text-xs p-1.5 bg-gray-50 border border-gray-200 rounded focus:outline-none"
                        required
                        placeholder="Detail errors, product serial numbers, or calibration logs..."
                        value={ticketForm.message}
                        onChange={(e) => setTicketForm({ ...ticketForm, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#005B94] hover:bg-[#003B64] text-white text-xs font-bold py-2 rounded transition-colors shadow-3xs"
                    >
                      Lodge Private Ticket
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* INTEGRATED FINDER TOOLS (MSDS, CERTIFICATE, COLUMN, ELECTRODES) */}
            {currentScreen === "finders" && (
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-sans font-bold text-gray-800 uppercase tracking-wide text-[#005B94]">Integrated Lab Finders</h3>
                  <p className="text-[9px] text-gray-400">Search chemical parameters dynamically to download matching sheets.</p>
                </div>

                {/* Tabs selection */}
                <div className="flex bg-gray-200 p-0.5 rounded-lg select-none text-[8.5px] font-bold">
                  {[
                    { id: "msds", label: "MSDS" },
                    { id: "certificate", label: "Certs" },
                    { id: "electrode", label: "Electrodes" },
                    { id: "column", label: "IC Columns" }
                  ].map((tb) => (
                    <button
                      key={tb.id}
                      onClick={() => {
                        setActiveFinderTab(tb.id as any);
                        setFinderSearchText("");
                      }}
                      className={`flex-1 py-1 text-center rounded transition-colors ${
                        activeFinderTab === tb.id ? "bg-white text-slate-900 shadow-3xs" : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      {tb.label}
                    </button>
                  ))}
                </div>

                {/* FINDER CONTENT: MSDS */}
                {activeFinderTab === "msds" && (
                  <div className="space-y-2.5">
                    <input
                      type="text"
                      className="w-full search bg-white border border-gray-200 rounded p-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#005B94]"
                      placeholder="Filter by reagent or CAS number..."
                      value={finderSearchText}
                      onChange={(e) => setFinderSearchText(e.target.value)}
                    />

                    <div className="space-y-1.5 max-h-[220px] overflow-y-auto">
                      {msdsData
                        .filter(item => item.productName.toLowerCase().includes(finderSearchText.toLowerCase()) || item.casNumber.includes(finderSearchText))
                        .map(item => (
                          <div key={item.id} className="bg-white p-2 rounded border border-gray-150 flex items-center justify-between text-[10px]">
                            <div className="space-y-0.5 pr-2">
                              <span className="font-bold text-gray-900 leading-tight block">{item.productName}</span>
                              <span className="text-[8px] text-gray-400 font-mono">CAS: {item.casNumber} • Rev: {item.revisionDate}</span>
                            </div>
                            <button
                              onClick={() => handleSimulateDownload(item.productName + " MSDS", "MSDS")}
                              className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500 hover:text-white transition-all p-1.5 rounded"
                              title="Download MSDS Sheet"
                            >
                              <Download size={11} />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* FINDER CONTENT: CERTIFICATES */}
                {activeFinderTab === "certificate" && (
                  <div className="space-y-2.5">
                    <div className="bg-slate-100 p-2.5 rounded-lg border border-gray-200 text-[10px] space-y-1.5">
                      <span className="font-extrabold text-gray-700 uppercase tracking-wider block">Validate Calibration Serial</span>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          className="flex-1 bg-white border border-gray-200 rounded px-1.5 py-1 text-xs font-mono text-gray-700 placeholder:text-gray-300"
                          placeholder="e.g. 2.940.0010-859423"
                          value={certificateSerialInput}
                          onChange={(e) => setCertificateSerialInput(e.target.value)}
                        />
                        <button
                          onClick={() => {
                            if (!certificateSerialInput) {
                              triggerToast("Enter dynamic serial first!");
                              return;
                            }
                            const match = certificates.find(c => c.productSerial.toLowerCase().includes(certificateSerialInput.toLowerCase()));
                            if (match) {
                              triggerToast(`Found matching ${match.type}!`);
                              handleSimulateDownload(match.productName + " Serial Cert", "Certificate");
                            } else {
                              triggerToast("No custom certificates found for this serial in global logs.");
                            }
                          }}
                          className="bg-[#005B94] text-white px-2 py-1 rounded text-[10px] font-bold"
                        >
                          Find
                        </button>
                      </div>
                      <span className="text-[8px] text-gray-400 italic font-mono">Hint: Try '859423' or '120498'</span>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-gray-700 uppercase">Available Certificates</span>
                      <div className="space-y-1.5 max-h-[160px] overflow-y-auto">
                        {certificates.map(item => (
                          <div key={item.id} className="bg-white p-2 rounded border border-gray-150 flex items-center justify-between text-[10px]">
                            <div className="space-y-0.5">
                              <span className="font-bold text-gray-950 block">{item.productName}</span>
                              <span className="text-[8px] text-gray-400 font-mono">S/N: {item.productSerial}</span>
                            </div>
                            <span className="text-[9px] text-[#005B94] font-bold">{item.type.split(" ")[0]}</span>
                            <button
                              onClick={() => handleSimulateDownload(item.productName + " Calibration Sheet", "Certificate")}
                              className="text-gray-500 hover:text-black p-1"
                            >
                              <Download size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* FINDER CONTENT: ELECTRODES */}
                {activeFinderTab === "electrode" && (
                  <div className="space-y-2.5">
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded p-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#005B94]"
                      placeholder="Search applications (e.g. non-aqueous, pH)..."
                      value={finderSearchText}
                      onChange={(e) => setFinderSearchText(e.target.value)}
                    />

                    <div className="space-y-2 max-h-[220px] overflow-y-auto">
                      {electrodes
                        .filter(el => el.name.toLowerCase().includes(finderSearchText.toLowerCase()) || el.application.toLowerCase().includes(finderSearchText.toLowerCase()))
                        .map(el => (
                          <div key={el.id} className="bg-white p-2.5 rounded border border-gray-200 text-[10px] space-y-1">
                            <div className="flex justify-between items-center bg-gray-50 p-1 rounded">
                              <span className="font-bold text-gray-900">{el.name}</span>
                              <span className="text-[8px] bg-slate-200 text-slate-800 font-bold px-1 rounded font-mono">{el.shaftMaterial}</span>
                            </div>
                            <p className="text-[9px] text-gray-500"><strong className="text-gray-700">App:</strong> {el.application}</p>
                            <div className="flex justify-between text-[8px] font-mono text-gray-400">
                              <span>pH: {el.phRange}</span>
                              <span>Temp: {el.tempRange}</span>
                              <span>Electrolyte: {el.electrolyte}</span>
                            </div>
                            <p className="text-[8px] text-gray-400 italic leading-snug">{el.idealFor}</p>
                            <button
                              onClick={() => {
                                setQuoteForm({
                                  ...quoteForm,
                                  productInterest: `${el.name} electrode`
                                });
                                setCurrentScreen("quote");
                              }}
                              className="text-[#005B94] hover:underline font-bold text-[8.5px] block text-right pt-1"
                            >
                              Select & Request Quote
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* FINDER CONTENT: COLUMNS */}
                {activeFinderTab === "column" && (
                  <div className="space-y-2.5">
                    <input
                      type="text"
                      className="w-full bg-white border border-gray-200 rounded p-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#005B94]"
                      placeholder="Select direct analytes (Sodium, Sulfate)..."
                      value={finderSearchText}
                      onChange={(e) => setFinderSearchText(e.target.value)}
                    />

                    <div className="space-y-2 max-h-[220px] overflow-y-auto">
                      {columns
                        .filter(col => col.name.toLowerCase().includes(finderSearchText.toLowerCase()) || col.typicalAnalytes.toLowerCase().includes(finderSearchText.toLowerCase()))
                        .map(col => (
                          <div key={col.id} className="bg-white p-2.5 rounded border border-gray-200 text-[10px] space-y-1">
                            <div className="flex justify-between items-center bg-[#005B94]/5 p-1 rounded border-b border-[#005B94]/10">
                              <span className="font-bold text-[#005B94]">{col.name}</span>
                              <span className="text-[8px] bg-[#005B94] text-white font-bold px-1 rounded font-mono">IC Column</span>
                            </div>
                            <p className="text-[9px] text-gray-600 font-semibold leading-snug"><strong className="text-gray-400 text-[8px] font-mono italic">Analytes:</strong> {col.typicalAnalytes}</p>
                            <div className="grid grid-cols-2 gap-1 text-[8px] font-mono text-gray-400 bg-gray-50 p-1 rounded">
                              <span>Dims: {col.dimensions}</span>
                              <span>pH stability: {col.phStability}</span>
                              <span>Pmax: {col.maxPressure}</span>
                              <span>Support: Polymer basis</span>
                            </div>
                            <p className="text-[8px] text-gray-400 leading-snug italic">{col.recommendedFor}</p>
                            
                            <button
                              onClick={() => {
                                setQuoteForm({
                                  ...quoteForm,
                                  productInterest: `${col.name} separation column`
                                });
                                setCurrentScreen("quote");
                              }}
                              className="text-[#005B94] hover:underline font-bold text-[8.5px] block text-right pt-1"
                            >
                              Add to quote list
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REGISTER & LOGIN SCREEN */}
            {currentScreen === "login" && (
              <div className="p-3 space-y-3">
                <div className="text-center space-y-1 py-1">
                  <h3 className="font-sans font-bold text-sm text-[#005B94]">Company Authentication</h3>
                  <p className="text-[9.5px] text-gray-400">Unlock online certificate validate & continuous inquiry logs.</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="bg-white p-3.5 rounded-xl border border-gray-200 space-y-3.5 shadow-3xs">
                  {/* Select login type */}
                  <div className="flex bg-slate-100 p-0.5 rounded text-[9px] font-bold">
                    {(["Email", "Google", "Company"] as any).map((type: any) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setLoginForm({ ...loginForm, userType: type })}
                        className={`flex-1 py-1 text-center rounded transition-colors ${
                          loginForm.userType === type ? "bg-[#005B94] text-white" : "text-gray-500"
                        }`}
                      >
                        {type === "Company" ? "SAML / SingleSignOn" : type}
                      </button>
                    ))}
                  </div>

                  {loginForm.userType === "Google" ? (
                    <div className="space-y-3 pt-1 text-center">
                      <p className="text-[10px] text-gray-500">Sign in securely using authenticated corporate Google credentials.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginForm({ ...loginForm, email: "researcher.lead@pharmatech.org" });
                          triggerToast("Google credentials prefilled successfully!");
                        }}
                        className="w-full py-2 border border-gray-300 rounded hover:bg-slate-55 flex items-center justify-center gap-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {/* Custom visual element */}
                        <GoogleIcon /> Sync Google Account
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">Corporate Email Address</label>
                        <div className="relative">
                          <Mail size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="email"
                            required
                            className="w-full text-xs pl-8 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded focus:outline-none"
                            placeholder="e.g. scientist@novartis.com"
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8px] text-[#005B94] font-bold uppercase tracking-wider block">Access Password</label>
                        <div className="relative">
                          <Lock size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="password"
                            required
                            className="w-full text-xs pl-8 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded focus:outline-none"
                            placeholder="••••••••"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: "nopassword" })}
                          />
                        </div>
                      </div>

                      {loginForm.userType === "Company" && (
                        <div className="space-y-1">
                          <label className="text-[8px] text-gray-500 font-bold uppercase tracking-wider block">SAML / Organization Domain Node</label>
                          <div className="relative">
                            <Building size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              className="w-full text-xs pl-8 pr-2 py-1.5 bg-gray-50 border border-gray-200 rounded focus:outline-none font-mono"
                              placeholder="e.g. novartis-switzerland-active"
                              value={loginForm.companyCode}
                              onChange={(e) => setLoginForm({ ...loginForm, companyCode: e.target.value })}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2 pt-1">
                    <button
                      type="submit"
                      className="w-full bg-[#005B94] hover:bg-[#003B64] text-white py-2 rounded text-xs font-bold transition-colors shadow-3xs"
                    >
                      Process Authentication
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleGuestBrowsing}
                      className="w-full text-gray-400 hover:text-gray-600 block text-center text-[10px] font-medium"
                    >
                      Proceed as Guest Browser
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* LOGGED IN USER PROFILE PORTAL */}
            {currentScreen === "profile" && (
              <div className="p-3 space-y-4">
                <div className="bg-gradient-to-r from-slate-850 to-slate-800 bg-slate-900 border border-slate-700/50 p-3 rounded-xl text-white relative">
                  
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-bold text-sm text-white shrink-0 border-2 border-slate-700">
                      MS
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-sans font-bold text-white leading-snug truncate">{userSession.userProfile?.name || "Analytical Associate"}</h4>
                      <span className="text-[9px] text-[#005B94] font-bold block">{userSession.userProfile?.company || "Consolidated Chemical Inc."}</span>
                      <span className="text-[8px] text-gray-400 block font-mono">{userSession.userProfile?.email || "guest@laboratory.org"}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="absolute top-2.5 right-2.5 p-1 bg-white/10 hover:bg-white/20 text-red-300 hover:text-red-400 rounded transition-all"
                    title="Sign Out"
                  >
                    <LogOut size={12} />
                  </button>
                </div>

                {/* Saved products block */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Saved Instruments ({userSession.userProfile?.savedProducts.length || 0})</span>
                  <div className="space-y-1.5">
                    {userSession.userProfile?.savedProducts && userSession.userProfile.savedProducts.length > 0 ? (
                      userSession.userProfile.savedProducts.map(id => {
                        const original = products.find(p => p.id === id);
                        if (!original) return null;
                        return (
                          <div key={id} className="bg-white p-2 rounded-lg border border-gray-200 flex justify-between items-center text-[10px]">
                            <span 
                              className="font-bold cursor-pointer hover:text-[#005B94] truncate shrink-0 pr-1 max-w-[65%]"
                              onClick={() => handleProductClick(id)}
                            >
                              {original.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setQuoteForm({ ...quoteForm, productInterest: original.name });
                                  setCurrentScreen("quote");
                                }}
                                className="bg-[#005B94] hover:bg-[#003B64] text-white px-2 py-0.5 rounded text-[8.5px] font-bold"
                              >
                                Quote
                              </button>
                              <button
                                onClick={() => toggleSaveProduct(id)}
                                className="text-red-500 p-1"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <span className="text-[9px] block text-gray-400 italic">No pinned products yet. Watch catalog products to add bookmarks!</span>
                    )}
                  </div>
                </div>

                {/* Quotes log trace */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Recent Quotation Requests</span>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {quotes.filter(q => q.email === userSession.userProfile?.email || q.fullName.toLowerCase().includes("sterling")).map(q => (
                      <div key={q.id} className="bg-white p-2 rounded border border-gray-200 text-[10px] space-y-1">
                        <div className="flex justify-between items-center text-[8.5px] font-mono">
                          <span className="font-bold text-gray-500">Inquiry ID: #{q.id.split("-")[1] || "84291"}</span>
                          <span className={`px-1 rounded font-bold ${
                            q.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"
                          }`}>{q.status}</span>
                        </div>
                        <h5 className="font-bold text-gray-800">{q.productInterest}</h5>
                        <p className="text-[8px] text-gray-400 font-mono italic">{q.createdAt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support tickets logged */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Help-Desk Tickers</span>
                  <div className="space-y-1.5 max-h-[140px] overflow-y-auto">
                    {tickets.map(t => (
                      <div key={t.id} className="bg-white p-2 rounded border border-gray-150 text-[10px] space-y-1">
                        <div className="flex justify-between items-center text-[8px] font-mono">
                          <span className="font-bold text-[#005B94]">{t.ticketNumber}</span>
                          <span className={`px-1 font-bold rounded ${
                            t.status === "Open" ? "bg-red-50 text-red-700" : "bg-slate-200 text-slate-800"
                          }`}>{t.status}</span>
                        </div>
                        <p className="font-bold text-gray-800 leading-tight">{t.subject}</p>
                        <p className="text-[8px] text-gray-400 font-mono">Logged: {t.createdAt}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* History download tracking logs */}
                <div className="space-y-1.5 bg-gray-100 p-2.5 rounded-lg border border-gray-200">
                  <span className="text-[9px] font-bold text-gray-700 uppercase block">Action Logs & Download History</span>
                  <div className="space-y-1">
                    {userSession.userProfile?.downloadHistory.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[8px] font-mono text-gray-500">
                        <span className="truncate max-w-[70%]">{item.title}</span>
                        <span className="text-gray-400 shrink-0">{item.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* SOCIAL MEDIA & FOOTER OVERLAY BAR */}
          <div className="bg-slate-900 text-white p-2 flex flex-col items-center gap-1 border-t border-slate-800">
            {/* Social Icons row */}
            <div className="flex gap-4">
              <a href="https://linkedin.com/company/metrohm" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-orange-400 transition-colors">
                <Linkedin size={13} />
              </a>
              <a href="https://facebook.com/metrohm" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-orange-400 transition-colors">
                <Facebook size={13} />
              </a>
              <a href="https://youtube.com/metrohm" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-orange-400 transition-colors">
                <Youtube size={13} />
              </a>
              <a href="https://instagram.com/metrohm" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-orange-400 transition-colors">
                <Instagram size={13} />
              </a>
            </div>
            
            {/* Quick legal anchors inside emulator footer */}
            <div className="flex gap-2 text-[6.5px] font-mono text-gray-400/80 uppercase tracking-widest pb-1">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Legal Notice</span>
              <span>•</span>
              <span>Manage Preferences</span>
            </div>
          </div>

          {/* BOTTOM NAVIGATION FIXED TO PHONE FRAME */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-3 py-1.5 flex items-center justify-around text-center z-20 select-none shrink-0">
            <button 
              onClick={() => setCurrentScreen("home")}
              className={`flex flex-col items-center gap-0.5 ${currentScreen === "home" ? "text-[#005B94]" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Home size={15} />
              <span className="text-[7.5px] font-medium leading-none">Home</span>
            </button>

            <button 
              onClick={() => {
                setProductCategoryFilter("All");
                setCurrentScreen("products");
              }}
              className={`flex flex-col items-center gap-0.5 ${currentScreen === "products" || currentScreen === "product-detail" ? "text-[#005B94]" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Layers size={15} />
              <span className="text-[7.5px] font-medium leading-none">Products</span>
            </button>

            <button 
              onClick={() => setCurrentScreen("finders")}
              className={`flex flex-col items-center gap-0.5 ${currentScreen === "finders" ? "text-[#005B94]" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Sliders size={15} />
              <span className="text-[7.5px] font-medium leading-none">Finders</span>
            </button>

            <button 
              onClick={() => setCurrentScreen("knowledge")}
              className={`flex flex-col items-center gap-0.5 ${currentScreen === "knowledge" || currentScreen === "article-detail" ? "text-[#005B94]" : "text-gray-400 hover:text-gray-600"}`}
            >
              <BookOpen size={15} />
              <span className="text-[7.5px] font-medium leading-none">Articles</span>
            </button>

            <button 
              onClick={() => setCurrentScreen(userSession.isLoggedIn ? "profile" : "login")}
              className={`flex flex-col items-center gap-0.5 ${currentScreen === "profile" || currentScreen === "login" ? "text-[#005B94]" : "text-gray-400 hover:text-gray-600"}`}
            >
              <User size={15} />
              <span className="text-[7.5px] font-medium leading-none">My Portal</span>
            </button>
          </div>

        </div>

        {/* Home navigation swipe line indicator on Android */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-24 bg-slate-800 rounded-full z-40"></div>

      </div>
    </div>
  );
}

// Inline Micro components for Google Icon
function GoogleIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}
