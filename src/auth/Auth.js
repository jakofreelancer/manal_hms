import React, { useEffect, useState } from "react";
import firebase from "../firebase.js";
import Spinner from "../components/General/Spinner";

export const AuthContext = React.createContext();

export const AuthProvider = ( props ) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
	}, []);

	if(loading) {
		return (
			<div
				style={{
					// display: "flex",
					// alignItems: "center",
					// justifyContent: "center",
					// height: "80vh",
					// backgroundColor: "red",
					display: "block",
					position: "fixed",
					zIndex: "1031",
					top: "30%",
					right: "50%",
					marginTop: "-..px"
					// left: "1000px",
					// left: "500px",
					// marginLeft: "-4em"
				}}
			>
				{/* <h1>Loading User...</h1> */}
                <Spinner />
			</div>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				currentUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};