import React, { useEffect, useState } from "react";

async function SaveData(credentials) {
  return fetch("http://localhost:8081/api/v1/leave/add", {
    method: "POST",
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

const ReDateFormat = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
};

const Add = (props) => {
  const [uid, setUname] = useState(props.name);
  const [reason, setReason] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const response = await SaveData({
      uid,
      reason,
      start,
      end,
    });
  };

  return (
    <>
      <div className="add-col">
        <form onSubmit={submit}>
          <div className="group">
            <label>เหตุผลการลา</label>
            <input
              type="text"
              name="reason"
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="group-2">
            <label>วันที่เริ่ม</label>
            <input
              type="date"
              onChange={(e) => setStart(ReDateFormat(e.target.value))}
            />
          </div>
          <div className="group-2">
            <label>วันที่สิ้นสุด</label>
            <input
              type="date"
              onChange={(e) => setEnd(ReDateFormat(e.target.value))}
            />
          </div>
          <button type="submit" className="btn-save">บันทึก</button>
        </form>
      </div>
    </>
  );
};

const Table = (props) => {
  const [uname, setUname] = useState(props.name);
  const [data, setData] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = new Promise(async (resolve) => {
      async function show() {
        const res = await fetch(
          "http://localhost:8081/api/v1/leave/all",
          signal
        );
        res.json().then((res) => setData(res));
      }
      show();
    });
    promise.cancel = () => controller.abort();
  });

  const Status = (props) => {
    if (props.st == "0") {
      return <p>ยังไม่อนุมัติ</p>;
    } else if (props.st == "1") {
      return <p>อนุมัติแล้ว</p>;
    }
  };

  return (
    <>
      {data.map((val) => {
        if (val.Uid === uname) {
          return (
            <>
              <tr>
                <td>{val.Lid}</td>
                <td>{val.Uid}</td>
                <td>{val.Reason}</td>
                <td>{DateFormat(val.Start_date)}</td>
                <td>{DateFormat(val.End_date)}</td>
                <td>
                  <Status st={val.Status} />
                </td>
              </tr>
            </>
          );
        }
      })}
    </>
  );
};

const UsLeave = (props) => {
  return (
    <>
      <h1>การลา</h1>
      <Add name={props.name} />
      <hr />
      <div className="con-tb">
        <table className="tb-em">
          <thead>
            <th>เลขที่บันทึก</th>
            <th>ชื่อผู้ใช้</th>
            <th>เหตุผล</th>
            <th>วันที่เริ่ม</th>
            <th>วันที่สิ้นสุด</th>
            <th>สถานะ</th>
          </thead>
          <tbody>
            <Table name={props.name} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsLeave;
