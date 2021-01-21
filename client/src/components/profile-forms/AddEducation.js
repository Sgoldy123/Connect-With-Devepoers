import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {updateEducation} from '../../actions/profile'

const AddEducation = ({history}) => {
    const [formData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        to:'',
        current:false,
        description:''
    })
    const {school,degree,fieldofstudy,from,to,current,description}=formData;
    const [click,setClick]=useState(false);
    const onChangeHandler=(e)=>{
        setFormData({
            ...formData, [e.target.name]:e.target.value
        })
    }
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(formData);
        dispatch(updateEducation(formData,history))
    }
    
    return (
        <Fragment>
            <h1 className="large text-primary">
            Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                <input type="text" placeholder="* School" name="school" required onChange={(e)=>onChangeHandler(e)} value={school} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* degree" name="degree" required onChange={(e)=>onChangeHandler(e)} value={degree} />
                </div>
                <div className="form-group">
                <input type="text" placeholder="fieldofstudy" name="fieldofstudy" onChange={(e)=>onChangeHandler(e)} value={fieldofstudy} />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" name="from" onChange={(e)=>onChangeHandler(e)} value={from} />
                </div>
                <div className="form-group">
                <p><input type="checkbox" name="current" value={current} onChange={(e)=>{
                    setFormData({
                        ...formData,
                        [e.target.name]:!click
                    })
                    setClick(!click)
                }} /> Current Edu</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
               {!click && <input type="date" name="to" onChange={(e)=>onChangeHandler(e)} value={to} /> }
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Job Description"
                    onChange={(e)=>onChangeHandler(e)} value={description}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to='/dashboard'>Go Back</Link>
            </form>
        </Fragment>
    )
}

export default AddEducation;
