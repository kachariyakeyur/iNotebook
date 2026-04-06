import React , {useState , useContext} from "react";
import {useNavigate , Link} from "react-router-dom";
import noteContext from "../Context/Notes/noteContext";

const Login = () => {


    const context = useContext(noteContext);
    const { setToken , fetchNotes} = context;

    const navigate = useNavigate();

    const [data,setData] = useState({ email : "" , password : ""});
    

  const submit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://inotebook-backend-c05i.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({email : data.email , password : data.password})
    });

    const json = await response.json();

    if(json.success)
    {
        localStorage.setItem("token",json.authtoken);
        setToken(json.authtoken)
        navigate('/');
    }
    else { alert("false details")}
  };

    const onChange = (e)=>{
        setData({...data,[e.target.name] : e.target.value})
        
      }

  return (
    <div className="LS-container">
      <form className="LS-card" onSubmit={submit}>
        <img src="sketchbook.png" alt="notebook" />
        <h2>Welcome Back</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={onChange}
            placeholder="Enter Email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="button">
          Sign In
        </button>
        <div className="text-center" style={{ marginTop: '20px' }}>
                Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
