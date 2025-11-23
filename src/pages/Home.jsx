// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import styles from './index.module.css';
 
// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");

// const [toastShown, setToastShown] = useState(false);

 

// useEffect(() => {
//   const verifyCookie = async () => {
//     const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
//     if (data.status && !toastShown) {
//       setUsername(data.user);
//       toast(`Hello ${data.user}`, { position: "top-right" });
//       setToastShown(true);
//     } else if (!data.status) {
//       removeCookie("token");
//       navigate("/login");
//     }
//   };
//   verifyCookie();
// }, [toastShown]);




//   const Logout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };
//   return (
//     <>
     
//         <div className={styles.home_page}>
//           <h4>
//             {" "}
//             Welcome <span>{username}</span>
//           </h4>
//           <button onClick={Logout}>LOGOUT</button>
//         </div>
 
//       <ToastContainer />
//     </>
//   );
// };

// export default Home;