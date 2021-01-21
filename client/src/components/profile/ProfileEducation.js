import React from 'react'
import Moment from 'react-moment'

const ProfileEducation = ({edu:{
    school,degree,from,to,description,current,fieldofstudy
}}) => {
    return (
        <div>
            <h3 class="text-dark">{school}</h3>
            <p>
                <Moment format="YY/MM/DD">{from}</Moment> - {
                    current ?"NOW" : <Moment format="YY/MM/DD">{to}</Moment>
                }
            </p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>FieldofStudy: </strong>{fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
      </div>
    )
}

export default ProfileEducation
