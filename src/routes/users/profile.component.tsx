// import { useNavigate, useParams } from "react-router-dom";
// import axiosClient from "../../services/axios-client.js";
// import { useEffect, useState } from "react";
// import { useStateConetxt } from "../../contexts/ContextProvider.tsx";
// import { FormContainer, PageHeaderContainer } from "../../components/shared/shared.styles.tsx";
//
// export default function Profile() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState(null);
//   const [passwordErrors, setPasswordErrors] = useState(null);
//   const [users, setUser] = useState({
//     id: null,
//     name: "",
//     email: "",
//     avatar: "",
//     current_password: "",
//     new_password: "",
//     new_password_confirmation: "",
//   });
//
//   const [displayPassForm, setDisplayPassForm] = useState("none");
//   const [displayBtn, setDisplayBtn] = useState("");
//   const { setNotification } = useStateConetxt();
//
//   useEffect(() => {
//     if (id) {
//       setLoading(true);
//       axiosClient
//         .get(`users/${id}`)
//         .then(({ data }) => {
//           setLoading(false);
//           setUser(data.data);
//         })
//         .catch((err) => {
//           console.log(err);
//           setLoading(false);
//         });
//     }
//   }, [id]);
//
//   const onSubmit = (e) => {
//     e.preventDefault();
//
//     if (users.id) {
//       axiosClient
//         .put(`users/${users.id}`, users)
//         .then(() => {
//           setNotification("Please check your email to reset your password");
//           navigate("/users");
//         })
//         .catch((err) => {
//           const response = err.response;
//           if (response && response.status === 422) {
//             setErrors(response.data.errors);
//           }
//         });
//     } else {
//       axiosClient
//         .post("/users", users)
//         .then(() => {
//           setNotification("Please check your email to reset your password");
//           navigate("/users");
//         })
//         .catch((err) => {
//           const response = err.response;
//           if (response && response.status === 422) {
//             setErrors(response.data.errors);
//           }
//         });
//     }
//   };
//
//   const updatePassword = (e) => {
//     e.preventDefault();
//
//     setPasswordErrors([]);
//
//     if (users.id) {
//       axiosClient
//         .put(`password`, {
//           current_password: users.current_password,
//           new_password: users.new_password,
//           new_password_confirmation: users.new_password_confirmation,
//         })
//         .then(() => {
//           setNotification("Please check your email to reset your password");
//           setUser({
//             ...users,
//             current_password: "",
//             new_password: "",
//             new_password_confirmation: "",
//           });
//           setDisplayBtn("");
//           setDisplayPassForm("none");
//         })
//         .catch((err) => {
//           const response = err.response;
//           if (response && response.status === 422) {
//             setPasswordErrors(response.data.errors);
//           }
//         });
//     }
//   };
//
//   const handleClick = (e) => {
//     setErrors(null);
//     setDisplayPassForm("block");
//     setDisplayBtn("none");
//   };
//
//   const handleCloseClick = (e) => {
//     setErrors(null);
//     setDisplayPassForm("none");
//     setDisplayBtn("");
//   };
//
//   return (
//     <>
//       {users.id && (
//         <PageHeaderContainer>
//           <h1>Profile</h1>
//         </PageHeaderContainer>
//       )}
//       <FormContainer>
//         {loading && <div className="text-center">Loading...</div>}
//         {errors && (
//           <div className={"alert"}>
//             {Object.keys(errors).map((key) => (
//               <p key={key}>{errors[key][0]}</p>
//             ))}
//           </div>
//         )}
//         {!loading && (
//           <form onSubmit={onSubmit}>
//             {/*TODO: Put avatar into a new image form*/}
//             {/*<img src={users.avatar} width={60} height={60} alt=""/><br/>*/}
//             {/*<button style={{backgroundColor: 'White', color: 'black', borderRadius: '10px'}}>Change</button>*/}
//             {/*<input type="file" id="img" name="img" accept="image/*" />*/}
//
//             <div style={{ marginTop: "1%" }}></div>
//             <input
//               onChange={(e) => setUser({ ...users, name: e.target.value })}
//               value={users.name}
//               placeholder={"Name"}
//             />
//             <input
//               onChange={(e) => setUser({ ...users, email: e.target.value })}
//               value={users.email}
//               placeholder={"Email"}
//               type={"email"}
//               disabled={true}
//             />
//
//             <button className="btn">Save</button>
//           </form>
//         )}
//
//         <div style={{ marginTop: "5%" }}></div>
//
//         <form style={{ display: `${displayPassForm}` }} onSubmit={updatePassword}>
//           {passwordErrors && (
//             <div className={"alert"}>
//               {Object.keys(passwordErrors).map((key) => (
//                 <p key={key}>{passwordErrors[key][0]}</p>
//               ))}
//             </div>
//           )}
//           <h2>Change your password</h2>
//           <br />
//           <input
//             onChange={(e) => setUser({ ...users, current_password: e.target.value })}
//             placeholder={"Current Password"}
//             type={"password"}
//           />
//           <input
//             onChange={(e) => setUser({ ...users, new_password: e.target.value })}
//             placeholder={"New Password"}
//             type={"password"}
//           />
//           <input
//             onChange={(e) => setUser({ ...users, new_password_confirmation: e.target.value })}
//             placeholder={"New Password Confirmation"}
//             type={"password"}
//           />
//           <button type={"submit"} className="btn">
//             Update Password
//           </button>
//           &nbsp;
//           <button className={"btn"} type={"button"} onClick={handleCloseClick}>
//             Close
//           </button>
//         </form>
//         <button style={{ display: `${displayBtn}` }} onClick={handleClick} className={"btn"}>
//           Change Password
//         </button>
//       </FormContainer>
//     </>
//   );
// }
