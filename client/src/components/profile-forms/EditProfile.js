import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import store from '../../store';
import {createProfile,getProfile} from '../../actions/profile'
import { useDispatch, useSelector } from 'react-redux';
const EditProfile = ({history}) => {
    const [formData,setFormData]=useState({
        company:'',
        website:'',
        location:'',
        status:'',
        skills:'',
        bio:'',
        githubusername:'',
        youtube:'',
        twitter:'',
        facebook:'',
        instagram:'',
        linkedin:''
    })
    const [socialMediaIcon,setSocialMediaIcon]=useState(false);
    const {company,website,location,status,skills, bio,githubusername, youtube,twitter,facebook,instagram,linkedin} =formData;

    const dispatch=useDispatch();
    const {profile,loading}=useSelector(state=>state.profile)
    const onChangeHandler =(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const submitHandler=(e)=>{
         e.preventDefault();
         console.log(formData);
         dispatch(createProfile(formData,history,true));
    }
    useEffect(()=>{
       dispatch(getProfile());
       setFormData({
           company: loading || !profile.company?'':profile.company,
           website:loading || !profile.website?'':profile.website,
           location: loading || !profile.location?'':profile.location,
           status: loading || !profile.status?'':profile.status,
           skills: loading || !profile.skills?'':profile.skills.join(','),
           bio: loading || !profile.bio?'':profile.bio,
           githubusername: loading || !profile.githubusername?'':profile.githubusername,
           youtube: loading || !profile.social.youtube?'':profile.social.youtube,
           twitter: loading || !profile.social.twitter?'':profile.social.twitter,
           facebook: loading || !profile.social.facebook?'':profile.social.facebook,
           instagram: loading || !profile.social.instagram?'':profile.social.instagram,
           linkedin: loading || !profile.social.linkedin?'':profile.social.linkedin

       })
    },[loading,getProfile])

    return (
        <div>
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
                profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={submitHandler}>
                <div className="form-group">
                <select name="status" value={status} onChange={(e)=>onChangeHandler(e)}>
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text">Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Company" name="company"  onChange={(e)=>onChangeHandler(e)} value={company} />
                <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Website" name="website" onChange={(e)=>onChangeHandler(e)} value={website} />
                <small className="form-text">Could be your own or a company website</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" name="location"  onChange={(e)=>onChangeHandler(e)} value={location} />
                <small className="form-text" >City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Skills" name="skills"  onChange={(e)=>onChangeHandler(e)} value={skills} />
                <small className="form-text"  >Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={githubusername}
                    onChange={(e)=>onChangeHandler(e)}
                />
                <small className="form-text">If you want your latest repos and a Github link, include your
                    username</small>
                </div>
                <div className="form-group">
                <textarea placeholder="A short bio of yourself" name="bio"  onChange={(e)=>onChangeHandler(e)} value={bio}></textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                <button type="button" className="btn btn-light"  onClick={()=>setSocialMediaIcon(!socialMediaIcon)}>
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>

              { socialMediaIcon && <> <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter"  onChange={(e)=>onChangeHandler(e)}  value={twitter}/>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook"  onChange={(e)=>onChangeHandler(e)} value={facebook} />
                </div>

                <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube"  onChange={(e)=>onChangeHandler(e)} value={youtube} />
                </div>

                <div class="form-group social-input">
                <i class="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin"  onChange={(e)=>onChangeHandler(e)} value={linkedin} />
                </div>

                <div class="form-group social-input">
                <i class="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram"  onChange={(e)=>onChangeHandler(e)} value={instagram} />
                </div> 
                </>
                }
                <input type="submit" class="btn btn-primary my-1" />
                <Link class="btn btn-light my-1" to='/dashboard' >Go Back</Link>
            </form>
        </div>
    )
}

export default EditProfile
