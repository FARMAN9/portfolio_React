import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../features/projects/projectsSlice";
import "./MyWork.css";
import bac from "../../assets/bac.svg";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

function MyWork() {
  const dispatch = useDispatch();
  const { items: mywork_data, status, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const isLoading = status === 'loading';

  return (
    <div id="work" className="mywork">
      <div className="mywork-title">
        <span>Selected work</span>
        <h1>Projects with proof</h1>
        <img src={bac} alt="" />
      </div>

      <div className="mywork-container">
        {isLoading && <p style={{ color: "#fff" }}>Loading projects...</p>}
        {error && <p className="mywork-error">⚠ {error}</p>}
        {!isLoading && mywork_data.map((data, index) => {
          return (
            <div className="project-card glass-panel" key={index}>
              <img src={data.imageUrl} alt={data.name} className="project-img" />
              <div className="project-content">
                <h3>{data.name}</h3>
                {data.description && <p>{data.description}</p>}
                {data.tech && (
                  <div className="project-tech">
                    {data.tech.map((item) => <span key={item}>{item}</span>)}
                  </div>
                )}
                <div className="project-actions">
                  <a href={data.link} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> Code
                  </a>
                  {data.demo && (
                    <a href={data.demo} target="_blank" rel="noopener noreferrer" className="project-link project-link-secondary">
                      <FiExternalLink /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyWork;
