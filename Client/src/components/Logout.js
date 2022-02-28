import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

const LogBtn = () => {

  const logout = () => {
    alert("ออกจากระบบแล้ว")
  };
  return <Link to="/" onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</Link>
};

function Logout() {
  return (
    <>
      <LogBtn />
    </>
  );
}

export default Logout;
