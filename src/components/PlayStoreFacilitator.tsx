import { useState } from "react";
import {
  FileCode,
  Download,
  CheckSquare,
  Sparkles,
  Layers,
  ArrowRight,
  Terminal,
  Heading,
  Copy,
  Check,
  FolderOpen,
  FileText,
  Info
} from "lucide-react";

export default function PlayStoreFacilitator() {
  // Navigation inside developer workbench
  const [activeTab, setActiveTab] = useState<"checklist" | "metadata" | "code">("checklist");
  
  // Interactive metadata config
  const [appName, setAppName] = useState("Metrohm Smart Lab App 2026");
  const [shortDesc, setShortDesc] = useState("Professional Android mobile companion for Metrohm analyzers, calibration certificates & support.");
  const [longDesc, setLongDesc] = useState(
    `Take control of your chemical determinations with Metrohm Smart Lab App 2026—the elite, secure mobile hub built for quality control, pharmaceutical research, environmental water labs, and academic science.

Key Features:
- OMNIS NIR Analyzer suite: Fast near-infrared configuration and spectrum advisor in < 10 seconds.
- Integrated Lab Finders: Instantly access Material Safety Data Sheets (MSDS), factory calibration certificates, IC columns stability parameters, and smart glass electrodes.
- SLA Support requests: Submit high-priority repair tickets and real-time support queries with direct reply logs.
- Inquiry Management: Create custom quotes, download manuals, and receive critical push notifications.

Designed strictly for compliance (FDA 21 CFR Part 11) and modern laboratory workforces.`
  );
  
  // Checklist states
  const [checklist, setChecklist] = useState({
    devAccount: true,
    targetAudience: false,
    contentRating: false,
    privacyLink: true,
    screenshotAssets: false,
    aabCompiled: false,
  });

  const [activeCodeFile, setActiveCodeFile] = useState<string>("MainActivity.kt");
  const [copiedText, setCopiedText] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(true);
    setTimeout(() => {
      setCopiedText(false);
    }, 2000);
  };

  // Simulated download of play store metadata package
  const handleDownloadMetadata = () => {
    const metaObj = {
      appName,
      shortDescription: shortDesc,
      longDescription: longDesc,
      appCategory: "Business / Productivity",
      contentRating: "Everyone 3+",
      privacyPolicyUrl: "https://www.metrohm.com/en/privacy-policy.html",
      developerContact: "mobile-support@metrohm.com",
      appVersion: "1.0.0 (Build 2026)",
      targetSdk: "Android 14 (API Level 34)"
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(metaObj, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "play-store-listings-metadata.json");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    alert("Listing Metadata successfully downloaded as JSON! Ready for uploading to the Google Play Console.");
  };

  // Kotlin source code dictionary
  const KOTLIN_ARCHITECTURE: { [filename: string]: { path: string; language: string; code: string } } = {
    "MainActivity.kt": {
      path: "app/src/main/java/com/metrohm/smartlab2026/MainActivity.kt",
      language: "kotlin",
      code: `package com.metrohm.smartlab2026

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.metrohm.smartlab2026.ui.screens.MainAppNavigation
import com.metrohm.smartlab2026.ui.theme.MetrohmSmartTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MetrohmSmartTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainAppNavigation()
                }
            }
        }
    }
}`
    },
    "MetrohmApiService.kt": {
      path: "app/src/main/java/com/metrohm/smartlab2026/data/api/MetrohmApiService.kt",
      language: "kotlin",
      code: `package com.metrohm.smartlab2026.data.api

import retrofit2.http.POST
import retrofit2.http.GET
import retrofit2.http.Body
import retrofit2.http.Path

interface MetrohmApiService {
    @GET("api/products")
    suspend fun fetchProducts(): List<ProductDto>

    @POST("api/quotes/create")
    suspend fun submitQuoteRequest(@Body request: QuoteRequestDto): QuoteResponseDto

    @GET("api/certificates/{serialNumber}")
    suspend fun lookupCertificate(@Path("serialNumber") serial: String): CertificateResponseDto

    @POST("api/support/ticket")
    suspend fun createSupportTicket(@Body ticket: SupportTicketDto): SupportTicketDto
}`
    },
    "NirConfigScreen.kt": {
      path: "app/src/main/java/com/metrohm/smartlab2026/ui/screens/NirConfigScreen.kt",
      language: "kotlin",
      code: `package com.metrohm.smartlab2026.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun NirConfiguratorScreen(
    onNavigateBack: () -> Unit,
    onSubmitInquiry: (productName: String) -> Unit
) {
    var sampleState by remember { mutableStateOf("Liquids") }
    var complianceNeeded by remember { mutableStateOf(true) }
    var automationRequired by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("OMNIS Spectrometer Advisor", style = MaterialTheme.typography.headlineMedium)
        Spacer(modifier = Modifier.height(12.dp))

        Text("1. Select Material State", style = MaterialTheme.typography.titleMedium)
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            listOf("Liquids", "Powders", "Slurries").forEach { option ->
                FilterChip(
                    selected = sampleState == option,
                    onClick = { sampleState = option },
                    label = { Text(option) }
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))
        Text("2. Automation and Robot Cells", style = MaterialTheme.typography.titleMedium)
        Row {
            Checkbox(
                checked = automationRequired,
                onCheckedChange = { automationRequired = it }
            )
            Text("Parallel high-throughput conveyor tray needed")
        }

        Spacer(modifier = Modifier.weight(1f))

        Button(
            onClick = {
                val recommended = if (sampleState == "Liquids") "OMNIS NIR Analyzer Liquid" else "OMNIS NIR Analyzer Solid"
                onSubmitInquiry(recommended)
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Generate Recommendations")
        }
    }
}`
    },
    "Theme.kt": {
      path: "app/src/main/java/com/metrohm/smartlab2026/ui/theme/Theme.kt",
      language: "kotlin",
      code: `package com.metrohm.smartlab2026.ui.theme

import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.material3.Typography
import androidx.compose.ui.graphics.Color

val MetrohmBlue = Color(0xFF005B94)
val MetrohmOrange = Color(0xFFFF7A00)
val DarkBackground = Color(0xFF0B1B2D)

private val LightColorScheme = lightColorScheme(
    primary = MetrohmBlue,
    secondary = MetrohmOrange,
    background = Color.White
)

private val DarkColorScheme = darkColorScheme(
    primary = MetrohmBlue,
    secondary = MetrohmOrange,
    background = DarkBackground
)`
    },
    "build.gradle.kts": {
      path: "app/build.gradle.kts",
      language: "gradle",
      code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.metrohm.smartlab2026"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.metrohm.smartlab2026"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("release")
        }
    }
}`
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between min-h-[580px] text-gray-200">
      
      {/* Visual workbench top banner */}
      <h3 className="text-sm font-sans font-extrabold text-[#005B94] tracking-wider uppercase mb-1 flex items-center gap-2">
        <Sparkles size={16} className="text-orange-400" />
        Play Store Packages & Launch Desk
      </h3>
      <p className="text-[11px] text-gray-400 leading-normal max-w-2xl mb-4">
        Interactive Play Store listing manager and Jetpack Compose codebase downloader. Prepares required metadata formats and exports boilerplate Kotlin code structures built following Android official practices.
      </p>

      {/* Internal Menu Tabs */}
      <div className="flex gap-2.5 border-b border-slate-800 pb-3 mb-4 select-none">
        {[
          { id: "checklist", label: "Pre-Launch Milestones", icon: <CheckSquare size={13} /> },
          { id: "metadata", label: "App Store Listing Meta", icon: <Heading size={13} /> },
          { id: "code", label: "Get Jetpack Compose Code", icon: <FileCode size={13} /> },
        ].map(tb => (
          <button
            key={tb.id}
            onClick={() => setActiveTab(tb.id as any)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
              activeTab === tb.id 
                ? "bg-slate-800 text-white font-bold" 
                : "text-gray-400 hover:text-gray-100 hover:bg-slate-800/50"
            }`}
          >
            {tb.icon}
            <span>{tb.label}</span>
          </button>
        ))}
      </div>

      {/* WORKSPACE PREVIEW: MILISTONE CHECKLISTS */}
      {activeTab === "checklist" && (
        <div className="flex-1 space-y-4">
          <div className="bg-slate-800/40 p-3.5 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[9px] font-mono text-orange-400 font-bold uppercase tracking-wider">Play Store Guidelines Reference</span>
            <p className="text-[11px] text-gray-300 leading-normal">
              Google charges a one-time registration fee ($25) for new developer accounts. An Android App Bundle (<span className="text-orange-400 font-mono">.aab</span>) is standard for releases.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {[
              { key: "devAccount", label: "Setup Google Developer Account", desc: "Corporate verification verified ($25 fee cleared)" },
              { key: "targetAudience", label: "Target Audience Definition (SOP)", desc: "Flagged laboratory professionals, age rating 18+" },
              { key: "contentRating", label: "IARC Content Rating Questionnaire", desc: "Acquired standard universal business rating (PEGI 3)" },
              { key: "privacyLink", label: "Linked Public Privacy Policy URL", desc: "Direct route hosted on official Metrohm legal registry" },
              { key: "screenshotAssets", label: "Export 24-bit Mobile Screenshots", desc: "Fitted mock assets ready for 6.5-inch templates" },
              { key: "aabCompiled", label: "Build Gradle Release Bundle (.aab)", desc: "Signed via secure corporate keystore credential checks" },
            ].map((task) => (
              <label 
                key={task.key} 
                className="bg-slate-950 p-3 rounded-lg border border-slate-850 hover:border-slate-800 transition-colors flex items-start gap-3 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  className="rounded text-orange-500 focus:ring-1 focus:ring-orange-500 h-4.5 w-4.5 mt-0.5 shrink-0"
                  checked={(checklist as any)[task.key]}
                  onChange={(e) => setChecklist({ ...checklist, [task.key]: e.target.checked })}
                />
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs font-bold text-gray-200 leading-none block">{task.label}</span>
                  <span className="text-[10px] text-gray-500 block leading-tight">{task.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* WORKSPACE PREVIEW: PLAY STORE STRING BUILDER */}
      {activeTab === "metadata" && (
        <div className="flex-1 flex gap-4 min-h-0">
          <div className="w-1/2 space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">Product Name (Max 50 characters)</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 text-xs rounded p-2 text-white"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">Short Description (Max 80 characters)</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 text-xs rounded p-2 text-white"
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest block">Full Description (Max 4000 characters)</label>
              <textarea
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 text-xs rounded p-2 text-white focus:outline-none leading-relaxed"
                value={longDesc}
                onChange={(e) => setLongDesc(e.target.value)}
              />
            </div>
          </div>

          <div className="w-1/2 bg-slate-950 rounded-xl border border-slate-850 p-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[9px] bg-slate-900 px-3 py-1.5 rounded text-orange-400 font-mono font-bold">
                <span>Play Store Visualizer</span>
                <span>Active Target: Android SDK 34</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p><strong>App Title:</strong> <span className="text-white">{appName}</span></p>
                <p><strong>Short Excerpt:</strong> <span className="text-white italic">"{shortDesc}"</span></p>
                <p className="line-clamp-5"><strong>Long description:</strong> <span className="text-gray-400 whitespace-pre-line">{longDesc}</span></p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-850 text-[10px] font-mono text-gray-500">
                  <span>Category: Business</span>
                  <span>Age rating: Mature 18+</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadMetadata}
              className="w-full mt-4 bg-[#005B94] hover:bg-[#003B64] text-white py-2 rounded text-xs font-bold font-sans flex items-center justify-center gap-2"
            >
              <Download size={14} /> Download Listings Package (.json)
            </button>
          </div>
        </div>
      )}

      {/* WORKSPACE PREVIEW: COMPOSABLE CODE BASES */}
      {activeTab === "code" && (
        <div className="flex-1 flex gap-3 min-h-0">
          
          {/* Kotlin Code directory tree */}
          <div className="w-1/3 bg-slate-950 rounded-xl border border-slate-850 p-2 space-y-1">
            <span className="px-2.5 text-[8.5px] font-mono text-gray-500 uppercase tracking-widest block pb-1 border-b border-slate-850">Android App Structure</span>
            {Object.entries(KOTLIN_ARCHITECTURE).map(([filename, val]) => (
              <button
                key={filename}
                onClick={() => setActiveCodeFile(filename)}
                className={`w-full px-2.5 py-1.5 text-left rounded text-[11px] font-mono flex items-center gap-1.5 truncate ${
                  activeCodeFile === filename ? "bg-[#0b1b2d] text-orange-400 border border-[#005B94]/20" : "text-gray-400 hover:bg-slate-900"
                }`}
              >
                <FolderOpen size={10} className="text-sky-400 shrink-0" />
                <span className="truncate">{filename}</span>
              </button>
            ))}
          </div>

          {/* Code Viewer */}
          <div className="w-2/3 bg-[#0d1e33] rounded-xl border border-slate-800 text-white font-mono text-[10px] p-3 flex flex-col justify-between overflow-x-auto">
            <div className="flex justify-between items-center bg-[#071321] px-2.5 py-1.5 rounded mb-2 select-none">
              <span className="text-gray-400 text-[8px] truncate">{KOTLIN_ARCHITECTURE[activeCodeFile].path}</span>
              <button
                onClick={() => handleCopyCode(KOTLIN_ARCHITECTURE[activeCodeFile].code)}
                className="text-[9px] bg-slate-800 hover:bg-slate-700 font-sans px-2.5 py-0.5 rounded flex items-center gap-1 text-white border border-slate-700"
              >
                {copiedText ? (
                  <>
                    <Check size={10} className="text-emerald-500" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={10} /> Copy Code
                  </>
                )}
              </button>
            </div>
            
            <pre className="flex-1 overflow-auto text-xs text-gray-300 leading-relaxed font-mono select-all bg-[#081524] p-2.5 rounded border border-slate-850 whitespace-pre scrollbar-none h-[220px]">
              <code>{KOTLIN_ARCHITECTURE[activeCodeFile].code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Warning/GLP Compliance Disclaimer footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-[10.5px] text-gray-400 leading-tight">
        <Info size={14} className="text-[#005B94] shrink-0" />
        <span>Ensure code package models conform strictly to your local laboratory network firewall and certificate routing guidelines.</span>
      </div>

    </div>
  );
}
