import "./BlogNotes.css";
import { FiArrowUpRight, FiClock } from "react-icons/fi";

const BLOGS_DATA = [
  {
    id: 1,
    title: "Architecting Real-Time Web Experiences with the MERN Stack",
    category: "Full-Stack Web",
    readTime: "5 min read",
    date: "OCT 2024",
    accent: "#18181c",
    previewCode: "const socket = io(SERVER_URL);\nuseEffect(() => {\n  socket.on('message', handleNewMsg);\n}, []);"
  },
  {
    id: 2,
    title: "Scalable REST APIs with Python & Django: Practical Patterns",
    category: "Backend & Python",
    readTime: "6 min read",
    date: "SEP 2024",
    accent: "#ff5722",
    previewCode: "class ProjectViewSet(viewsets.ModelViewSet):\n  queryset = Project.objects.all()\n  serializer_class = ProjectSerializer"
  },
  {
    id: 3,
    title: "Deploying Machine Learning Risk Prediction Models on the Web",
    category: "Machine Learning",
    readTime: "4 min read",
    date: "AUG 2024",
    accent: "#2b8a3e",
    previewCode: "from sklearn.ensemble import RandomForestClassifier\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)"
  }
];

export default function BlogNotes() {
  return (
    <section id="insights" className="editorial-section">
      {/* Left Margin Indicator */}
      <div className="section-indicator">
        <span className="section-indicator-dot" />
        <span>BLOGS / 05</span>
      </div>

      {/* Main Content */}
      <div className="editorial-content-area">
        <div className="editorial-heading-row">
          <h2 className="editorial-section-title">
            From My Desk: Blogs<br />&amp; Creative Notes.
          </h2>

          <a
            href="https://github.com/FARMAN9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-orange"
          >
            View All <FiArrowUpRight />
          </a>
        </div>

        {/* 3 Editorial Cards matching reference image */}
        <div className="blogs-cards-grid">
          {BLOGS_DATA.map((blog) => (
            <article key={blog.id} className="blog-editorial-card">
              <div 
                className="blog-mockup-cover"
                style={{ backgroundColor: blog.accent }}
              >
                <div className="blog-code-snippet">
                  <code>{blog.previewCode}</code>
                </div>
                <div className="blog-date-badge">
                  <span>{blog.date}</span>
                </div>
              </div>

              <div className="blog-content-details">
                <div className="blog-tag-row">
                  <span className="blog-category-label">{blog.category}</span>
                  <span className="blog-read-time"><FiClock size={12} /> {blog.readTime}</span>
                </div>
                <h3 className="blog-headline">{blog.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
