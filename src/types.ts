/**
 * Types and interfaces for Metrohm Smart Lab App 2026
 */

export interface Product {
  id: string;
  name: string;
  category: "OMNIS Platform" | "OMNIS NIR Liquid" | "OMNIS NIR Solid" | "Titration" | "Ion Chromatography" | "Electrochemistry" | "Spectroscopy" | "Process Analytics" | "Automation" | "Accessories";
  description: string;
  longDescription: string;
  benefits: string[];
  features: string[];
  specs: { [key: string]: string };
  image: string;
  brochureUrl?: string;
  isFeatured?: boolean;
  priceEstimate?: string;
}

export interface Article {
  id: string;
  title: string;
  category: "Did You Know?" | "Application Note" | "Product Guide" | "Training Video" | "Blog";
  summary: string;
  content: string;
  readTime: string;
  publishDate: string;
  youtubeUrl?: string; // For training videos
  imageUrl?: string;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  industry: string;
  message: string;
  status: "Pending" | "In Review" | "Quotation Sent" | "Completed";
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  fullName: string;
  email: string;
  type: "Technical Support" | "Repair Request" | "Installation Support" | "Training Request" | "Warranty Support";
  subject: string;
  message: string;
  status: "Open" | "Assigned" | "In Progress" | "Resolved";
  createdAt: string;
  replies?: Array<{
    sender: "User" | "Metrohm Support Agent";
    message: string;
    timestamp: string;
  }>;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  sentAt: string;
  targetGroup: "All Users" | "Laboratory Managers" | "Quality Control" | "Research Academics";
}

export interface MSDSItem {
  id: string;
  productName: string;
  casNumber: string;
  language: string;
  revisionDate: string;
  pdfSize: string;
}

export interface CertificateItem {
  id: string;
  productSerial: string;
  productName: string;
  type: "Accuracy Certificate" | "Calibration Certificate" | "Quality Declaration";
  issuedDate: string;
  pdfSize: string;
}

export interface ElectrodeItem {
  id: string;
  name: string;
  application: string;
  phRange: string;
  tempRange: string;
  electrolyte: string;
  shaftMaterial: string;
  idealFor: string;
}

export interface ColumnItem {
  id: string;
  name: string;
  material: string;
  dimensions: string;
  phStability: string;
  maxPressure: string;
  typicalAnalytes: string;
  recommendedFor: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  loginType: "Email" | "Google" | "Company" | "Guest";
  userProfile?: {
    name: string;
    email: string;
    company: string;
    phone: string;
    country: string;
    savedProducts: string[]; // Product IDs
    downloadHistory: Array<{
      title: string;
      date: string;
      type: "Brochure" | "Certificate" | "MSDS" | "Application Note";
    }>;
  };
}
