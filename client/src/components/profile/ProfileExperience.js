import React from 'react'
import Moment from 'react-moment'

const ProfileExperience = ({exp:{
    company,location,from,to,description,current,title
}}) => {
    return (
        <div>
            <h3 class="text-dark">{company} {location ? `at ${location}`:''}</h3>
            <p>
                <Moment format="YY/MM/DD">{from}</Moment> - {
                    current ?"NOW" : <Moment format="YY/MM/DD">{to}</Moment>
                }
            </p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>{description}
            </p>
      </div>
    )
}

export default ProfileExperience
