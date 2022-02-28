import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

async function Update(credentials) {
  return await fetch("http://localhost:8081/api/v1/leave/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function Delete(credentials) {
  return await fetch("http://localhost:8081/api/v1/leave/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const DateFormat = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

const Table = () => {
  const [dataList, setDataList] = useState([]);

  async function show() {
    const res = await fetch("http://localhost:8081/api/v1/leave/all");
    res.json().then((res) => setDataList(res));
  }
  show();

  const Edit = (e, Lid) => {
    e.preventDefault();
    Dialog(Lid);
  };

  const Dialog = (Lid) => {
    confirmAlert({
      title: "การอนุมัติ",
      message: "คุณต้องการอนุมัติใช่หรือไม่",
      buttons: [
        {
          label: "ใช่",
          onClick: () => Up(Lid),
        },
        {
          label: "ไม่",
          onClick: () => {},
        },
      ],
      onClickOutside: () => {},
    });
  };

  const Up = (Lid) => {
    const lid = "" + Lid;
    const status = "1";
    const response = Update({
      lid,
      status,
    });
    if (response.message === "Update data complete") {
      alert("อนุมัติแล้ว");
    }
  };

  const Del = async (e, Lid) => {
    const lid = "" + Lid;
    confirmAlert({
      title: "แจ้งเตือน",
      message: "คุณต้องการลบใช่หรือไม่",
      buttons: [
        {
          label: "ใช่",
          onClick: () => {
            const response = Delete({ lid });
            if (response.message === "Delete completed") {
              alert("ลบแล้ว");
            }
          },
        },
        {
          label: "ไม่",
          onClick: () => {},
        },
      ],
      onClickOutside: () => {},
    });
  };

  const Status = (props) => {
    if (props.st == "0") {
      return <p>ยังไม่อนุมัติ</p>;
    } else if (props.st == "1") {
      return <p>อนุมัติแล้ว</p>;
    }
  };

  return (
    <>
      {dataList.sort().map((val) => {
        return (
          <>
            <tr key={val.Lid}>
              <td>{val.Lid}</td>
              <td>{val.Uid}</td>
              <td>{val.Reason}</td>
              <td>{DateFormat(val.Start_date)}</td>
              <td>{DateFormat(val.End_date)}</td>
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
