import React, { useState } from "react";
import Popup from "./popup";

async function DelUser(credentials) {
  return await fetch("http://localhost:8081/api/v1/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function AddUser(credentials) {
  return fetch("http://localhost:8081/api/v1/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

async function UpdateUser(credentials) {
  return fetch("http://localhost:8081/api/v1/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const EmTable = () => {
  const [dataList, setDatalist] = useState([]);
  const [edit, setEdit] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const controller = new AbortController();
  const signal = controller.signal;
  const promise = new Promise(async (resolve) => {
    async function show() {
      const res = await fetch("http://localhost:8081/api/v1/all", signal);
      res.json().then((res) => setDatalist(res));
    }
    show();
  });
  promise.cancel = () => controller.abort();

  const Edit = (e, uName, passWord, fName, lName, eMail, pHone, adDress) => {
    setEdit(dataList.find((dataList) => dataList.Uname === uName));
    e.preventDefault();
    setUname(uName);
    setFname(fName);
    setLname(lName);
    setEmail(eMail);
    setPhone(pHone);
    setAddress(adDress);

    // alert(edit.Uname);
    if (uname != null) {
      togglePopup();
    }
  };

  const Del = (e, uname) => {
    e.preventDefault();
    setUname(uname);
    alert(uname);
    DelUser({
      uname,
    });
    alert("ลบเสร็จสิ้น");
  };

  const update = async (e) => {
    e.preventDefault();
    alert(fname);
    const response = await UpdateUser({
      uname,
      password,
      fname,
      lname,
      email,
      phone,
      address,
    });
    if (response.message === "Update data complete") {
      togglePopup();
    }
  };

  return (
    <>
      {dataList.map((val) => {
        return (
          <>
            <tbody>
              <td>{val.Uname}</td>
              <td>{val.Fname}</td>
              <td>{val.Lname}</td>
              <td>{val.Email}</td>
              <td>{val.Address}</td>
              <td>{val.Phone}</td>
              <td>
                <button className="btnDel" onClick={(e) => Del(e, val.Uname)}>
                  ลบ
                </button>
                <button
                  className="btn-edit"
                  onClick={(e) =>
                    Edit(
                      e,
                      val.Uname,
                      val.Password,
                      val.Fname,
                      val.Lname,
                      val.Email,
                      val.Address,
                      val.Phone
                    )
                  }
                >
                  แก้ไข
                </button>
              </td>
            </tbody>
          </>
        );
      })}
      {}
      {isOpen && (
        <Popup
          content={
            <>
              <h3>แก้ไขข้อมูล</h3>
              <form onSubmit={update} className="add-form">
                <label htmlFor="user" className="">
                  <i className="fas fa-user"></i> ชื่อผู้ใช้
                </label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  className=""
                  defaultValue={edit.Uname}
                  required
                  onChange={(e) => setUname(e.target.value)}
                />
                <label htmlFor="pass" className="">
                  <i class="fas fa-key"></i> รหัสผ่าน
                </label>
                <input
                  type="password"
                  name="pass"
                  id="user"
                  className=""
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="fname" className="">
                  <i class="fas fa-tag"></i> ชื่อ
                </label>
                <input
                  type="text"
                  name="fname"
                  id="user"
                  className=""
                  defaultValue={edit.Fname}
                  required
                  onChange={(e) => setFname(e.target.value)}
                />
                <label htmlFor="lname" className="">
                  <i class="fas fa-tag"></i> นามสกุล
                </label>
                <input
                  type="text"
                  name="lname"
                  id="user"
                  className=""
                  defaultValue={edit.Lname}
                  required
                  onChange={(e) => setLname(e.target.value)}
                />
                <label htmlFor="email" className="">
                  <i class="fas fa-at"></i> อีเมล์
                </label>
                <input
                  type="text"
                  name="email"
                  id="user"
                  className=""
                  defaultValue={edit.Email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone" className="">
                  <i class="fas fa-phone"></i> เบอร์โทรศัพท์
                </label>
                <input
                  type="text"
                  name="phone"
                  id="user"
                  className=""
                  defaultValue={edit.Phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="address" className="">
                  <i class="fas fa-map-marker-alt"></i> ที่อยู่
                </label>
                <input
                  type="text"
                  name="address"
                  id="user"
                  className=""
                  defaultValue={edit.Address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button type="submit" className="btn-submit">
                  แก้ไขข้อมูล
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

const AddBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const submit = async (e) => {
    e.preventDefault();
    const response = await AddUser({
      uname,
      password,
      fname,
      lname,
      email,
      phone,
      address,
      role,
    });
    if (response.message === "Add data complete") {
      togglePopup();
    }
  };

  return (
    <>
      <div>
        <input
          type="button"
          value="เพิ่มผู้ใช้"
          className="btn-add"
          onClick={togglePopup}
        />
        {isOpen && (
          <Popup
            content={
              <>
                <h3>เพิ่มผู้ใช้</h3>
                <form onSubmit={submit} className="add-form">
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
                      <i class="fas fa-key"></i> รหัสผ่าน
                    </label>
                    <input
                      type="password"
                      name="pass"
                      id="user"
                      className="validate"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="fname" className="">
                      <i class="fas fa-tag"></i> ชื่อ
                    </label>
                    <input
                      type="text"
                      name="fname"
                      id="user"
                      className="validate"
                      required
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="lname" className="">
                      <i class="fas fa-tag"></i> นามสกุล
                    </label>
                    <input
                      type="text"
                      name="lname"
                      id="user"
                      className="validate"
                      required
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="email" className="">
                      <i class="fas fa-at"></i> อีเมล์
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="user"
                      className="validate"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="phone" className="">
                      <i class="fas fa-phone"></i> เบอร์โทรศัพท์
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="user"
                      className="validate"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="address" className="">
                      <i class="fas fa-map-marker-alt"></i> ที่อยู่
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="user"
                      className="validate"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option selected>เลือกสิทธิ์ผู้ใช้</option>
                    <option value="1">ผู้ดูแล</option>
                    <option value="2">ผู้ใช้</option>
                  </select>
                  <button type="submit" className="btn-submit">
                    เพิ่ม
                  </button>
                </form>
              </>
            }
            handleClose={togglePopup}
          />
        )}
      </div>
    </>
  );
};

const EmManage = () => {
  return (
    <>
      <h1>จัดการพนักงาน</h1>
      <AddBox />
      <table className="tb-em">
        <thead>
          <th>ชื่อผู้ใช้</th>
          <th>ชื่อ</th>
          <th>นามสกุล</th>
          <th>อีเมล์</th>
          <th>ที่อยู่</th>
          <th>เบอร์โทรศัพท์</th>
          <th>ตัวเลือก</th>
        </thead>
        <EmTable />
      </table>
    </>
  );
};

export default EmManage;
