import { useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../store";
import ProjectList from "../components/styles/layout/ProjectList";
import ProjectForm from "../components/project/ProjectForm";
import {
  Card,
  CardTitle,
  CardDescription,
  CardLogo,
} from "../components/styles/UI/Card";
import { isArrayOfIProject } from "../types/type-guard";

function Projects() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.project.data);

  const showProjectFormHandler = () => {
    document.body.style.overflow = "hidden";
    setShowProjectForm(true);
  };

  const hideProjectFormHandler = () => {
    setShowProjectForm(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {showProjectForm ? (
        <ProjectForm type="new" hideForm={hideProjectFormHandler} />
      ) : null}
      <ProjectList>
        <Card
          $center={true}
          onClick={showProjectFormHandler}
          style={{ height: "15rem" }}
        >
          <CardLogo>
            <BsPlusLg size="1.5em" /> Add Project
          </CardLogo>
        </Card>
        { isArrayOfIProject(projects) ? projects.map((project) => (
          <Card
            key={project._id}
            onClick={() => navigate(`/projects/${project._id}`)}
            style={{ height: "15rem" }}
          >
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </Card>
        )) : null }
      </ProjectList>
    </>
  );
}

export default Projects;
