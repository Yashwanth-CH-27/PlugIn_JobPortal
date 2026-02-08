import {Link} from "react-router-dom"

const JobCard = ({job}) => {
    return( 
        <div>
            <h3><b>{job.title}</b></h3>
            <p><b>Company:</b>{job.company}</p>
            <p><b>Location:</b>{job.location}</p>
            <Link to = {`/job/${job._id}`}>View Details</Link>
        </div>
     )
}

export default JobCard