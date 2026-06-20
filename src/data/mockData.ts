import {
  Product,
  Article,
  MSDSItem,
  CertificateItem,
  ElectrodeItem,
  ColumnItem,
  QuoteRequest,
  SupportTicket,
  PushNotification
} from "../types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "omnis-nir-liquid",
    name: "OMNIS NIR Analyzer Liquid",
    category: "OMNIS NIR Liquid",
    description: "High-performance near-infrared spectrometer for fast, non-destructive, simultaneous measurement of multiple parameters in liquids.",
    longDescription: "The OMNIS NIR Analyzer Liquid represents a breakthrough in routine quality control. By utilizing near-infrared spectroscopy, it allows lab personnel to screen and qualify raw materials, intermediates, and final liquid compositions in less than 10 seconds. No reagents, no waste, and no sample preparation required.",
    benefits: [
      "Simultaneous determination of multiple parameters (e.g., water content, acid value, active ingredients)",
      "Zero sample preparation required - measure directly in vials or beaker cups",
      "Intuitive OMNIS software with automatic model selection and wizard guidance",
      "Full compliance with FDA 21 CFR Part 11 and EU GMP Annex 11 standards",
      "Heated vial holder (configurable up to 80°C) for precise, temperature-controlled measurements"
    ],
    features: [
      "Wavelength range: 800 - 2500 nm",
      "Temperature control precision: ±0.2°C",
      "No specialized sample preparation required",
      "Rugged solid-state design with minimal moving components"
    ],
    specs: {
      "Spectral Range": "800 - 2500 nm (12,500 - 4,000 cm-1)",
      "Resolution": "Better than 2 nm (at 1100 nm)",
      "Measurement Time": "Under 10 seconds",
      "Sample Conditioning": "Integral heated vial section (up to 80°C)",
      "Detector Type": "High-sensitivity InGaAs array detector",
      "Communication": "Gigabit Ethernet (fully integrated with OMNIS platform)"
    },
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=600",
    brochureUrl: "metrohm_brochure_omnis_nir_liquid.pdf",
    isFeatured: true,
    priceEstimate: "$34,500"
  },
  {
    id: "omnis-nir-solid",
    name: "OMNIS NIR Analyzer Solid",
    category: "OMNIS NIR Solid",
    description: "Versatile near-infrared analyzer designed for rapid QC measurements of powders, granules, pellets, and other solid materials.",
    longDescription: "Equipped with a rotating sample cup holder, the OMNIS NIR Analyzer Solid addresses particle size variations and inhomogeneities in powders. Highly reliable quality validation of solid components in chemical, pharmaceutical, and polymer industries is achieved within seconds.",
    benefits: [
      "Robust solid-state spectrometer with a lifespan exceeding 10 years",
      "Rotating sample chamber eliminates errors from non-uniform granule distributions",
      "Unmatched repeatability and low instrument-to-instrument deviation",
      "Ideal for quick validation of incoming excipients and active pharmaceutical ingredients (APIs)",
      "Minimal maintenance required - self-diagnostics execute automatically"
    ],
    features: [
      "Rotating sample turntable for highly representative scanning",
      "Pre-calibration capabilities with free OMNIS calibration tools",
      "Excellent signal-to-noise ratio for precise low-concentration detection",
      "Dust-resistant lab housing to withstand industrial factory and storage surroundings"
    ],
    specs: {
      "Spectral Range": "800 - 2500 nm",
      "Turntable Speed": "10 - 60 RPM (adjustable)",
      "Wavelength Accuracy": "±0.1 nm",
      "Photometric Noise": "< 10 μAU (peak-to-peak)",
      "Light Source": "High-intensity Halogen bulb (10,000 hrs average lifetime)"
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
    brochureUrl: "metrohm_brochure_omnis_nir_solid.pdf",
    isFeatured: true,
    priceEstimate: "$37,200"
  },
  {
    id: "omnis-titrator",
    name: "OMNIS Professional Titrator",
    category: "Titration",
    description: "The modular high-end potentiometric titration platform. Connect multiple sample robots, dosing units, and titration cells.",
    longDescription: "Unmatched modularity in a modern design. The OMNIS Titrator allows you to safely dispense toxic reagents with patented Liquid Adapter technology, scale up sample automation as your demand grows, and run parallel titrations on a single software interface.",
    benefits: [
      "Liquid Adapter safe chemical management with integrated RFID chip details",
      "Up to 5 secure parallel titrations on a single software cluster",
      "Intelligent dosing systems block cross-contamination dynamically",
      "Scales from standalone manual titration to full robotic conveyers"
    ],
    features: [
      "RFID-tagged smart cylinder exchanges",
      "Dual or triple workstation integration",
      "Automatic reagent volume calculation and tracking",
      "Customizable analytical method creator"
    ],
    specs: {
      "Titraiton Modes": "DET, MET, SET, STAT, MEAS",
      "Burette Resolution": "1/100,000 of cylinder volume",
      "RFID Sensor": "13.56 MHz, integrated in dosing lock",
      "Inputs": "Up to 4 analog, 2 digital meas channels per module"
    },
    image: "https://images.unsplash.com/photo-1617155093730-a8bf47be792d?auto=format&fit=crop&q=80&w=600",
    brochureUrl: "metrohm_omnis_titrator.pdf",
    isFeatured: true,
    priceEstimate: "$18,900"
  },
  {
    id: "professional-ic-vario",
    name: "940 Professional IC Vario",
    category: "Ion Chromatography",
    description: "Professional research-grade ion chromatography system for complex anion, cation, and carbohydrate separation.",
    longDescription: "The absolute standard for research and routine determination of ionic concentrations. Fully automated sample preparation systems (MISP) support chemical dilution, partial-loop injection, ultrafiltration, and continuous inline dialysis.",
    benefits: [
      "Unrestricted setup configurations for custom separation runs",
      "Highly selective conductivity, electrochemical, and UV/VIS detectors",
      "Patented Metrohm Suppressor Module (MSM) with 10-year service warranty",
      "Inline Sample Preparation options cut manual filtration time entirely"
    ],
    features: [
      "Dual-channel parallel analysis (anions and cations in one run)",
      "Smart IC column detection with electronic chip registration",
      "Trace-level detection limits (ng/L or ppt levels)",
      "Intelligent metal-free peek chemical flowpath"
    ],
    specs: {
      "Max Pressure": "35 MPa (350 bar)",
      "Piston Flow Range": "0.001 to 20 mL/min",
      "Piston Pulsation": "< 1% (continuous trace suppress)",
      "Detector Chamber Temp": "20 - 50°C accuracy ±0.01°C"
    },
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=600",
    brochureUrl: "metrohm_940_ic_vario.pdf",
    isFeatured: false,
    priceEstimate: "$29,000"
  },
  {
    id: "pgstat204",
    name: "Autolab PGSTAT204 Electrochemistry Tool",
    category: "Electrochemistry",
    description: "Compact, modular potentiostat/galvanostat for energy storage, battery tests, corrosion evaluation, and sensor development.",
    longDescription: "A versatile instrument that fits in small desks but delivers macro performance. Delivers a compliance voltage of 20 V with a maximum current output of 400 mA, and allows easy expandability with high-speed FRA32M impedance analysis modules.",
    benefits: [
      "Compact footprint, saving expensive lab workbench areas",
      "Unsurpassed Autolab NOVA software offering flexible command macro builders",
      "Modular design: attach impedance, current booster, or optical sensors easily",
      "Excellent current resolution down to 10 fA with low-current modules"
    ],
    features: [
      "Galvanic isolation for grounded cell work",
      "Electrochemical Impedance Spectroscopy (EIS) ready module",
      "External analog control input and dual BNC monitoring adapters"
    ],
    specs: {
      "Compliance Voltage": "±20 V",
      "Potential Range": "±10 V",
      "Maximum Current": "±400 mA",
      "Current Ranges": "10 mA to 10 nA (standard modules)"
    },
    image: "https://images.unsplash.com/photo-1607619056574-7b8d304f3c6f?auto=format&fit=crop&q=80&w=600",
    brochureUrl: "metrohm_autolab_pgstat.pdf",
    isFeatured: false,
    priceEstimate: "$14,800"
  },
  {
    id: "omnis-sample-robot",
    name: "OMNIS sample Robot Integration",
    category: "Automation",
    description: "Multi-workstation sample robotics handling up to 175 tubes of raw chemical solutions simultaneously.",
    longDescription: "The OMNIS Sample Robot boosts productivity when processing extensive sample flows. Equipped with adaptive liquid sensors, high-throughput needle washing cycles, and automatic titration rack rotators, it transforms manual labs into zero-touch centers.",
    benefits: [
      "Run up to 4 simultaneous determinations in parallel chambers",
      "Expandable modular tray structure accommodates 175 chemical vials",
      "Barcode scanning prevents human mixture entry errors",
      "Automated cleaning protocols minimize crossover carryovers to < 0.01%"
    ],
    features: [
      "RFID rack auto-identification on layout desks",
      "Fast sample syringe injections",
      "Compact sliding pick-and-place gripper layout"
    ],
    specs: {
      "Capacity": "Up to 175 x 75 mL tubes / 120 x 120 mL tubes",
      "Workstations": "Supports 1-4 distinct titration/NIR probe heads",
      "Gripper Speed": "Up to 500 mm/sec on triple axis guides"
    },
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=600",
    brochureUrl: "metrohm_omnis_automation.pdf",
    isFeatured: false,
    priceEstimate: "$19,500"
  },
  {
    id: "smart-electrode-ec",
    name: "iUnitrode Glass Electrode",
    category: "Accessories",
    description: "Intelligent smart pH glass electrode with built-in memory chip storing calibration histories, serials, and operational statuses.",
    longDescription: "Features an automatic sensor memory that keeps calibration variables current, regardless of which OMNIS instrument it connects with. This eliminates incorrect manual entry errors and secures a safe GLP laboratory sequence.",
    benefits: [
      "Built-in EEPROM chip maintains individual cell slope data securely",
      "Clogged diaphragm indicators prompt laboratory cleaning sequences",
      "Robust ground-joint sleeve is ideal for complex chemical reactions",
      "Immediate calibration validation alerts when parameters drift outside parameters"
    ],
    features: [
      "Maintenance-free reference electrolyte reservoir",
      "Hermetically sealed cable connection terminal",
      "Integrated Pt1000 temperature sensor for accurate temp resolution"
    ],
    specs: {
      "pH Range": "0 to 14",
      "Temperature Range": "-5 to 100°C",
      "Shaft Diameter": "12 mm",
      "Reference Electrolyte": "KCl 3 mol/L saturated"
    },
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600",
    brochureUrl: "iunitrode_user_manual.pdf",
    isFeatured: false,
    priceEstimate: "$490"
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    title: "OMNIS NIR Liquid vs Gas Chromatography: Which to choose to cut costs?",
    category: "Did You Know?",
    summary: "A practical guide comparing how NIR technology can eliminate routine solvent waste, sample preparation, and lower analysis time by up to 90% compared to traditional capillary GC workflows.",
    content: "Routine analysis of petrochemical active metrics or water dilution in organic matrices has traditionally been the exclusive domain of Gas Chromatography (GC). While highly accurate, GC requires specialized column supplies, bulk solvent buffers, gas cartridges, and a rigorous preparation workflow. Modern NIR spectrometers can process identical compositions in a fraction of a second, with zero continuous supply materials, and immediate automated calculations integrated into digital dashboards.",
    readTime: "4 min read",
    publishDate: "2026-05-12",
    imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "art-2",
    title: "Understanding FDA 21 CFR Part 11 Compliance in Ion Chromatography",
    category: "Product Guide",
    summary: "Learn how the electronic signatures, draft approvals, and persistent audit logs inside Metrohm MagIC Net and OMNIS Software protect high-stakes digital record integrity.",
    content: "Data security and audit accountability are top-tier operational targets for modern analytical pharma groups. To satisfy the demands of strict state audits, laboratory instruments must maintain tamper-free logs of every calibration, analytical execution, and report review. Learn standard steps to secure network permissions, allocate team validation tiers, and configure continuous system backups without interrupting baseline high-throughput production.",
    readTime: "6 min read",
    publishDate: "2026-06-01",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "art-3",
    title: "Karl Fischer Titration Troubleshooting Guide for Clogged Microcells",
    category: "Application Note",
    summary: "An inline checklist explaining the classic mechanics behind cell blockage, current drift indicators, and manual cleaning solutions utilizing soft polar clean-up solutions.",
    content: "When analyzing high-moisture chemical targets, the delicate titration cell glass filters of Coulometric titrators can collect tar, dense organic precipitates, or carbon compounds. This quickly raises baseline background current drifts, triggering false end-points or delayed calculation loops. We highlight critical actions to remove deposits safely using non-reactive, water-free wash protocols, and outline correct ways to confirm cell calibration before executing mass samples.",
    readTime: "8 min read",
    publishDate: "2026-06-15",
    imageUrl: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "art-4",
    title: "Training Video: Calibrating OMNIS NIR Analyzer Solid for Fine Powders",
    category: "Training Video",
    summary: "Visual step-by-step masterclass demonstrating correct cup-filling densities, sample orientation, and model matching calculations within OMNIS Calibration Module.",
    content: "Watch our expert chemical support engineering lead as she guides through standard practices for powder homogenization. Learn how rotating sample cups counteract granularity variations, how to configure background calibration scans, and standard workflows to validate root mean square errors on custom test regressions.",
    readTime: "12 min watch",
    publishDate: "2026-04-20",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Demo link
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "art-5",
    title: "Five Quick Preventive Lubrication Protocols for Titration Burette Pistons",
    category: "Blog",
    summary: "Ensure high resolution mechanical dosing runs smoothly with these basic quarterly cleaning and sealing checklists directly recommended by factory assembly engineers.",
    content: "Consistent precise reagent dosing is direct product of regular burette maintenance. When heavy saline solutions reside in cylinders for extended runs, microcrystals can deposit at seals, inducing leakage or motor stresses. By following basic quarterly cleaning guides, your system preserves precise dosing measurements for years of seamless service.",
    readTime: "3 min read",
    publishDate: "2026-06-18",
    imageUrl: "https://images.unsplash.com/photo-1581093196867-966b03c48991?auto=format&fit=crop&q=80&w=400"
  }
];

export const MOCK_MSDS: MSDSItem[] = [
  { id: "msds-1", productName: "Karl Fischer Coulometric Reagent A (Anolyte)", casNumber: "67-56-1 (Methanol)", language: "English (US)", revisionDate: "2026-01-10", pdfSize: "324 KB" },
  { id: "msds-2", productName: "Karl Fischer Reagent T (Catholyte)", casNumber: "75-09-2 (Dichloromethane)", language: "English (UK)", revisionDate: "2025-11-24", pdfSize: "290 KB" },
  { id: "msds-3", productName: "pH 4.00 Buffer Solution (Phthalate)", casNumber: "877-24-7", language: "English (US)", revisionDate: "2026-03-01", pdfSize: "145 KB" },
  { id: "msds-4", productName: "pH 7.00 Buffer Solution (Phosphate)", casNumber: "7778-77-0", language: "German (DE)", revisionDate: "2026-02-15", pdfSize: "158 KB" },
  { id: "msds-5", productName: "pH 9.00 Buffer Solution (Borate)", casNumber: "1303-96-4", language: "French (FR)", revisionDate: "2026-03-10", pdfSize: "180 KB" },
  { id: "msds-6", productName: "Lithium Metaborate Spectrophotometric Flux", casNumber: "12007-60-2", language: "English (US)", revisionDate: "2025-08-04", pdfSize: "210 KB" }
];

export const MOCK_CERTIFICATES: CertificateItem[] = [
  { id: "cert-1", productSerial: "2.940.0010-859423", productName: "940 Professional IC Vario", type: "Accuracy Certificate", issuedDate: "2025-10-12", pdfSize: "1.2 MB" },
  { id: "cert-2", productSerial: "2.1001.0010-120498", productName: "OMNIS Liquid NIR Spectrometer", type: "Calibration Certificate", issuedDate: "2026-02-22", pdfSize: "980 KB" },
  { id: "cert-3", productSerial: "2.1001.0020-130954", productName: "OMNIS Solid NIR Spectrometer", type: "Calibration Certificate", issuedDate: "2026-03-05", pdfSize: "1.0 MB" },
  { id: "cert-4", productSerial: "2.905.0020-745122", productName: "iUnitrode Intelligent Electrode", type: "Quality Declaration", issuedDate: "2026-04-10", pdfSize: "450 KB" }
];

export const MOCK_ELECTRODES: ElectrodeItem[] = [
  { id: "el-1", name: "iUnitrode with Pt1000", application: "General acid/base titration, aqueous samples, difficult matrices", phRange: "0...14", tempRange: "-5...100 °C", electrolyte: "KCl 3 mol/L", shaftMaterial: "Glass", idealFor: "Ideal for automated water analytics and chemical research where temperature compensation is critical." },
  { id: "el-2", name: "Solvotrode EasyClean", application: "Non-aqueous acid/base titrations (petrochemical, oil formulations)", phRange: "0...14", tempRange: "0...80 °C", electrolyte: "LiCl in Ethanol", shaftMaterial: "Glass", idealFor: "Specifically designed for acid number (TAN/TBN) assays with easy-to-flush sleeve junction." },
  { id: "el-3", name: "Combined Platinum Electrode (dMetrode)", application: "Redox titrations (iodometry, iodate determination, iron assays)", phRange: "N/A", tempRange: "-5...80 °C", electrolyte: "KCl 3 mol/L", shaftMaterial: "Glass", idealFor: "Intelligent redox sensor with direct automatic oxidation-reduction calibration storage." },
  { id: "el-4", name: "Profitrode Double-Junction Glass", application: "Highly precise chemical determinations with cross-reactive analytes", phRange: "0...14", tempRange: "-5...100 °C", electrolyte: "K2SO4 0.1 mol/L", shaftMaterial: "Glass", idealFor: "For halide titrations where chloride trace leakage must be strictly avoided." }
];

export const MOCK_COLUMNS: ColumnItem[] = [
  { id: "col-1", name: "Metrosep A Supp 5 - 250/4.0", material: "Polyvinyl alcohol with quaternary ammonium groups", dimensions: "250 mm x 4.0 mm", phStability: "3...12", maxPressure: "15 MPa (150 bar)", typicalAnalytes: "Fluoride, Chloride, Bromide, Nitrate, Phosphate, Sulfate", recommendedFor: "Standard environmental water analysis, drinking water validation, and quality trace control." },
  { id: "col-2", name: "Metrosep C 4 - 150/4.0", material: "Silica gel with carboxylic acid groups", dimensions: "150 mm x 4.0 mm", phStability: "2...7", maxPressure: "25 MPa (250 bar)", typicalAnalytes: "Sodium, Ammonium, Potassium, Calcium, Magnesium", recommendedFor: "Beverage ion trace profiling and standard industrial boiler water validations." },
  { id: "col-3", name: "Metrosep Carb 2 - 250/4.0", material: "Styrene-divinylbenzene copolymer with alkyl ammonium", dimensions: "250 mm x 4.0 mm", phStability: "0...14", maxPressure: "20 MPa (200 bar)", typicalAnalytes: "Glucose, Fructose, Sucrose, Lactose, Maltose", recommendedFor: "Carbohydrate analysis in food and biotech industries using ultra-high electrochemical detection." }
];

export const INITIAL_QUOTES: QuoteRequest[] = [
  {
    id: "q-1",
    fullName: "Dr. Clara Sterling",
    companyName: "Novartis Pharma Labs",
    email: "clara.sterling@novartis.com",
    phone: "+41 61 324 1111",
    country: "Switzerland",
    productInterest: "OMNIS NIR Analyzer Liquid",
    industry: "Pharmaceuticals",
    message: "We need to replace three of our raw-materials incoming test channels with direct near-infrared measurements. Please send us custom solid/liquid spectrometer options.",
    status: "Pending",
    createdAt: "2026-06-18 14:32"
  },
  {
    id: "q-2",
    fullName: "Marcus Holloway",
    companyName: "BASF Chemical Systems",
    email: "marcus.holloway@basf.com",
    phone: "+49 621 60 0",
    country: "Germany",
    productInterest: "940 Professional IC Vario",
    industry: "Chemicals",
    message: "Interested in a dual-channel IC configuration for high-concentration anions/cations parallel assay automation.",
    status: "Completed",
    createdAt: "2026-06-15 09:12"
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: "t-1",
    ticketNumber: "TK-84952",
    fullName: "Dr. Clara Sterling",
    email: "clara.sterling@novartis.com",
    type: "Technical Support",
    subject: "Baseline Drift in OMNIS Liquid Chamber",
    message: "Since our standard cleaning sequence yesterday, the baseline calibration scan reports intermittent high noise figures in the 1400-1600nm range.",
    status: "Open",
    createdAt: "2026-06-19 15:44",
    replies: [
      {
        sender: "User",
        message: "Since our standard cleaning sequence yesterday, the baseline calibration scan reports intermittent high noise figures in the 1400-1600nm range.",
        timestamp: "2026-06-19 15:44"
      }
    ]
  },
  {
    id: "t-2",
    ticketNumber: "TK-83491",
    fullName: "Jean-Pierre Laurent",
    email: "jp.laurent@totalenergies.com",
    type: "Installation Support",
    subject: "Autolab Potentiostat GPIB Integration Error",
    message: "We are trying to connect PGSTAT204 with Autolab NOVA 2.1 via our legacy GPIB network cards, but the software fails to match device descriptors.",
    status: "In Progress",
    createdAt: "2026-06-17 11:20",
    replies: [
      {
        sender: "User",
        message: "We are trying to connect PGSTAT204 with Autolab NOVA 2.1 via our legacy GPIB network cards, but the software fails to match device descriptors.",
        timestamp: "2026-06-17 11:20"
      },
      {
        sender: "Metrohm Support Agent",
        message: "Hello Jean-Pierre, the Autolab PGSTAT204 is pre-configured to communicate via USB 2.0 natively. For GPIB networks, an external interface accessory is needed. Let's arrange a support call to send you the direct driver definitions.",
        timestamp: "2026-06-17 14:10"
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: "not-1",
    title: "New OMNIS firmware update v3.5.1",
    body: "Resolves temperature stabilization delays during high-throughput parallel titration runs. Update is free of charge through OMNIS companion.",
    sentAt: "2026-06-10 10:00",
    targetGroup: "All Users"
  },
  {
    id: "not-2",
    title: "Upcoming webinar: Automated Acid & Base assays",
    body: "Join our master technical educators on July 10th for an depth look at setting up Liquid Robots. Reserve standard seats inside.",
    sentAt: "2026-06-14 14:00",
    targetGroup: "Quality Control"
  }
];
