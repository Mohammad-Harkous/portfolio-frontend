import React from "react";
import "./ProjectsDash.css";
import axios from "axios";
import { useState, useEffect } from "react";

function ProjectsDash() {
  const [projects, setProjects] = useState([]);
  const [visible, setVisible] = useState(3);
  const [clicked, setclicked] = useState(false);
  const [Image,setImage]=useState(null);
  const [Title,setTitle]=useState('');
  const [Description,setDescription]=useState('');
  const [openDivPost,setdivPost]=useState(false);

  const showMoreItems = () => {
    if (!clicked) {
      setVisible((prevValue) => prevValue + projects.length);
    } else {
      setVisible((prevValue) => prevValue - projects.length);
    }
  };

  
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/project");
        const result = await response.data;
        setProjects(result);
        console.log(result)
      } catch (err) {
        console.log(err);
      }
    };
    
  

  useEffect(() => {
    fetchProjects();
  }, []);

  const PostProject =async ()=>{
    const form = new FormData();
    form.append("image",Image);
    form.append("title",Title);
    form.append("description",Description)
    try{
    const res = await axios.post(`http://localhost:5000/api/project`,form, 
    {
        content : "application/json",
        headers: {
            "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
    }
    )
    const response =await res.data;
    console.log(response);
    fetchProjects();

}catch(err){
    console.log(err);
}
  }

  const DeleteProject =async (id)=>{
    try{
    const res = await axios.delete(`http://localhost:5000/api/project/${id}`,
    {
        content : "application/json",
        headers: {
            "Authorization" : 'Bearer ' + localStorage.getItem('token')
        }
    }
    )
    const response =await res.data;
    console.log(response);
    fetchProjects();
    setdivPost(false);

}catch(err){
    console.log(err);
}
  }

  return (
    <>

      <div className="project-main-dash" id="projects">
      <button className="Create-newProject" onClick={()=>setdivPost(!openDivPost)}>Create new Project</button>
    {openDivPost &&
    <div>
      <label className="Project-label-image" htmlFor="Project-label-image">Image
        <br />
        <input id="Project-label-image" type="file" className="Choose-project-image" onChange={(e)=>{setImage(e.target.files[0])}}/>
        </label>
        <br />
        <label className="Project-label" htmlFor='Project-title'>Please Provide Project title 
        <br />
        <input className="Project-title-input" id="Project-title" type="text"onChange={(e)=>{setTitle(e.target.value)}}/>
        </label>
        <br />
        <label className="Project-label" htmlFor='Project-description'>Please Provide Project description 
        <br />
        <input className="Project-description-input" id="Project-description" type="text"onChange={(e)=>{setDescription(e.target.value)}}/>
        </label>
        <br />
        <button className="Project-submit-button" onClick={()=>PostProject()}>Submit</button>
        <br />
        <button className="Exit-project" onClick={()=>setdivPost(!openDivPost)}>Exit</button>

    </div>
}
        <h1 className="project-title-dash">Projects</h1>

        <div className="project-images-dash">
          {projects &&
            projects.slice(0, visible).map((project) => (
              <div className="project-images-img-dash" key={project._id}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="image-dash"
                />
                <div className="overlay-dash">
                  {/**put in the decription section the link of website that you want to show  */}
                  <div className="link-dash">
                    <a
                      href={project.description}
                      target="_blank"
                      rel="noreferrer"
                      className="text-dash">
                      {project.description}
                    </a>
                    <span> {project.title}</span>
                  </div>
                </div>
                <button className="Project-delete-button"  onClick={()=>DeleteProject(project._id)}>Delete this project</button>
              </div>
            ))}
        </div>

        <div className="show_button-dash">
          <button
            onClick={() => {
              showMoreItems();
              setclicked(!clicked);
              console.log(visible);
            }}>
            {!clicked ? "Show More" : "Show Less"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectsDash;
