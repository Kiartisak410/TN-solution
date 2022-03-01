import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Popup from "./popup";

import "react-datepicker/dist/react-datepicker.css";

const DateFormat = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
};

const AddSal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [get, setGet] = useState([]);
  const [data, setData] = useState([]);
  const [uname, setUname] = useState("");
  const [sal_base, setSalBase] = useState("");
  const [sal_total, setSalTotal] = useState("");
  const [sal_date, setSalDate] = useState("");
  const [leave, setLeave] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = new Promise(async (resolve) => {
      async function show() {
        const res = await fetch("http://localhost:8081/api/v1/all", signal);
        res.json().then((res) => setDataList(res));
      }
      show();
    });
    promise.cancel = () => controller.abort();

    async function Data() {
      const res = await fetch("http://localhost:8081/api/v1/leave/all");
      res.json().then((res) => setData(res));
    }
    Data();
  });

  const userGet = (id) => {
    setUname(id);
    setGet(data.find((data) => data.Uid === id));
  };

  const salcom = (sal) => {
    setSalBase(sal);
    alert(get.length)
    const count = get.reduce(
      (count, { Status }) => (Status === "1" ? (count += 1) : count),
      0
    );
    setLeave(count);
    const sum = sal - count * (sal / 30);
    setSalTotal(parseFloat(sum).toFixed(2));
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <input
        type="button"
        value="เพิ่มการจ่าย"
        className="btn-add"
        onClick={togglePopup}
      />
      {isOpen && (
        <Popup
          content={
            <>
              <h3>เพิ่มการจ่าย</h3>
              <form className="add-sal">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => userGet(e.target.value)}
                >
                  <option selected>เลือกผู้ใช้</option>
                  {dataList.map((val) => {
                    return (
                      <>
                        <option value={val.Uname}>{val.Uname}</option>
                      </>
                    );
                  })}
                </select>
                <label class="form-label">ฐานเงินเดือน</label>
                <input
                  type="text"
                  onChange={(e) => salcom(e.target.value)}
                ></input>
                <div className="total">
                  <div className="lotal-group">
                    <label for="exampleInputEmail1" class="form-label">
                      เงินเดือนสุทธิ
                    </label>
                    <input type="text" defaultValue={sal_total}></input>
                  </div>
                  <div className="total-group">
                    <label for="exampleInputEmail1" class="form-label">
                      จำนวนวันลา
                    </label>
                    <input type="text" defaultValue={leave}></input>
                  </div>
                </div>
                <label for="exampleInputEmail1" class="form-label">
                  วันที่ออก
                </label>
                <input type="date" />
                <button type="submit" className="btn-submit">
                  เพิ่ม
                </button>
              </form>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </>
  );
};

const Table = () => {
  const [dataSal, setDataSal] = useState([]);

  useEffect(() => {
    async function sal() {
      const res = await fetch("http://localhost:8081/api/v1/sal/all");
      res.json().then((res) => setDataSal(res));
    }
    sal();
  });

  return (
    <>
      <tbody>
        {dataSal.map((val) => {
          return (
            <tr>
              <td>{val.Sid}</td>
              <td>{val.Uname}</td>
              <td>{val.Sal_base}</td>
              <td>{val.Sal_total}</td>
              <td>{DateFormat(val.Sal_date)}</td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

const Salary = () => {
  return (
    <>
      <h1>จัดการเงินเดือน</h1>
      <AddSal />
      <table className="tb-em">
        <thead>
          <th>เลขที่บันทึก</th>
          <th>ชื่อผู้ใช้</th>
          <th>ฐานเงินเดือน</th>
          <th>เงินเดือนสุทธิ</th>
          <th>วันที่ออก</th>
        </thead>
        <Table />
      </table>
    </>
  );
};

export default Salary;
