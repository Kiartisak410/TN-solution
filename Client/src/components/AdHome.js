import React, { useEffect, useState } from "react";
import axios from "axios";

const AdHome = (props) => {
  const [dataList, setDatalist] = useState([]);

  useEffect(() => {
    axios("http://localhost:8081/api/v1/all").then((response) =>
      setDatalist(response.data)
    );
  });

  // if (props.name != null){
  //   setUser(dataList.find((dataList) => dataList.Uname === props.name));
  // }

  const Sum = () => {
    const count = dataList.length;
    return (
      <>
        <div className="sum-card">
          <h3>ผู้ใช้ทั้งหมด</h3>
          <div>{count}</div>
        </div>
      </>
    );
  };

  const SumUser = () => {
    const count = dataList.reduce(
      (count, { Role }) => (Role === "2" ? (count += 1) : count),
      0
    );
    return (
      <>
        <div className="user-card">
          <h3>ผู้ใช้</h3>
          <div>{count}</div>
        </div>
      </>
    );
  };
  const SumAdmin = () => {
    const count = dataList.reduce(
      (count, { Role }) => (Role === "1" ? (count += 1) : count),
      0
    );
    return (
      <>
        <div className="admin-card">
          <h3>ผู้ดูแล</h3>
          <div>{count}</div>
        </div>
      </>
    );
  };

  return (
    <>
      <h1>Hello Morning</h1>
      <div></div>
      <div className="list-card">
        <Sum />
        <SumUser />
        <SumAdmin />
      </div>
    </>
  );
};
export default AdHome;
