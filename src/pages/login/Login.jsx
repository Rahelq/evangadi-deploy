import React, { useState } from "react";
import { useRef } from "react";
import axios from "../../axiosConfig";
import style from "../../pages/style.module.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
function Login() {
	const navigate = useNavigate();
	const emailDom = useRef();
	const passwordDom = useRef();
	const [errors, setErrors] = useState({});
	const [error, setError] = useState('');
	// const [login, setLogin] = useState('');
	const handleBlur = (e) => {
		const { name, value } = e.target;
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: value ? "" : `${name} is required`,
		}));
	};
	
	const handleFocus = (e) => {
		const { name } = e.target;
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: "",
		}));
	};

	async function handleSubmit(e) {
		e.preventDefault();
		// console.log(userNameDom.current.value);

		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;
		if (!emailValue || !passwordValue) {
			// alert("please provide all the required information");
			setError("please provide all the required information")
			return;
		}
		try {
			const { data } = await axios.post("/users/login", {
				email: emailValue,
				password: passwordValue,
			});
			alert("login successfull.");
			// setLogin("login successfull.")
			localStorage.setItem("token", data.token);
			navigate("/");
			console.log(data);
		} catch (error) {
			alert(error?.response?.data?.msg);
			console.log(error?.response?.data);
		}
	}

	return (
		<section>
			<div>
				<Header />
			</div>
			<section className={style.all_container}>
				<div className={style.container}>
					<form className={style.register} onSubmit={handleSubmit} action="">
					{error && <p  style={{color:"red"}}>{error}</p>}
					{/* {login && <p  style={{backgroundColor:"green"}}>{login}</p>} */}
						<div className={style.user_register1}>
							<h2>Login to your account</h2>
							
							<p>
								Don't have an account ?{" "}
								<Link className={style.link} to="/register">
									Create a new account
								</Link>
							</p>
							
						</div>
						<div className={style.user_register}>
							{/* <span>email :---</span> */}
							<input
								ref={emailDom}
								type="text"
								name="email"
								placeholder="Email"
								style={{ backgroundColor: errors.email ? "#ffebee" : "white" }}
								onBlur={handleBlur}
								onFocus={handleFocus}
							/>
							
							{/* <span>password :---</span> */}
							<input
								ref={passwordDom}
								type="password"
								name="password"
								placeholder="Password"
								style={{
									backgroundColor: errors.password ? "#ffebee" : "white",
								}}
								onBlur={handleBlur}
								onFocus={handleFocus}
							/>
							
							<div className={style.user_register1}>
                 <Link to="/forgot" className={style.forgotPassword}>
					              	Forgot password?
					                </Link>
								<button className={style.button} type="submit">
									Login
								</button>
							</div>
						</div>
						
						<div className={style.user_register1}>
							<Link className={style.link} to="/register">
								create an account ?
							</Link>
						</div>
					</form>
					<div className={style.howitworks}>
						<Link className={style.link} to="/about">
							About
						</Link>
						<h1 style={{ fontSize: "45px", color: "#611B00"}}>
							Evangadi Networks
						</h1>
						<p>
						No matter what stage of life you are in, whether you’re just starting elementary school or being promoted to CEO of a Fortune 500 company, you have much to offer to those who are trying to follow in your footsteps.
						</p>
						
						<p>
						Wheather you are willing to share your knowledge or you are just looking to meet mentors of your own, please start by joining the network here.
						</p>
						
						
						<button className={style.button}>How it works</button>
					</div>
				</div>
			</section>

			<Footer />
		</section>
	);
}

export default Login;
