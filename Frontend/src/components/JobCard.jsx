import {Link} from "react-router-dom"

const JobCard = ({job}) => {
    return( 
        <div>
            <h3>{job.title}</h3>
            <p><br>Company:</br>{job.company}</p>
            <p><br>Location:</br>{job.location}</p>
            <Link to = {`/job/${job._id}`}>View Details</Link>
        </div>
     )
}

export default JobCard