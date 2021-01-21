import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import {deleteExperience} from '../../actions/profile'

const Experience = ({experience}) => {

    const dispatch=useDispatch();
    const deleteHandler=(id)=>{
       dispatch(deleteExperience(id));
    }

    const eexperience=experience.map((exp)=>(
        <tr key={exp._id}>
           <td>{exp.company}</td>
           <td className="hide-sm">{exp.title}</td>
           <td>
               <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
               {exp.to==null ? "NOW":  (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
           </td>
           <td><button className="btn btn-danger" onClick={()=>deleteHandler(exp._id)}>Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide=sm">Years</th>
                        <th className="hide=sm"></th>
                    </tr>
                </thead>
                <tbody>
                    {eexperience}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Experience
