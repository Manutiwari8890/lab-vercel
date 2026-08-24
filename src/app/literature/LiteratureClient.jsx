"use client"

import React, { useState, useMemo } from "react";

// --- CATEGORY 1: LDP MASTER BRAND PUBLICATIONS ---
const LDP_MASTER_PUBLICATIONS = [
  {
    id: "ldp-master",
    title: "LDP Master Laboratory Consumables Catalog",
    subtitle: "Complete Product Directory & Technical Specifications",
    image: "/assets/images/laboratory-disposable-products-cat-page1.jpeg",
    pdf: "https://technicaldoc.com/doc/laboratory-disposable-products-cat.pdf",
    pages: "53 Pages",
    size: "14.2 MB",
    badge: "LDP Consumable Products",
    desc: "Explore LDP's complete range of laboratory consumables and research products.",
  },
  {
    id: "ldp-overview",
    title: "LDP Company Overview",
    subtitle: "ISO 9001:2015 & WBENC Accredited",
    image: "/assets/images/laboratory-disposable-products-ven-page1.jpeg",
    pdf: "https://technicaldoc.com/doc/laboratory-disposable-products-ven.pdf",
    pages: "16 Pages",
    size: "5.8 MB",
    badge: "Company Profile",
    desc: "A comprehensive catalog featuring LDP's complete portfolio of laboratory consumables, liquid handling products, cell culture solutions, PCR consumables, and filtration accessories.",
  },
];

// --- CATEGORY 2: BIOTC BRAND SERIES CATALOGS (18 ITEMS) ---
const BIOTC_CATALOGS = [
  { id: "b1", title: "BioTC General Cap Series", group: "Consumables", subcat: "General Lab", image: "/assets/images/biotc_cap.webp", pdf: "https://technicaldoc.com/doc/biotc-cap.pdf", desc: "Technical specifications for BioTC cap products and accessories." },
  { id: "b2", title: "BioTC Master Catalog", group: "Portfolio", subcat: "Master Catalog", image: "/assets/images/biotc_master.webp", pdf: "https://technicaldoc.com/doc/biotc-catalog.pdf", desc: "Complete master catalog covering the primary BioTC product lines." },
  { id: "b3", title: "BioTC Cell Strainers", group: "Consumables", subcat: "Cell Culture", image: "/assets/images/biotc-cell-strainers.webp", pdf: "https://technicaldoc.com/doc/biotc-cell-strainers.pdf", desc: "Specifications for sterile nylon mesh cell strainers and accessories." },
  { id: "b4", title: "BioTC Centrifuge Tubes", group: "Consumables", subcat: "Centrifugation", image: "/assets/images/biotc-centrifuge-catalogue.webp", pdf: "https://technicaldoc.com/doc/biotc-centrifuge-tubes.pdf", desc: "High-clarity polypropylene conical centrifuge tubes with leak-proof caps." },
  { id: "b5", title: "BioTC Culture Dishes & Plates", group: "Consumables", subcat: "Cell Culture", image: "/assets/images/biotc-dishe.webp", pdf: "https://technicaldoc.com/doc/biotc-dishes.pdf", desc: "Tissue-culture treated dishes, multi-well plates, and petri dishes." },
  { id: "b6", title: "BioTC General Lab Products", group: "Consumables", subcat: "General Lab", image: "/assets/images/biotc-general-labs.webp", pdf: "https://technicaldoc.com/doc/biotc-general-lab-products.pdf", desc: "General laboratory essentials and everyday consumable supplies." },
  { id: "b7", title: "BioTC Pipette Series", group: "Consumables", subcat: "Pipettes", image: "/assets/images/biotc-pipettes.webp", pdf: "https://technicaldoc.com/doc/biotc-pipette.pdf", desc: "Precision liquid handling instruments, micropipettes, and serological tools." },
  { id: "b8", title: "BioTC Quick Reagents", group: "Reagents", subcat: "Reagents", image: "/assets/images/biotc-quick-reagent.webp", pdf: "https://technicaldoc.com/doc/biotc-quick-reagents.pdf", desc: "Rapid testing reagents and quick-prep analytical solutions." },
  { id: "b9", title: "BioTC Reagent Portfolio", group: "Reagents", subcat: "Reagents", image: "/assets/images/biotc-reagent.webp", pdf: "https://technicaldoc.com/doc/biotc-reagent.pdf", desc: "Comprehensive chemical and biochemical reagents for laboratory workflows." },
  { id: "b10", title: "BioTC Reagent Reservoirs", group: "Consumables", subcat: "Pipettes", image: "/assets/images/biotc-reservoir.webp", pdf: "https://technicaldoc.com/doc/biotc-reservoir.pdf", desc: "Disposable multichannel trough reservoirs for liquid handling applications." },
  { id: "b11", title: "BioTC Serum Collection", group: "Reagents", subcat: "Serum", image: "/assets/images/biotc-serum.webp", pdf: "https://technicaldoc.com/doc/biotc-serum.pdf", desc: "High-grade biological serums and media supplements for cell culture." },
  { id: "b12", title: "BioTC Laboratory Solutions", group: "Reagents", subcat: "Solutions", image: "/assets/images/biotc-solutions.webp", pdf: "https://technicaldoc.com/doc/biotc-solutions.pdf", desc: "Prepared buffers, aqueous solutions, and custom liquid formulations." },
  { id: "b13", title: "BioTC Laboratory Solvents", group: "Reagents", subcat: "Solvents", image: "/assets/images/biotc-solvents.webp", pdf: "https://technicaldoc.com/doc/biotc-solvents.pdf", desc: "High-purity analytical and HPLC-grade laboratory solvents." },
  { id: "b14", title: "BioTC Stain Solutions", group: "Reagents", subcat: "Stains", image: "/assets/images/biotc-stain-solution.webp", pdf: "https://technicaldoc.com/doc/biotc-stain-solutions.pdf", desc: "Biological stains, dyes, and microscopy staining solutions." },
  { id: "b15", title: "BioTC Storage Boxes & Racks", group: "Consumables", subcat: "Storage", image: "/assets/images/biotc-storage-box.webp", pdf: "https://technicaldoc.com/doc/biotc-storage-box.pdf", desc: "Freezer storage boxes, cryogenic racks, and inventory management dividers." },
  { id: "b16", title: "BioTC Pipette Tips", group: "Consumables", subcat: "Pipettes", image: "/assets/images/biotc-tips.webp", pdf: "https://technicaldoc.com/doc/biotc-tip.pdf", desc: "RNase/DNase-free universal filter tips and low-retention pipette tips." },
  { id: "b17", title: "BioTC Cryogenic Vials", group: "Consumables", subcat: "Storage", image: "/assets/images/biotc-vial.webp", pdf: "https://technicaldoc.com/doc/biotc-vials.pdf", desc: "Vapor-phase liquid nitrogen-certified internal and external thread cryovials." },
  { id: "b18", title: "BioTC Weigh Boats & Papers", group: "Consumables", subcat: "General Lab", image: "/assets/images/biotc-weigh-boat.webp", pdf: "https://technicaldoc.com/doc/biotc-weigh-boats.pdf", desc: "Anti-static disposable weighing boats and smooth weighing papers." },
];

const SUBCATEGORIES = [
  {
    key: "All",
    label: "All BioTC Catalogs",
    count: BIOTC_CATALOGS.length,
  },
  {
    key: "Portfolio",
    label: "BioTC Labware Portfolio",
    count: BIOTC_CATALOGS.filter(i => i.group === "Portfolio").length,
  },
  {
    key: "Consumables",
    label: "BioTC Consumables",
    count: BIOTC_CATALOGS.filter(i => i.group === "Consumables").length,
  },
  {
    key: "Reagents",
    label: "BioTC Reagents",
    count: BIOTC_CATALOGS.filter(i => i.group === "Reagents").length,
  },
];

export default function LiteratureClient() {   
  const [activeSubcat, setActiveSubcat] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredBioTC = useMemo(() => {
    return BIOTC_CATALOGS.filter((item) => {
      if (activeSubcat === "All") return true;
      return item.group === activeSubcat;
    });
  }, [activeSubcat]);

  const totalPages = Math.ceil(filteredBioTC.length / itemsPerPage);
  const paginatedBioTC = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBioTC.slice(start, start + itemsPerPage);
  }, [filteredBioTC, currentPage]);

  const scrollToMasterSection = () => {
    const element = document.getElementById("ldp-master-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        :root {
          --ldp-cyan: #0284c7;
          --ldp-cyan-hover: #0369a1;
          --ldp-navy: #0f172a;
          --ldp-dark: #020617;
          --slate-50: #f8fafc;
          --slate-100: #f1f5f9;
          --slate-200: #e2e8f0;
          --slate-600: #475569;
          --slate-700: #334155;
          --slate-900: #0f172a;
        }

        /* SECTION 1: HERO COMMAND CENTER */
        .v5-hero-section {
          background: radial-gradient(circle at 85% 15%, #0369a1 0%, #0f172a 55%, #020617 100%);
          color: #ffffff;
          padding: 110px 24px 130px;
          position: relative;
          overflow: hidden;
        }

        .v5-hero-container {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 60px;
          align-items: center;
        }

        .v5-kicker-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(2, 132, 199, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #38bdf8;
          padding: 8px 18px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 24px;
        }

        .v5-hero-h1 {
          font-size: clamp(42px, 5.2vw, 64px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -1px;
          margin-bottom: 24px;
        }

        .v5-hero-h1 span {
          background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .v5-hero-p {
          font-size: 18px;
          color: #94a3b8;
          line-height: 1.7;
          max-width: 580px;
          margin-bottom: 40px;
        }

        .v5-hero-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-v5-primary {
          background: #0284c7;
          color: #ffffff;
          padding: 16px 34px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(2, 132, 199, 0.35);
        }

        .btn-v5-primary:hover {
          background: #0369a1;
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(2, 132, 199, 0.45);
        }

        .btn-v5-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 16px 28px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-v5-secondary:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .v5-visual-stack {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .v5-deck-wrapper {
          position: relative;
          width: 100%;
          max-width: 440px;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .v5-card-back {
          position: absolute;
          width: 260px;
          height: 350px;
          background: #ffffff;
          border-radius: 16px;
          padding: 10px;
          transform: rotate(-10deg) translateX(-40px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          opacity: 0.85;
          transition: all 0.4s ease;
        }

        .v5-card-front {
          position: absolute;
          width: 280px;
          height: 380px;
          background: #ffffff;
          border-radius: 16px;
          padding: 12px;
          transform: rotate(4deg) translateX(30px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.6);
          z-index: 2;
          transition: all 0.4s ease;
        }

        .v5-card-back img, .v5-card-front img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 8px;
        }

        .v5-deck-wrapper:hover .v5-card-back {
          transform: rotate(-14deg) translateX(-60px);
        }

        .v5-deck-wrapper:hover .v5-card-front {
          transform: rotate(2deg) translateX(45px) scale(1.02);
        }

        .v5-glass-badge {
          position: absolute;
          bottom: 10px;
          left: -10px;
          background: rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          padding: 14px 22px;
          border-radius: 16px;
          z-index: 3;
          color: #ffffff;
          box-shadow: 0 20px 40px rgba(0,0,0,0.45);
        }

        /* SECTION 2: BENTO HUB */
        .sec-bento-hub {
          background: #ffffff;
          padding: 80px 24px 90px;
          margin-top: -36px;
          border-radius: 40px 40px 0 0;
          position: relative;
          z-index: 5;
        }

        .bento-header-box {
          text-align: center;
          margin-bottom: 45px;
        }

        .bento-tag {
          color: var(--ldp-cyan);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }

        .bento-title {
          font-size: 36px;
          font-weight: 800;
          color: var(--ldp-navy);
          letter-spacing: -0.5px;
        }

        .bento-grid-wrapper {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 28px;
          align-items: stretch;
        }

        .bento-primary-card {
          background: linear-gradient(135deg, #0f172a 0%, #020617 100%);
          border-radius: 28px;
          padding: 28px 36px;
          color: #ffffff;
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 36px;
          align-items: center;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
          position: relative;
          overflow: hidden;
        }

        .bento-cover-frame {
          width: 250px;
          height: 350px;
          background: #ffffff;
          border-radius: 16px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
          transition: transform 0.35s ease;
        }

        .bento-primary-card:hover .bento-cover-frame {
          transform: scale(1.03) translateY(-4px);
        }

        .bento-cover-frame img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          border-radius: 6px;
        }

        .bento-meta-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .bento-pill-tag {
          display: inline-block;
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 12px;
          align-self: flex-start;
        }

        .bento-card-h3 {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.25;
          margin-bottom: 6px;
          color: #ffffff;
        }

        .bento-sublabel {
          font-size: 13px;
          color: #38bdf8;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .bento-card-p {
          font-size: 13.5px;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .bento-actions-row {
          display: flex;
          gap: 12px;
        }

        .btn-bento-preview, .btn-bento-download {
          flex: 1;
          text-align: center;
          padding: 12px 18px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-bento-preview {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .btn-bento-preview:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .btn-bento-download {
          background: #0284c7;
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.35);
        }

        .btn-bento-download:hover {
          background: #0369a1;
          box-shadow: 0 6px 20px rgba(2, 132, 199, 0.45);
        }

        .bento-secondary-card {
          background: var(--slate-50);
          border: 1px solid var(--slate-200);
          border-radius: 28px;
          padding: 28px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: all 0.35s ease;
        }

        .bento-secondary-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          border-color: #cbd5e1;
          background: #ffffff;
        }

        .bento-sec-cover {
          width: 170px;
          height: 230px;
          background: #ffffff;
          border-radius: 12px;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
          margin-bottom: 16px;
          transition: transform 0.35s ease;
        }

        .bento-secondary-card:hover .bento-sec-cover {
          transform: scale(1.03);
        }

        .bento-sec-cover img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          border-radius: 6px;
        }

        .bento-badge-pill {
          display: inline-block;
          background: rgba(2, 132, 199, 0.1);
          color: var(--ldp-cyan);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 10px;
        }

        .btn-sec-preview-light {
          background: var(--slate-200);
          color: var(--ldp-navy);
        }

        .btn-sec-preview-light:hover {
          background: #cbd5e1;
        }

        /* SECTION 3: CATEGORY 02 WORKSPACE */
        .sec-biotc-secondary {
          background: var(--slate-50);
          padding: 90px 24px 110px;
          border-top: 1px solid var(--slate-200);
        }

        .workspace-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .workspace-header {
          margin-bottom: 40px;
        }

        .workspace-tag {
          color: var(--ldp-cyan);
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
          display: block;
        }

        .workspace-title {
          font-size: 36px;
          font-weight: 800;
          color: var(--ldp-navy);
          margin-bottom: 12px;
        }

        .workspace-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          align-items: start;
        }

        .subcat-sidebar {
          background: #ffffff;
          border: 1px solid var(--slate-200);
          border-radius: 24px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: sticky;
          top: 30px;
        }

        .sidebar-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          border-radius: 16px;
          border: none;
          background: transparent;
          color: var(--slate-600);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .sidebar-item:hover {
          background: rgba(2, 132, 199, 0.08);
          color: var(--ldp-cyan);
        }

        .sidebar-item.active {
          background: var(--ldp-navy);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.15);
        }

        .sidebar-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 8px;
          border-radius: 100px;
          font-size: 11px;
        }

        .sidebar-item:not(.active) .sidebar-badge {
          background: var(--slate-200);
          color: var(--slate-600);
        }

        .pub-cards-flow {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 24px;
        }

        .pub-spec-card {
          background: #ffffff;
          border: 1px solid var(--slate-200);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
          position: relative;
        }

        .pub-spec-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.06);
          border-color: #cbd5e1;
        }

        .card-thumb-holder {
          width: 100%;
          height: 220px;
          background: var(--slate-50);
          border-radius: 14px;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border: 1px solid var(--slate-100);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.02);
          overflow: hidden;
        }

        .card-thumb-holder img {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          border-radius: 6px;
          transition: transform 0.35s ease;
        }

        .pub-spec-card:hover .card-thumb-holder img {
          transform: scale(1.04);
        }

        .spec-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--ldp-navy);
          line-height: 1.35;
          margin-bottom: 8px;
          min-height: 44px;
        }

        .spec-desc {
          font-size: 13px;
          color: var(--slate-600);
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .card-spec-footer {
          display: flex;
          gap: 10px;
          margin-top: auto;
        }

        .btn-preview-link, .btn-download-link {
          flex: 1;
          text-align: center;
          padding: 11px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .btn-preview-link {
          background: var(--slate-100);
          color: var(--ldp-navy);
        }

        .btn-preview-link:hover { background: var(--slate-200); }

        .btn-download-link {
          background: var(--ldp-cyan);
          color: #ffffff;
        }

        .btn-download-link:hover { background: var(--ldp-cyan-hover); }

        .workspace-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 45px;
        }

        .page-chip {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid var(--slate-200);
          background: #ffffff;
          color: var(--slate-600);
          font-weight: 700;
          cursor: pointer;
        }

        .page-chip.active {
          background: var(--ldp-navy);
          color: #ffffff;
          border-color: var(--ldp-navy);
        }

        @media (max-width: 992px) {
          .v5-hero-container { grid-template-columns: 1fr; text-align: center; }
          .v5-hero-p { margin-left: auto; margin-right: auto; }
          .v5-hero-actions { justify-content: center; }
          .bento-grid-wrapper { grid-template-columns: 1fr; }
          .bento-primary-card { grid-template-columns: 1fr; text-align: center; }
          .bento-cover-frame { width: 100%; max-width: 240px; height: 320px; margin: 0 auto; }
          .bento-pill-tag { align-self: center; }
          .workspace-grid { grid-template-columns: 1fr; }
          .subcat-sidebar { position: relative; top: 0; flex-direction: auto; overflow-x: auto; }
        }
      `}</style>

      {/* =========================================================================
          SECTION 1: HERO COMMAND CENTER
         ========================================================================= */}
      <section className="v5-hero-section">
        <div className="v5-hero-container">
          <div>
            <div className="v5-kicker-pill">
              <span>📚 LDP Technical Document Hub</span>
            </div>
            <h1 className="v5-hero-h1">
              Laboratory Disposable Products <span>Literature Library</span>
            </h1>
            <p className="v5-hero-p">
             Explore and download official product catalogs featuring BioTC laboratory consumables, reagents, and technical product collections.
            </p>

            <div className="v5-hero-actions">
              <button 
                onClick={scrollToMasterSection} 
                className="btn-v5-primary"
              >
                Explore Master Catalogs
              </button>
              <a 
                href="https://technicaldoc.com/doc/laboratory-disposable-products-cat.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-v5-secondary"
              >
                Download Overview
              </a>
            </div>
          </div>

          <div className="v5-visual-stack">
            <div className="v5-deck-wrapper">
              <div className="v5-card-back">
                <img src="/assets/images/biotc_master.webp" alt="LDP Vendor Catalog" />
              </div>
              <div className="v5-card-front">
                <img src="/assets/images/laboratory-disposable-products-cat-page1.jpeg" alt="LDP Master Catalog" />
              </div>
              <div className="v5-glass-badge">
                <div style={{ fontSize: "14px", fontWeight: "800", color: "#38bdf8" }}>19+ Technical PDF Catalogs</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>ISO 9001:2015 & WBENC Accredited</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: BENTO MASTER CATALOG HUB 
          (LEFT: COMPANY OVERVIEW IN DARK BLUE CARD | RIGHT: CONSUMABLES CATALOG IN LIGHT CARD)
         ========================================================================= */}
      <section className="sec-bento-hub" id="ldp-master-section">
        <div className="workspace-container">
          <div className="bento-header-box">
            <span className="bento-tag">Complete Range</span>
            <h2 className="bento-title">LDP Laboratory Consumables & Equipment Catalog</h2>
          </div>

          <div className="bento-grid-wrapper">
            {/* LEFT SIDE: COMPANY OVERVIEW & CAPABILITIES GUIDE (DARK BLUE BENTO CARD) */}
            <div className="bento-primary-card">
              <div className="bento-cover-frame">
                <img 
                  src={LDP_MASTER_PUBLICATIONS[1].image} 
                  alt={LDP_MASTER_PUBLICATIONS[1].title} 
                />
              </div>

              <div className="bento-meta-box">
                <span className="bento-pill-tag">
                  {LDP_MASTER_PUBLICATIONS[1].badge} • {LDP_MASTER_PUBLICATIONS[1].pages}
                </span>
                <h3 className="bento-card-h3">{LDP_MASTER_PUBLICATIONS[1].title}</h3>
                <div className="bento-sublabel">{LDP_MASTER_PUBLICATIONS[1].subtitle}</div>
                <p className="bento-card-p">{LDP_MASTER_PUBLICATIONS[1].desc}</p>

                <div className="bento-actions-row">
                  <a
                    href={LDP_MASTER_PUBLICATIONS[1].pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-bento-preview"
                  >
                    Preview
                  </a>
                  <a
                    href={LDP_MASTER_PUBLICATIONS[1].pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-bento-download"
                  >
                    Download PDF
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: LDP MASTER LABORATORY CONSUMABLES CATALOG (LIGHT SLATE CARD WITH DIFFERENT CATALOGUE IMAGE) */}
            <div className="bento-secondary-card">
              <div className="bento-sec-cover">
                <img 
                  src={LDP_MASTER_PUBLICATIONS[0].image} 
                  alt={LDP_MASTER_PUBLICATIONS[0].title} 
                />
              </div>

              <span className="bento-badge-pill">
                {LDP_MASTER_PUBLICATIONS[0].badge} • {LDP_MASTER_PUBLICATIONS[0].pages}
              </span>
              <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
                {LDP_MASTER_PUBLICATIONS[0].title}
              </h3>
              <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.5", marginBottom: "18px" }}>
                {LDP_MASTER_PUBLICATIONS[0].desc}
              </p>

              <div className="bento-actions-row" style={{ width: "100%", marginTop: "auto" }}>
                <a
                  href={LDP_MASTER_PUBLICATIONS[0].pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sec-preview-light btn-bento-preview"
                >
                  Preview
                </a>
                <a
                  href={LDP_MASTER_PUBLICATIONS[0].pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-bento-download"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BIOTC WORKSPACE (3 FILTER CATEGORIES: ALL, CONSUMABLES, REAGENTS)
         ========================================================================= */}
      <section className="sec-biotc-secondary">
        <div className="workspace-container">
          <div className="workspace-header">
            <span className="workspace-tag">Catalog Library</span>
            <h2 className="workspace-title">BioTC Labware Product Catalog</h2>
            <p style={{ color: "#64748b", fontSize: "16px" }}>
              Explore the specialized BioTC catalog collection supplied through LDP.
            </p>
          </div>

          <div className="workspace-grid">
            {/* Sidebar Subcategory Selector (3 Main Categories) */}
            <div className="subcat-sidebar">
              {SUBCATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  className={`sidebar-item ${activeSubcat === cat.key ? "active" : ""}`}
                  onClick={() => {
                    setActiveSubcat(cat.key);
                    setCurrentPage(1);
                  }}
                >
                  <span>{cat.label}</span>
                  <span className="sidebar-badge">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Catalog Spec Cards */}
            <div>
              {paginatedBioTC.length > 0 ? (
                <div className="pub-cards-flow">
                  {paginatedBioTC.map((item) => (
                    <div key={item.id} className="pub-spec-card">
                      <div className="card-thumb-holder">
                        <img src={item.image} alt={item.title} />
                      </div>

                      <span style={{ fontSize: "11px", fontWeight: "700", color: "var(--ldp-cyan)", textTransform: "uppercase", marginBottom: "4px" }}>
                        BioTC • {item.group}
                      </span>
                      <h3 className="spec-title">{item.title}</h3>
                      <p className="spec-desc">{item.desc}</p>

                      <div className="card-spec-footer">
                        <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="btn-preview-link">
                          Preview
                        </a>
                        <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="btn-download-link">
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748b" }}>
                  <h3>No matching BioTC publications found</h3>
                  <p>Try choosing another category from the sidebar.</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="workspace-pagination">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-chip ${currentPage === page ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}