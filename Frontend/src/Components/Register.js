import React , {useState , useContext} from "react";
import {useNavigate , Link} from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";


const Register = () => {

    
  const context = useContext(noteContext);
  const { setToken } = context;

    const navigate = useNavigate();

    const [data,setData] = useState({ name : "", email : "" , password : ""});
    

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://inotebook-backend-c05i.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({ name : data.name ,email : data.email , password : data.password})
    });

    const json = await response.json();

    if(json.success)
    {
        localStorage.setItem("token",json.authtoken);
        setToken(localStorage.getItem("token"))
        navigate('/');
    }
    else { alert("Enter Valid Email or Password");
            setData({ name : "", email : "" , password : ""}
            
            )
    }
  };

    const onChange = (e)=>{
        setData({...data,[e.target.name] : e.target.value})
        
      }

  return (
    <div className="LS-container">
      <form className="LS-card" onSubmit={submit}>
        <img src="sketchbook.png" alt="notebook" />
        <h2>Create Account</h2>
        <div className="mb-2">
          <label htmlFor="name" className="form-label" >Full Name</label>
          <input type="text" id="name" name="name" onChange={onChange} value={data.name} className="form-control" placeholder="Enter your full name" required />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" id="email" name="email" onChange={onChange} value={data.email} className="form-control" placeholder="Enter valid email" required />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="password" className="form-label" >Password</label>
          <input type="password" id="password" name="password" onChange={onChange} value={data.password} className="form-control" placeholder="Create strong password (minimum length 5)" required />
        </div>
        <button type="submit" className="button" >
          Register
        </button>
        <div className="text-center" style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Sign In</Link>
      </div>
      </form>
      
      
    </div>
  )
}

export default Register
