import "./Recognition.css";
import { FaTrophy } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { SiGooglescholar } from "react-icons/si";

const RECOGNITION_ITEMS = [
  {
    id: 1,
    title: "Google Scholar Research Publication",
    description: "Published machine learning and digital auscultation research at SKUAST-Kashmir (SSRN): Integrated Morphometric and Cardiac Phenotyping using AI.",
    year: "2024",
    link: "https://scholar.google.com/citations?user=y-lv0B0AAAAJ",
    badge: "Scholar"
  },
  {
    id: 2,
    title: "CID Srinagar Internship Honors",
    description: "Honored for contribution to tech workflows, data discipline, and backend development during public service internship.",
    year: "2024"
  },
  {
    id: 3,
    title: "41+ Public GitHub Repositories",
    description: "Milestone achieved for active open-source repositories spanning MERN, React Native, Python/Django, and machine learning.",
    year: "2024"
  },
  {
    id: 4,
    title: "Live Commercial Client Deployments",
    description: "Delivered production web platforms with real customers for Star Beekeepers and CityCabs transportation services.",
    year: "2024"
  },
  {
    id: 5,
    title: "LeetCode Problem Solving Practice",
    description: "Active commitment to Data Structures & Algorithms, array manipulation, graph searches, and algorithmic optimization.",
    year: "2024"
  },
  {
    id: 6,
    title: "NIT Srinagar Engineering & Tech Collaboration",
    description: "Collaborated in regional engineering hackathons, workshops, and technical forums alongside researchers at NIT Srinagar.",
    year: "2024"
  },
  {
    id: 7,
    title: "University of Kashmir Computer Science",
    description: "Formal academic training in computer science, bridging theoretical fundamentals with modern MERN and Python engineering.",
    year: "2023"
  }
];

export default function Recognition() {
  return (
    <section id="recognition" className="editorial-section">
      {/* Left Margin Indicator */}
      <div className="section-indicator">
        <span className="section-indicator-dot" />
        <span>AWARDS / 04</span>
      </div>

      {/* Main Content */}
      <div className="editorial-content-area">
        <div className="editorial-heading-row">
          <h2 className="editorial-section-title">
            Awards &amp; Industry<br />Recognition.
          </h2>
        </div>

        {/* Tabular Rows matching reference image */}
        <div className="recognition-table">
          {RECOGNITION_ITEMS.map((item) => (
            <div key={item.id} className="recognition-row">
              <div className="recognition-title-col">
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rec-title rec-title-link"
                    title="View publication on Google Scholar"
                  >
                    <span>{item.title}</span> <FiArrowUpRight size={14} className="rec-title-arrow" />
                  </a>
                ) : (
                  <h3 className="rec-title">{item.title}</h3>
                )}
              </div>
              <div className="recognition-desc-col">
                <p className="rec-desc">{item.description}</p>
              </div>
              <div className="recognition-trophy-col">
                <div
                  className={`trophy-badge ${item.badge === "Scholar" ? "trophy-badge-scholar" : ""}`}
                  title={item.badge === "Scholar" ? "Google Scholar Publication" : "Honors Milestone"}
                >
                  {item.badge === "Scholar" ? (
                    <SiGooglescholar className="trophy-icon scholar-icon" />
                  ) : (
                    <FaTrophy className="trophy-icon" />
                  )}
                </div>
              </div>
              <div className="recognition-year-col">
                <span className="rec-year">{item.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
