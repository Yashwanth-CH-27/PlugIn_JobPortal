import { useState } from "react"
import {registerUser} from "../../api/authApi"
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  })
  const navigate = useNavigate()

  const handleForm = (e) => {
    setForm({...form, [e.target.name] : e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      await registerUser(form)
      toast.success("Registration Successfful")
      navigate("/login")
    }catch(err){
      toast.error(err?.response?.data?.message || "Registration failed")
    }
    
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleForm} placeholder="Name"/>
        <input name="email" value={form.email} onChange={handleForm} placeholder="email"/>
        <input name="password" value={form.password} onChange={handleForm} placeholder="password"/>
        <select name="role" value={form.role} onChange={handleForm}>
          <option value="jobseeker">Job-Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register