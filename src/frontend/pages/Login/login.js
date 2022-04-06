import './login.css'
import {useState} from 'react'
import logo from '../../images/Logo.png';




const Login = () => {

    const [log, setLog] = useState (true);

    const [userName,setUserName] = useState ('')
    const [email,setEmail] = useState ('')
    const [password,setPassword] = useState ('')
    const [passwordConfirm,setPasswordConfirm] = useState ('')
    const [passerr,setPasserr] = useState (false)
    
    const login = (e) => 
    {
        if( email && password )
        {
            e.preventDefault()
            const data = { Email: email, Password: password }

              console.log(data);
              setEmail("");
              setPassword("");
        }
    }

    const submit = (e) => 
    {
        if( userName && email && password && passwordConfirm )
        {
            e.preventDefault()
           if(password === passwordConfirm)
           {
               
            const data = { User_Name: userName, Email: email, Password: password, Password_Confirm: passwordConfirm }

              console.log(data);
              setUserName("");
              setEmail("");
              setPassword("");
              setPasswordConfirm("");
              setPasserr(false);
           }
           else
           {
                setPasserr(true);
           }
        }
    }
    
    return (
        <div className="login_page">
            <div className="logo_box">
                <div className="logo">
                    <img src={logo}></img>
                </div>
            </div>
            {
                (log) ?
                <form className="login">
                    <h2> Login</h2>
                    <input type="email" name="email" placeholder="E-mail" value={email} required
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
                    <input type="password" name="password"
                    required placeholder="Password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    />
                    <button type="submit"
                    onClick={(e)=>{login(e)}}
                    >Login</button>
                    <p className="p_registration" 
                    onClick={()=>{
                        setLog(false);
                    }}>Registration</p>
                </form>
                :
                <form className="registration">
                    <h2>Registration</h2>
                    <input type="text" name="username" placeholder="User Name"
                    value={userName} required
                    onChange={(e)=>{
                        setUserName(e.target.value);
                    }}
                    />
                    <input type="email" name="email" placeholder="E-mail"
                    value={email} required
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    />
                    <input type="password" name="password" placeholder="Password" required
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    />
                    <input type="password" name="password" placeholder="Confirm Password"
                    value={passwordConfirm} required
                    onChange={(e)=>{
                        setPasswordConfirm(e.target.value);
                    }}
                    />
                    {
                        (passerr) ?
                        <p className="passerr">Please Confirm Your Password</p>
                        :
                        null
                    }
                    <button type="submit"
                    onClick={(e)=>{submit(e)}}
                    >Submit</button>
                    <p className="p_registration"
                    onClick={()=>{
                        setLog(true);
                    }}
                    >Login</p>
                </form>
            }
        </div>
    )
    
}

export {Login}