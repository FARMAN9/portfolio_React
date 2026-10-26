import "./TechStrip.css";
import { FaReact, FaPython, FaNodeJs, FaJs, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiDjango, SiMongodb, SiExpress, SiVite } from "react-icons/si";

const TECH_LOGOS = [
  { name: "React", icon: <FaReact size={26} color="#61DAFB" /> },
  { name: "Python", icon: <FaPython size={26} color="#3776AB" /> },
  { name: "Django", icon: <SiDjango size={26} color="#092E20" /> },
  { name: "Node.js", icon: <FaNodeJs size={26} color="#339933" /> },
  { name: "Express", icon: <SiExpress size={26} color="#000000" /> },
  { name: "MongoDB", icon: <SiMongodb size={26} color="#47A248" /> },
  { name: "JavaScript", icon: <FaJs size={26} color="#F7DF1E" /> },
  { name: "Vite", icon: <SiVite size={26} color="#646CFF" /> },
  { name: "Docker", icon: <FaDocker size={26} color="#2496ED" /> },
  { name: "Git", icon: <FaGitAlt size={26} color="#F05032" /> }
];

export default function TechStrip() {
  return (
    <div className="tech-strip-wrapper">
      <div className="tech-strip-inner">
        <div className="tech-strip-track">
          {/* Double array for infinite marquee */}
          {[...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS].map((tech, idx) => (
            <div key={idx} className="tech-logo-item">
              <span className="tech-icon">{tech.icon}</span>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
