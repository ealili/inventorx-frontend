import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Link} from "react-router-dom";
import {useStateConetxt} from "../../contexts/ContextProvider.jsx";
import Project from "./Project.jsx";

export default function Projects() {
  const {setNotification} = useStateConetxt()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    getProjects()
  }, [])

  const getProjects = async (e) => {
    setLoading(true)

    try {
      const response = await axiosClient.get('/projects')
      const projects = response.data
      setLoading(false)
      setProjects(projects.data)
    } catch (err) {
      setLoading(false)
      console.log(err)
    }
  }

  const onDelete = (project) => {

    if (!window.confirm('Are you sure you want to delete this project?')) {
      return
    }

    console.log(project.id)

    axiosClient.delete(`/projects/${project.id}`)
      .then(() => {
        setNotification('Project was deleted successfully')
        // Update Projects, fetch again
        getProjects();
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h1>Projects</h1>
        <Link className={'btn-add'} to={'/projects/new'}>Add new</Link>
      </div>

      <div className={'card animated fadeInDown'}>
        <table>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Status</th>
            {/*<th>Website</th>*/}
            <th>Created at</th>
          </tr>
          </thead>
          {loading && <tbody>
          <tr>
            <td colSpan={'5'} className={'text-center'}>
              Loading...
            </td>
          </tr>
          </tbody>
          }
          {!loading && <tbody>
          {projects.map(project => (
            <Project key={project.id} project={project} onDelete={onDelete}/>
          ))}
          </tbody>
          }
        </table>
      </div>
    </div>
  );
}