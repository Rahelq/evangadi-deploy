import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { createContext, useEffect, useState } from "react";
import axios from "./axiosConfig";
import Answer from "./pages/answer/Answer";
import Question from "./pages/question/Question"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import ResetPassword from "./pages/ResetPassword/ResetPassword"

// import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
// import ResetPassword from "./pages/forgotpassword/ResetPassword";
export const AppState = createContext();
function App() {
	const [user, setuser] = useState([]);

	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	async function checkUser() {
		try {
			const { data } = await axios.get("/users/check", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			// console.log(data)
			setuser(data);
		} catch (error) {
			console.log(error.response);
			navigate("/login");
		}
	}

	useEffect(() => {
		checkUser();
	}, [token]);

	return (
		<AppState.Provider value={{ user, setuser }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot" element={<ForgotPassword />} />
				<Route path="/question" element={<Question />} />
                <Route path="/answer/:questionid" element={<Answer />} />
				<Route path="/reset/:resetToken" element={<ResetPassword />} />
			</Routes>
		</AppState.Provider>
	);
}

export default App;
