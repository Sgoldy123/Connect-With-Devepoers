import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux';
import {deleteEducation} from '../../actions/profile'

const Education = ({education}) => {
    const dispatch=useDispatch();
    const deleteHandler=(id)=>{
       dispatch(deleteEducation(id));
    }
    const eeducation=education.map((edu)=>(
        <tr key={edu._id}>
           <td>{edu.school}</td>
           <td className="hide-sm">{edu.degree}</td>
           <td>
               <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '}
               {edu.to==null ? "NOW":  (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
           </td>
           <td><button className="btn btn-danger" onClick={()=>deleteHandler(edu._id)} >Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            
            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide=sm">Years</th>
                        <th className="hide=sm"></th>
                    </tr>
                </thead>
                <tbody>
                    {eeducation}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Education;
