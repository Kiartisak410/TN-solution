import React, { useState } from "react";

async function Update(credentials) {
  return await fetch("http://localhost:8081/api/v1/leave/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Table = () => {
  const [dataList, setDataList] = useState([]);
  const [lid, setLid] = useState("");
  const [status, setStatus] = useState("1");

  async function show() {
    const res = await fetch("http://localhost:8081/api/v1/leave/all");
    res.json().then((res) => setDataList(res));
  }
  show();

  const Edit = async (e, Lid) => {
    setLid(Lid)
    e.preventDefault();
    alert(lid);
    const result = window.confirm("อนุมัติ ?");
    if (result) {
      const response = await Update({
        lid,
        status,
      });
      if (response.message === "Update data complete") {
        alert("อนุมัติแล้ว");
      }
    }
  };

  const Del = async (e) => {};

  const Status = (props) => {
    if (props.st == "0") {
      return <p>ยังไม่อนุมัติ</p>;
    } else if (props.st == "1") {
      return <p>อนุมัติแล้ว</p>;
    }
  };

  return (
    <>
      {dataList.map((val) => {
        return (
          <>
            <tr>
              <td>{val.Lid}</td>
              <td>{val.Uid}</td>
              <td>{val.Reason}</td>
              <td>{val.Start_date}</td>
              <td>{val.End_date}</td>
              <td>
                <Status st={val.Status} />
              </td>
              <td>
                <button className="btn-up" onClick={(e) => Edit(e, val.Lid)}>
                  อนุมัติ
                </button>
                <button className="btnDel" onClick={(e) => Del(e, val.Lid)}>
                  ลบ
                </button>
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
};

const Leave = () => {
  return (
    <>
      <h1>การลา</h1>
      <table className="tb-em">
        <thead>
          <th>ลำดับ</th>
          <th>ชื่อผู้ใช้</th>
          <th>เหตุผลการลา</th>
          <th>วันที่เริ่ม</th>
          <th>วันที่สิ้นสุด</th>
          <th>สถานะ</th>
          <th>ตัวเลือก</th>
        </thead>
        <tbody>
          <Table />
        </tbody>
      </table>
    </>
  );
};

export default Leave;
