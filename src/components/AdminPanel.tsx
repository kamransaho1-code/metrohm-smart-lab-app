import { useState, FormEvent } from "react";
import {
  Shield,
  PlusCircle,
  FileText,
  UserCheck,
  Send,
  Bell,
  Trash2,
  CheckCircle,
  Activity,
  AlertCircle,
  TrendingUp,
  Inbox,
  Clock,
  Briefcase,
  HelpCircle,
  Database,
  ArrowRight,
  BookOpen
} from "lucide-react";
import {
  Product,
  Article,
  QuoteRequest,
  SupportTicket,
  CertificateItem,
  PushNotification
} from "../types";

interface AdminPanelProps {
  products: Product[];
  articles: Article[];
  quotes: QuoteRequest[];
  tickets: SupportTicket[];
  certificates: CertificateItem[];
  notifications: PushNotification[];
  onAddProduct: (prod: Product) => void;
  onAddArticle: (art: Article) => void;
  onUpdateQuoteStatus: (id: string, status: QuoteRequest["status"]) => void;
  onUpdateTicketStatus: (id: string, status: SupportTicket["status"]) => void;
  onAddSupportReply: (id: string, message: string) => void;
  onAddCertificate: (cert: CertificateItem) => void;
  onAddNotification: (not: PushNotification) => void;
}

export default function AdminPanel({
  products,
  articles,
  quotes,
  tickets,
  certificates,
  notifications,
  onAddProduct,
  onAddArticle,
  onUpdateQuoteStatus,
  onUpdateTicketStatus,
  onAddSupportReply,
  onAddCertificate,
  onAddNotification
}: AdminPanelProps) {
  // Navigation active tab inside the admin panel
  const [activeAdminTab, setActiveAdminTab] = useState<"quotes" | "tickets" | "products" | "articles" | "certificates" | "push">("quotes");

  // Addition form states
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Titration" as Product["category"],
    description: "",
    longDescription: "",
    benefitsString: "",
    featuresString: "",
    priceEstimate: ""
  });

  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "Application Note" as Article["category"],
    summary: "",
    content: "",
    readTime: "5 min read",
    youtubeUrl: ""
  });

  const [newCert, setNewCert] = useState({
    productSerial: "",
    productName: "",
    type: "Calibration Certificate" as CertificateItem["type"]
  });

  const [newNotification, setNewNotification] = useState({
    title: "",
    body: "",
    targetGroup: "All Users" as PushNotification["targetGroup"]
  });

  const [replyInputs, setReplyInputs] = useState<{ [ticketId: string]: string }>({});

  const handleProductSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.description) return;
    
    const prod: Product = {
      id: "prod-" + Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      description: newProduct.description,
      longDescription: newProduct.longDescription || newProduct.description,
      benefits: newProduct.benefitsString ? newProduct.benefitsString.split("\n").filter(Boolean) : ["Standard high-quality chemical detection"],
      features: newProduct.featuresString ? newProduct.featuresString.split("\n").filter(Boolean) : ["Robust desktop integration"],
      specs: {
        "Spectral/Analytical grid": "Default corporate profile",
        "Lifetime validation": "Complies strictly with 2026 specifications"
      },
      image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600",
      priceEstimate: newProduct.priceEstimate || "Contact Sales"
    };

    onAddProduct(prod);
    setNewProduct({
      name: "",
      category: "Titration",
      description: "",
      longDescription: "",
      benefitsString: "",
      featuresString: "",
      priceEstimate: ""
    });
    alert(`Success: Product "${prod.name}" created and synced in Catalog.`);
  };

  const handleArticleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.content) return;

    const art: Article = {
      id: "art-" + Date.now(),
      title: newArticle.title,
      category: newArticle.category,
      summary: newArticle.summary || newArticle.content.substring(0, 100) + "...",
      content: newArticle.content,
      readTime: newArticle.readTime,
      publishDate: new Date().toISOString().substring(0, 10),
      youtubeUrl: newArticle.youtubeUrl || undefined,
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"
    };

    onAddArticle(art);
    setNewArticle({
      title: "",
      category: "Application Note",
      summary: "",
      content: "",
      readTime: "5 min read",
      youtubeUrl: ""
    });
    alert(`Success: Article "${art.title}" registered inside Knowledge Hub.`);
  };

  const handleCertSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCert.productSerial || !newCert.productName) return;

    const cert: CertificateItem = {
      id: "cert-" + Date.now(),
      productSerial: newCert.productSerial,
      productName: newCert.productName,
      type: newCert.type,
      issuedDate: new Date().toISOString().substring(0, 10),
      pdfSize: "1.1 MB"
    };

    onAddCertificate(cert);
    setNewCert({
      productSerial: "",
      productName: "",
      type: "Calibration Certificate"
    });
    alert(`Success: Certificate Serial ${cert.productSerial} uploaded. Connected to automated download databases.`);
  };

  const handleNotificationSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newNotification.title || !newNotification.body) return;

    const not: PushNotification = {
      id: "not-" + Date.now(),
      title: newNotification.title,
      body: newNotification.body,
      sentAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      targetGroup: newNotification.targetGroup
    };

    onAddNotification(not);
    setNewNotification({
      title: "",
      body: "",
      targetGroup: "All Users"
    });
    alert(`Push Notification: "${not.title}" successfully dispatched to ${not.targetGroup}.`);
  };

  const handleSendReply = (ticketId: string) => {
    const msg = replyInputs[ticketId];
    if (!msg) return;
    onAddSupportReply(ticketId, msg);
    // Clear
    setReplyInputs({ ...replyInputs, [ticketId]: "" });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-350 overflow-hidden shadow-2xl flex flex-col min-h-[620px] text-slate-800">
      
      {/* Telemetry quick header */}
      <div className="bg-[#005596] px-6 py-4 border-b-4 border-[#F29100] flex items-center justify-between text-white shadow-xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/15 border border-white/20 rounded-lg text-white">
            <Shield size={18} />
          </div>
          <div>
            <h2 className="font-display font-black text-[13px] tracking-widest text-white uppercase">Metrohm Administration Portal</h2>
            <span className="text-[10px] text-slate-200 font-mono">Live Database Session Connected</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded text-[10px] font-mono border border-white/20 text-white">
            <Database size={11} className="text-[#F29100]" />
            <span>SQLite Mem-DB</span>
          </div>
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-sm" title="Database operational"></div>
        </div>
      </div>

      {/* Primary Analytics strip summary */}
      <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50">
        {[
          { label: "Submitted Quotes", count: quotes.length, change: "Real-time sync", icon: <Inbox size={15} className="text-[#F29100]" /> },
          { label: "High-Priority Tickets", count: tickets.filter(t => t.status === "Open").length, change: "Active SLA", icon: <HelpCircle size={15} className="text-rose-500" /> },
          { label: "Total Asset Serials", count: certificates.length, change: "Encrypted", icon: <FileText size={15} className="text-[#005596]" /> },
          { label: "Alert Dispatch Log", count: notifications.length, change: "2026 Push Engine", icon: <Bell size={15} className="text-purple-600" /> },
        ].map((met, idx) => (
          <div key={idx} className="p-4 border-r border-slate-200 last:border-0 hover:bg-slate-100/70 transition-colors">
            <div className="flex justify-between items-start">
              <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider">{met.label}</span>
              {met.icon}
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-display font-black tracking-tight text-[#005596]">{met.count}</span>
              <span className="text-[8px] text-slate-400 font-mono">{met.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main split work-desk */}
      <div className="flex-1 flex min-h-0 bg-slate-100">
        
        {/* Left Side Bar Menu Selection */}
        <div className="w-1/4 bg-slate-50 border-r border-slate-200 p-2.5 space-y-1 select-none">
          <span className="px-3 text-[8.5px] font-display font-extrabold text-slate-400 uppercase tracking-widest block pb-1 pt-1 border-b border-slate-200/50 mb-2">Task Schedulers</span>
          {[
            { id: "quotes", label: "Quote Requests", badge: quotes.filter(q => q.status === "Pending").length },
            { id: "tickets", label: "Help Tickets", badge: tickets.filter(t => t.status === "Open").length },
            { id: "products", label: "Catalog Manager" },
            { id: "articles", label: "Knowledge Hub" },
            { id: "certificates", label: "Asset Verifier" },
            { id: "push", label: "Push Alerts", badge: notifications.length },
          ].map((itm) => (
            <button
              key={itm.id}
              onClick={() => setActiveAdminTab(itm.id as any)}
              className={`w-full px-3 py-2.5 text-left rounded-lg text-xs flex justify-between items-center transition-all cursor-pointer ${
                activeAdminTab === itm.id 
                  ? "bg-[#005596] text-white font-bold shadow-xs" 
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <span>{itm.label}</span>
              {itm.badge !== undefined && itm.badge > 0 && (
                <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono leading-none font-black ${
                  activeAdminTab === itm.id 
                    ? "bg-white text-[#005596]" 
                    : "bg-red-500 text-white"
                }`}>
                  {itm.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right workspace content pane */}
        <div className="w-3/4 p-5 overflow-y-auto bg-white space-y-4 text-slate-800">
          
          {/* TAB CONTENT: QUOTE REQUESTS */}
          {activeAdminTab === "quotes" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Configure Inbound Customer Quotations</h4>
                <p className="text-[10px] text-slate-500">Total processed logs: {quotes.length}</p>
              </div>

              <div className="space-y-3">
                {quotes.map((q) => (
                  <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] font-mono text-slate-400">Inquiry Serial #{q.id}</span>
                        <h5 className="font-bold text-sm text-[#005596]">{q.fullName}</h5>
                        <p className="text-[10px] text-slate-600 font-sans">{q.companyName} ({q.country}) • {q.email}</p>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] text-slate-500 font-mono">Status:</span>
                        <select
                          className="bg-white border border-slate-300 text-xs rounded px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                          value={q.status}
                          onChange={(e) => onUpdateQuoteStatus(q.id, e.target.value as any)}
                        >
                          <option value="Pending">Pending Review</option>
                          <option value="In Review">Technical Review</option>
                          <option value="Quotation Sent">PDF Quotation Dispatched</option>
                          <option value="Completed">Completed / Agreed</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs leading-normal">
                      <div className="pb-1 mb-1 border-b border-slate-100 text-[#005596] font-bold uppercase text-[9px] tracking-wide flex justify-between">
                        <span>Product Interest: {q.productInterest}</span>
                        <span>Industry: {q.industry}</span>
                      </div>
                      <p className="text-slate-600 font-sans italic">{q.message || "No accompanying message context detail supplied."}</p>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400">Submitted: {q.createdAt}</span>
                      {q.status === "Pending" ? (
                        <button
                          onClick={() => onUpdateQuoteStatus(q.id, "Quotation Sent")}
                          className="text-xs bg-emerald-600 text-white font-bold px-3 py-1 rounded hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          Send Automated Quotation Sheet
                        </button>
                      ) : (
                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle size={12} /> Approved / Dispatched
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: SUPPORT TICKETS */}
          {activeAdminTab === "tickets" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">SLA Support Ticket Router</h4>

              <div className="space-y-4">
                {tickets.map((t) => (
                  <div key={t.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8.5px] font-mono text-rose-500 font-extrabold">{t.ticketNumber} ({t.type})</span>
                        <h5 className="font-bold text-sm text-[#005596]">{t.subject}</h5>
                        <p className="text-[10px] text-slate-500 font-sans">Lodge by: {t.fullName} • {t.email}</p>
                      </div>

                      <select
                        className="bg-white border border-slate-300 text-xs rounded px-2 py-1 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                        value={t.status}
                        onChange={(e) => onUpdateTicketStatus(t.id, e.target.value as any)}
                      >
                        <option value="Open">Unassigned (Open)</option>
                        <option value="Assigned">Assigned to Engineer</option>
                        <option value="In Progress">Investigation In Progress</option>
                        <option value="Resolved">Resolved & Closed</option>
                      </select>
                    </div>

                    {/* Chat log / thread */}
                    <div className="space-y-2 max-h-[140px] overflow-y-auto bg-white border border-slate-200 p-3 rounded-lg divide-y divide-slate-100">
                      {t.replies?.map((rep, idx) => (
                        <div key={idx} className="pt-2 first:pt-0">
                          <div className="flex justify-between text-[8px] font-mono mb-1">
                            <span className={rep.sender === "User" ? "text-[#F29100]" : "text-[#005596]"}>{rep.sender}</span>
                            <span className="text-slate-450">{rep.timestamp}</span>
                          </div>
                          <p className="text-[11px] font-sans text-slate-700">{rep.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quick Respond */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 bg-white border border-slate-300 text-xs rounded px-2.5 py-1.5 focus:outline-none text-slate-800 font-sans focus:ring-1 focus:ring-[#005596]"
                        placeholder="Type troubleshooting advice or parts tracking numbers..."
                        value={replyInputs[t.id] || ""}
                        onChange={(e) => setReplyInputs({ ...replyInputs, [t.id]: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSendReply(t.id);
                        }}
                      />
                      <button
                        onClick={() => handleSendReply(t.id)}
                        className="bg-[#F29100] hover:bg-orange-600 text-white font-bold text-xs px-3.5 py-1.5 rounded flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Send size={11} /> Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: PRODUCT ACTIONS */}
          {activeAdminTab === "products" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Register Chemical & Spectroscopes Solutions</h4>
              
              <form onSubmit={handleProductSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3.5 shadow-xs">
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Product Name</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      required
                      placeholder="e.g. Eco Titrator Pro Edition 2026"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Analytical Category</label>
                    <select
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                    >
                      <option value="Titration">Titration systems</option>
                      <option value="OMNIS NIR Liquid">OMNIS near-infrared liquids</option>
                      <option value="OMNIS NIR Solid">OMNIS near-infrared solids</option>
                      <option value="Ion Chromatography">Ion Chromatography Columns</option>
                      <option value="Electrochemistry">Electrochemistry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Short Description</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                    required
                    placeholder="Short summary highlighting quick analytical operation..."
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Long Description Specs (Manual Details)</label>
                  <textarea
                    rows={2}
                    className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                    placeholder="Detailed specs (compliance levels, temperature ranges, etc.)..."
                    value={newProduct.longDescription}
                    onChange={(e) => setNewProduct({ ...newProduct, longDescription: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Key Benefits (One per line)</label>
                    <textarea
                      rows={2}
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      placeholder="Fast calibration check&#10;Integrated heat bath (Max 80°C)"
                      value={newProduct.benefitsString}
                      onChange={(e) => setNewProduct({ ...newProduct, benefitsString: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest block">Estimated Value pricing</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      placeholder="e.g. $12,500"
                      value={newProduct.priceEstimate}
                      onChange={(e) => setNewProduct({ ...newProduct, priceEstimate: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#005596] hover:bg-[#003B64] text-white font-bold py-2 rounded text-xs flex justify-center items-center gap-1 shadow-xs transition-colors cursor-pointer"
                >
                  <PlusCircle size={15} /> Sync New Instrument in Mobile Database
                </button>
              </form>
            </div>
          )}

          {/* TAB CONTENT: ADD ARTICLES */}
          {activeAdminTab === "articles" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Upload Knowledge Hub Material</h4>

              <form onSubmit={handleArticleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 shadow-xs">
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Article Title</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      required
                      placeholder="e.g. Setting up Potentiostats for corrosion protection studies"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Content Type</label>
                    <select
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value as any })}
                    >
                      <option value="Application Note">Application Note (Standard SOP)</option>
                      <option value="Product Guide">Equipment Selection Guide</option>
                      <option value="Did You Know?">Did You Know? Quick Tip</option>
                      <option value="Training Video">Technical Video Lesson</option>
                      <option value="Blog">Lab Insights Blog</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Summary (Short Excerpt)</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                    placeholder="Short 2-sentence preview summary..."
                    value={newArticle.summary}
                    onChange={(e) => setNewArticle({ ...newArticle, summary: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Complete Body Content</label>
                  <textarea
                    rows={4}
                    className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none font-sans focus:ring-1 focus:ring-[#005596]"
                    required
                    placeholder="Enter full educational paragraphs and SOP codes..."
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Read/Watch Time Duration</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      placeholder="e.g. 5 min read"
                      value={newArticle.readTime}
                      onChange={(e) => setNewArticle({ ...newArticle, readTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Media Embed URL (Optional for Video lessons)</label>
                    <input
                      type="url"
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none font-mono focus:ring-1 focus:ring-[#005596]"
                      placeholder="e.g. https://www.youtube.com/embed/..."
                      value={newArticle.youtubeUrl}
                      onChange={(e) => setNewArticle({ ...newArticle, youtubeUrl: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#005596] hover:bg-[#003B64] text-white font-bold py-2 rounded text-xs flex justify-center items-center gap-1 transition-colors cursor-pointer"
                >
                  <BookOpen size={14} /> Distribute Article in Mobile App Knowledge Hub
                </button>
              </form>
            </div>
          )}

          {/* TAB CONTENT: ASSET SERIAL CALIBRATION CERTIFICATE */}
          {activeAdminTab === "certificates" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Register Serial Calibration Certificates</h4>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                <p className="text-[10px] text-slate-500">
                  When lab officers enter their Metrohm equipment serialization parameters on the phone, our lookup database validates calibration histories and accuracy profiles instantly. Add custom serial codes below to let users query them.
                </p>

                <form onSubmit={handleCertSubmit} className="grid grid-cols-3 gap-3.5 items-end">
                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Calibration Serial ID</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 font-mono"
                      required
                      placeholder="e.g. 2.940.0010-859423"
                      value={newCert.productSerial}
                      onChange={(e) => setNewCert({ ...newCert, productSerial: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Matching Equipment Name</label>
                    <input
                      type="text"
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800"
                      required
                      placeholder="e.g. 940 Professional IC Vario"
                      value={newCert.productName}
                      onChange={(e) => setNewCert({ ...newCert, productName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Certificate Class</label>
                    <select
                      className="w-full bg-white border border-slate-300 text-xs p-2 rounded text-slate-800"
                      value={newCert.type}
                      onChange={(e) => setNewCert({ ...newCert, type: e.target.value as any })}
                    >
                      <option value="Accuracy Certificate">Factory Accuracy Certificate</option>
                      <option value="Calibration Certificate">Calibration validation report</option>
                      <option value="Quality Declaration">SOP Quality Declaration</option>
                    </select>
                  </div>

                  <div className="col-span-3">
                    <button
                      type="submit"
                      className="w-full bg-[#005596] hover:bg-[#003B64] text-white py-2 rounded text-xs font-bold transition-colors cursor-pointer"
                    >
                      Authenticate Certificate Registry
                    </button>
                  </div>
                </form>

                <div className="pt-2">
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block mb-2">Registered Calibration Assets</span>
                  <div className="space-y-1 max-h-[160px] overflow-y-auto divide-y divide-slate-200">
                    {certificates.map((c) => (
                      <div key={c.id} className="py-2.5 flex justify-between items-center text-xs">
                        <div className="font-mono">
                          <span className="text-[#F29100] font-bold block">{c.productSerial}</span>
                          <span className="text-[10px] text-slate-600">{c.productName}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-[#005596] font-bold block">{c.type}</span>
                          <span className="text-[9px] text-slate-400 font-mono">Issued: {c.issuedDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SEND PUSH ALERTS */}
          {activeAdminTab === "push" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Corporate Push Notification Center</h4>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 shadow-xs">
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Compose high-priority firmware notifications or chemical recall alerts. On-screen logs let you verify dispatch metrics.
                </p>

                <form onSubmit={handleNotificationSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Notification Title</label>
                      <input
                        type="text"
                        className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                        required
                        placeholder="e.g. Critical Safety Alert - Reagent Recall"
                        value={newNotification.title}
                        onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Destination Lab Cohort</label>
                      <select
                        className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                        value={newNotification.targetGroup}
                        onChange={(e) => setNewNotification({ ...newNotification, targetGroup: e.target.value as any })}
                      >
                        <option value="All Users">All Registered Users</option>
                        <option value="Laboratory Managers">Laboratory Managers Only</option>
                        <option value="Quality Control">Quality Control Departments</option>
                        <option value="Research Academics">Research Universities</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-extrabold text-slate-500 uppercase block">Alert Message Body</label>
                    <textarea
                      rows={2}
                      className="w-full bg-white border border-slate-300 text-xs rounded p-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#005596]"
                      required
                      placeholder="Detailed instructions for firmware upgrades or analytical method adjustments..."
                      value={newNotification.body}
                      onChange={(e) => setNewNotification({ ...newNotification, body: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#F29100] hover:bg-orange-600 text-white font-bold py-2 rounded text-xs transition-colors cursor-pointer"
                  >
                    Broadcast Push Notification Now
                  </button>
                </form>

                <div className="border-t border-slate-200 pt-3.5 space-y-2">
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase block">Dispatched Broadcast Logs</span>
                  <div className="space-y-2 max-h-[140px] overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="bg-white p-3 rounded border border-slate-200 text-xs space-y-1 shadow-xs">
                        <div className="flex justify-between items-center text-[9px] font-mono">
                          <span className="text-purple-600 font-extrabold font-mono">Cohorts: {n.targetGroup}</span>
                          <span className="text-slate-400">{n.sentAt}</span>
                        </div>
                        <h6 className="font-bold text-[#005596] text-[11px] leading-tight">{n.title}</h6>
                        <p className="text-[10px] text-slate-650 leading-normal">{n.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
