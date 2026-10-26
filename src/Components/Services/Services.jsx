import "./Services.css";
import { FiLayers, FiServer, FiSmartphone, FiCpu } from "react-icons/fi";

const SERVICES_DATA = [
  {
    id: "mern",
    icon: <FiLayers size={28} />,
    title: "Full-Stack Web Development",
    subtitle: "MERN Stack • React • Node",
    description: "End-to-end web engineering with React, Redux, Node.js, Express, and MongoDB. Scalable architectures, secure auth, and snappy responsive UX."
  },
  {
    id: "python",
    icon: <FiServer size={28} />,
    title: "Python & Backend Systems",
    subtitle: "Django • REST APIs • Microservices",
    description: "Production-grade backend systems using Python and Django. High-performance RESTful APIs, SQLite/PostgreSQL databases, and automated workflows."
  },
  {
    id: "mobile",
    icon: <FiSmartphone size={28} />,
    title: "Cross-Platform Mobile Apps",
    subtitle: "React Native • iOS & Android",
    description: "Cross-platform mobile applications with smooth native performance, offline capabilities, device hardware integrations, and store-ready polish."
  },
  {
    id: "ml",
    icon: <FiCpu size={28} />,
    title: "Applied Machine Learning",
    subtitle: "Predictive Models • Data Science",
    description: "Intelligent data-driven models with Python and scikit-learn. Classification, regression, and practical predictive solutions deployed as web tools."
  }
];

export default function Services() {
  return (
    <section id="services" className="editorial-section">
      {/* Left Margin Indicator */}
      <div className="section-indicator">
        <span className="section-indicator-dot" />
        <span>SERVICES / 02</span>
      </div>

      {/* Main Content */}
      <div className="editorial-content-area">
        <div className="editorial-heading-row">
          <h2 className="editorial-section-title">
            Creative Solutions<br />That Work.
          </h2>
        </div>

        {/* 2x2 Services Grid matching reference image */}
        <div className="services-grid">
          {SERVICES_DATA.map((service, index) => (
            <div key={service.id} className="service-card">
              <div className="service-icon-wrap">
                <div className="service-icon-chrome">
                  {service.icon}
                </div>
                <span className="service-number">0{index + 1}</span>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <span className="service-subtitle">{service.subtitle}</span>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
