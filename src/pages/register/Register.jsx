import React, { useState } from "react";
import { useRef } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import style from "../../pages/style.module.css";
import Footer from "../footer/Footer";
function Register() {
	const navigate = useNavigate();
	const userNameDom = useRef();
	const firstNameDom = useRef();
	const lastNameDom = useRef();
	const emailDom = useRef();
	const passwordDom = useRef();
     
	const [errors, setErrors] = useState({});

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

		const usernameValue = userNameDom.current.value;
		const firstValue = firstNameDom.current.value;
		const lastValue = lastNameDom.current.value;
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;

		let newErrors = {};
		// if (
		// 	!usernameValue ||
		// 	!firstValue ||
		// 	!lastValue ||
		// 	!emailValue ||
		// 	!passwordValue
		// ) {
		// 	alert("please provide all the required information");
		// 	// setErrors("please provide all the required information");
		// 	return;
		// }

		if (!usernameValue) newErrors.username = "Username is required";
		if (!firstValue) newErrors.firstname = "First Name is required";
		if (!lastValue) newErrors.lastname = "Last Name is required";
		if (!emailValue) newErrors.email = "Email is required";
		if (!passwordValue) newErrors.password = "Password is required";
	
		setErrors(newErrors);
	
		if (Object.keys(newErrors).length > 0) {
		  return;
		}

		try {
			await axios.post("/users/register", {
				username: usernameValue,
				firstname: firstValue,
				lastname: lastValue,
				email: emailValue,
				password: passwordValue,
			});
			alert("registration successfull. please login");
			navigate("/login");
		} catch (error) {
			alert(error?.response?.data?.msg);
			console.log(error?.response);
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
						<div className={style.user_register1}>
							<h2>Join the Network</h2>
							
							<p>
								Already have an account?{" "}
								<Link className={style.link} to="/login">
									Sign in
								</Link>
							</p>
							
						</div>
						<div className={style.user_register}>
							<div className={style.user}>
								<input
									ref={userNameDom}
									type="text"
									name="username"
									placeholder="Username"
									style={{
										backgroundColor: errors.username ? "#ffebee" : "white",
									}}
									onBlur={handleBlur}
									onFocus={handleFocus}
								/>
							</div>
							
							
							<div className={style.firstLastName}>
								<input
									ref={firstNameDom}
									type="text"
									name="firstname"
									placeholder="First Name"
									style={{
										backgroundColor: errors.firstname ? "#ffebee" : "white",
									}}
									onBlur={handleBlur}
									onFocus={handleFocus}
								/>
								
								<input
									className={style.lastName}
									ref={lastNameDom}
									type="text"
									name="lastname"
									placeholder="Last Name"
									style={{
										backgroundColor: errors.lastname ? "#ffebee" : "white",
									}}
									onBlur={handleBlur}
									onFocus={handleFocus}
								/>
							</div>
							
							<input
								ref={emailDom}
								type="email"
								name="email"
								placeholder="Email"
								style={{ backgroundColor: errors.email ? "#ffebee" : "white" }}
								onBlur={handleBlur}
								onFocus={handleFocus}
							/>
							
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
							
							
							{/* <button type="submit">Agree and Join</button> */}
						</div>
			
						<div className={style.user_register1}>
							<p>
								I agree to the{" "}
								<Link className={style.link}>Privacy Policy</Link> and{" "}
								<Link className={style.link}>Terms of Service</Link>.
							</p>
							<br />
                            <button type="submit" className={style.button}>Agree and Join</button>
							<Link className={style.link} to="/login">
								Already have an account?
							</Link>
						</div>
					</form>
					<div className={style.howitworks}>
						<Link className={style.link} to="/about">
							About
						</Link>
						<h1 style={{ fontSize: "45px", color: "#611B00" }}>
							Evangadi Networks
						</h1>
						<p>
							No matter what stage of life you are in, whether you’re just
							starting elementary school or being promoted to CEO of a Fortune
							500 company, you have much to offer to those who are trying to
							follow in your footsteps.
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

export default Register;
