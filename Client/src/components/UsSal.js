import React, { useEffect, useState } from "react";

const DateFormat = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

const Table = (props) => {
  const [data, setData] = useState([]);
  const [uname, setUname] = useState(props.name);

  useEffect(() => {
    async function sal() {
      const res = await fetch("http://localhost:8081/api/v1/sal/all");
      res.json().then((res) => setData(res));
    }
    sal();
  });

  return (
    <>
      {data.map((val) => {
        if (val.Uname === uname) {
          return (
            <tr>
              <td>{val.Sid}</td>
              <td>{val.Uname}</td>
              <td>{val.Sal_base}</td>
              <td>{val.Sal_total}</td>
              <td>{DateFormat(val.Sal_date)}</td>
            </tr>
          );
        }
      })}
    </>
  );
};

const UsSal = (props) => {
  return (
    <>
      <h1>รายการเงินเดือน</h1>
      <div className="con-tb">
        <table className="tb-em">
          <thead>
            <th>เลขที่บันทึก</th>
            <th>ชื่อผู้ใช้</th>
            <th>ฐานเงินเดือน</th>
            <th>เงินเดือนสุทธิ</th>
            <th>วันที่ออกรายการ</th>
          </thead>
          <tbody>
            <Table name={props.name} />
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsSal;
