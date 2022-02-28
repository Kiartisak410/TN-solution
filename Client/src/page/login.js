import React, { useState } from "react";
import logo from "../img/user.png";
import { Redirect } from "react-router-dom";

async function loginUser(credentials) {
  return fetch("http://localhost:8081/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Logname = () => (
  <h1 className="login">
    <i className="fas fa-lock"></i> Login
  </h1>
);
const LogForm = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("0");
  const submit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      uname,
      password,
    });
    if (response.Role === "1") {
      console.log(response.role);
      alert("ยินดีต้อนรับ");
      setRedirect("admin");
      setUname(response.Uname);
    }
    if (response.Role === "2") {
      console.log(response.role);
      alert("ยินดีต้อนรับ");
      setRedirect("user");
      setUname(response.Uname);
    }
    if (response.message === "Incorrect Password") {
      alert("รหัสผานไม่ถูกต้อง");
    }
    if (response.message === "User Not Found") {
      alert("ไม่พบชื่อผู้ใช้");
    }
  };

  if (redirect === "admin") {
    return <Redirect to={`/admin/${uname}`} />;
  }
  if (redirect === "user") {
    return <Redirect to={"/user"} />;
  }

  return (
    <form onSubmit={submit} className="logform">
      <div className="input-field">
        <label htmlFor="user" className="">
          <i className="fas fa-user"></i> ชื่อผู้ใช้
        </label>
        <input
          type="text"
          name="user"
          id="user"
          className="validate"
          required
          onChange={(e) => setUname(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label htmlFor="pass" className="">
          <i className="fas fa-key"></i> รหัสผ่าน
        </label>
        <input
          type="password"
          name="pass"
          id="pass"
          className="validate"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn-log">
        ลงชื่อเข้าใช้
      </button>
    </form>
  );
};
const ImgForm = () => <img src={logo} alt="" />;

function Login() {
  return (
    <>
      <div className="container m-t-1 bg-log">
        <div className="row">
          <div className="col-7"></div>
          <div className="col-5">
            <ImgForm />
            <Logname />
            <LogForm />
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
