import React from "react";
import "./testimonials.css";

interface LogoCloud2Props {
  title?: string;
  subtitle?: string;
}

const partners = [
  { name: "Vrindopnishad Press", category: "Sacred Publishing" },
  { name: "Sattvic Foody", category: "Pure Meals" },
  { name: "Vrindavan Dham Yatra", category: "Pilgrimage Tours" },
  { name: "Sant-Vaani Digital", category: "Audio Archives" },
  { name: "Vedic Wisdom AI", category: "Intelligence" },
];

export function LogoCloud2({
  title = "Our Sacred Ecosystem",
  subtitle = "Powering authentic Vedic wisdom across digital & physical realms",
}: LogoCloud2Props) {
  return (
    <div className="lc2-container">
      <div className="lc2-header">
        <h3 className="lc2-title">{title}</h3>
        <p className="lc2-desc">{subtitle}</p>
      </div>

      <div className="lc2-grid">
        {partners.map((partner) => (
          <div key={partner.name} className="lc2-card">
            <div className="lc2-icon">
              {partner.name.charAt(0)}
            </div>
            <span className="lc2-name">{partner.name}</span>
            <span className="lc2-category">{partner.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoCloud2;
