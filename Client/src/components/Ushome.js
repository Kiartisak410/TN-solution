import React, { useEffect, useState } from "react";
import Popup from "./popup";

async function UpdateUser(credentials) {
  return fetch("http://localhost:8081/api/v1/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Profile = (props) => {
  const [uname, setUname] = useState(props.name);
  const [edit, setEdit] = useState([]);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = new Promise(async (resolve) => {
      async function show() {
        const res = await fetch("http://localhost:8081/api/v1/all", signal);
        res.json().then((res) => setData(res));
      }
      show();
    });
    promise.cancel = () => controller.abort();
  });

  const Edit = (e, uName, passWord, fName, lName, eMail, pHone, adDress) => {
    setEdit(data.find((dataList) => dataList.Uname === uName));
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
      {data.map((val) => {
        if (val.Uname === uname) {
          return (
            <>
              <h3>ชื่อผู้ใช้ : {val.Uname}</h3>
              <h3>ชื่อ : {val.Fname}</h3>
              <h3>นามสกุล : {val.Lname}</h3>
              <h3>อีเมล์ : {val.Email}</h3>
              <h3>เบอร์โทรศัพท์ : {val.Phone}</h3>
              <h3>ที่อยู่ : {val.Address}</h3>
              <div className="con-edit">
                <button
                  className="btn-user-edit"
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
              </div>
              <div className="pop">
                {isOpen && (
                  <Popup
                    content={
                      <>
                        <h3>แก้ไขข้อมูล</h3>
                        <form onSubmit={update} className="edit-box">
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
              </div>
            </>
          );
        }
      })}
    </>
  );
};

const UsHome = (props) => {
  return (
    <>
      <h1>
        หน้าแรก
        <Profile name={props.name} />
      </h1>
    </>
  );
};

export default UsHome;
