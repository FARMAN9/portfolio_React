import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../features/projects/projectsSlice";
import "./MyWork.css";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight, FiSearch, FiX } from "react-icons/fi";

const CATEGORIES = ["All", "Full-Stack & MERN", "Python & ML", "React & Mobile"];

const ACCENT_COLORS = [
  { bg: "#ff5722", text: "#ffffff", tag: "Orange Studio" },
  { bg: "#18181c", text: "#fcc419", tag: "Dark Neon" },
  { bg: "#2b8a3e", text: "#ffffff", tag: "Lime Modern" },
  { bg: "#e8590c", text: "#ffffff", tag: "Tangerine" },
  { bg: "#0c8599", text: "#ffffff", tag: "Ocean Cyan" },
  { bg: "#495057", text: "#ffffff", tag: "Slate Minimal" }
];

function MyWork() {
  const dispatch = useDispatch();
  const { items: mywork_data, status } = useSelector((state) => state.projects);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const filteredProjects = useMemo(() => {
    return mywork_data.filter((project) => {
      // Category filter
      let matchesCat = true;
      if (selectedCategory === "Full-Stack & MERN") {
        matchesCat = project.tech?.some((t) => ["MERN", "MongoDB", "Express", "Node", "Full-Stack"].includes(t));
      } else if (selectedCategory === "Python & ML") {
        matchesCat = project.tech?.some((t) => ["Python", "ML", "Django"].includes(t));
      } else if (selectedCategory === "React & Mobile") {
        matchesCat = project.tech?.some((t) => ["React", "React Native", "JavaScript", "Vite"].includes(t));
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inName = project.name?.toLowerCase().includes(q);
        const inDesc = project.description?.toLowerCase().includes(q);
        const inTech = project.tech?.some((t) => t.toLowerCase().includes(q));
        matchesSearch = inName || inDesc || inTech;
      }

      return matchesCat && matchesSearch;
    });
  }, [mywork_data, selectedCategory, searchQuery]);

  return (
    <section id="work" className="editorial-section">
      {/* Left Margin Indicator */}
      <div className="section-indicator">
        <span className="section-indicator-dot" />
        <span>PORTFOLIO / 01</span>
      </div>

      {/* Main Content Area */}
      <div className="editorial-content-area">
        {/* Section Header Row */}
        <div className="editorial-heading-row">
          <div>
            <h2 className="editorial-section-title">
              A Selection of My<br />Best Work.
            </h2>
          </div>

          <a
            href="https://github.com/FARMAN9?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-orange"
          >
            View All ({mywork_data.length}) <FiArrowUpRight />
          </a>
        </div>

        {/* Interactive Filter & Search Bar */}
        <div className="projects-filter-bar">
          <div className="projects-category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-tab-btn ${selectedCategory === cat ? "is-active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="projects-search-box">
            <FiSearch className="search-icon" size={15} />
            <input
              type="text"
              placeholder="Search tech or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="projects-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Showcase Cards List matching reference image */}
        <div className="showcase-cards-list">
          {filteredProjects.map((project, index) => {
            const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

            return (
              <article key={project.w_no || index} className="showcase-card">
                {/* Wide Visual Device Banner matching the mockups in reference image */}
                <div
                  className="showcase-mockup-frame"
                  style={{ backgroundColor: accent.bg }}
                >
                  <div className="mockup-screen-container">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="mockup-screen-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="mockup-watermark" style={{ color: accent.text }}>
                    <span>{project.name.toUpperCase()}</span>
                  </div>
                </div>

                {/* Card Info Details */}
                <div className="showcase-card-meta">
                  <div className="showcase-card-info">
                    <h3 className="showcase-project-name">{project.name}</h3>
                    <p className="showcase-project-desc">{project.description}</p>
                    
                    {/* Tech Badges */}
                    {project.tech && (
                      <div className="showcase-tech-badges">
                        {project.tech.map((techItem) => (
                          <span key={techItem} className="tech-badge">
                            {techItem}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions: Code & Live Demo */}
                  <div className="showcase-card-actions">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-round-arrow"
                        title="View Live Site"
                      >
                        <span>Live Demo</span>
                        <div className="arrow-circle">
                          <FiArrowUpRight size={15} />
                        </div>
                      </a>
                    )}
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-round-arrow code-btn"
                      title="View GitHub Repository"
                    >
                      <FaGithub size={15} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="no-projects-found">
              <p>No projects match your filter query.</p>
              <button
                type="button"
                className="btn-pill-dark"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyWork;
