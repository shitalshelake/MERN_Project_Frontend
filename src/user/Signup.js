import React, {useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {signup} from "../auth/helper";

const Signup = () => {

 const [values, setValues] = useState({
     name:"",
     lastname:"",
     email:"",
     password:"",
     error:"",
     success:false
     
 });

 const {name, lastname,email, password, error, success} = values;

 const handleChange = name => event => {
     setValues({...values, error: false, [name]: event.target.value});
 };

 const onSubmit = event => {
     event.preventDefault();
     setValues({...values, error: false});
     signup({name,lastname, email, password})
     .then(data => {
        if(data.error){
            setValues({...values, error: data.error, success: false});
        } else {
            setValues({
                ...values,
                name: "",
                lastname:"",
                email: "",
                password: "",
                error: "",
                success: true
            });
        }
     
     })
     .catch(console.log("Error in Signup"));
 };
    const signUpForm = () => {
        return(
        <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input className="form-control" onChange={handleChange("name")} type="text" value={name}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Lastname</label>
                        <input className="form-control" onChange={handleChange("lastname")} type="text" value={lastname}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input className="form-control" onChange={handleChange("email")} type="email" value={email}/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input className="form-control" onChange={handleChange("password")} type="password" value={password}/>
                    </div>
                   
                    <button onClick ={onSubmit} className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>
        );
    };

    const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                style={{ display: success ? "" : "none" }}
              >
                New account was created successfully. Please
                <Link to="/signin">Login Here</Link>
              </div>
            </div>
          </div>
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };

      
    return (
      <Base title= "Sign up page" description ="A page for user to sign up !">
         {successMessage()}
         {errorMessage()}
         {signUpForm()}
         <p className="text-light text-center">{JSON.stringify(values)}</p>
        </Base>
    );
};

export default Signup;