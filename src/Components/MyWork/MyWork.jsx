import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../../features/projects/projectsSlice";
import "./MyWork.css";
import bac from "../../assets/bac.svg";

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
        <h1>My Latest work</h1>
        <img src={bac} alt="" />
      </div>

      <div className="mywork-container">
        {isLoading && <p style={{ color: "#fff" }}>Loading projects...</p>}
        {error && <p className="mywork-error">⚠ {error}</p>}
        {!isLoading && mywork_data.map((data, index) => {
          return (
            <div className="project-card glass-panel" key={index}>
              <img src={data.imageUrl} alt={data.name} className="project-img" />
              <div className="project-overlay">
                <h3>{data.name}</h3>
                {data.description && <p>{data.description}</p>}
                <a href={data.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  View Project
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyWork;
