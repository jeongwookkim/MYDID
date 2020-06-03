import React, { useState, useEffect } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function Header() {
  const [buttonDisplay, setButtonDisplay] = useState("none");
  const [buttonDisplay2, getlogoutButtonDisplay] = useState("none");

  useEffect(() => {
    getButtonStyle();
  }, []);

  useEffect(() => {
    getlogoutButtonStyle();
  }, []);

  //로그아웃 버튼
  function getlogoutButtonStyle() {
    if (
      sessionStorage.getItem("auth") === "0" ||
      sessionStorage.getItem("auth") === "2"
    ) {
      getlogoutButtonDisplay("block");
    } else {
      getlogoutButtonDisplay("none");
    }
  }

  //글쓰기 글목록 버튼
  function getButtonStyle() {
    if (
      sessionStorage.getItem("auth") === undefined ||
      sessionStorage.getItem("auth") === "2"
    ) {
      setButtonDisplay("block");
    } else {
      setButtonDisplay("none");
    }
  }

  function logout() {
    axios
      .get("http://localhost:8080/member/logout", { headers })
      .then((returnData) => {
        if (returnData.data.message) {
          sessionStorage.clear();
          alert("로그아웃 되었습니다!");
          window.location.href = "/";
        }
      });
  }

  const buttonStyle = {
    margin: "0px 5px 0px 10px",
    display: buttonDisplay,
  };

  const buttonStyle2 = {
    margin: "0px 5px 0px 10px",
    display: buttonDisplay2,
  };

  const divStyle = {
    justifyContent: "space-around",
    backgroundColor: "black",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };

  return (
    <div style={divStyle}>
      <Image src="./img/mydid-logo2.png" width="300px" />
      <Navbar>
        ​ <Navbar.Brand href="/"></Navbar.Brand>
        ​ <Navbar.Toggle />​{" "}
        <Navbar.Collapse className="justify-content-end">
          {/* <NavLink to="/mypage">
​      <Button style={buttonStyle} variant="primary">
​       회원정보 수정
​      </Button>
​     </NavLink> */}
          <NavLink to="/">
            <Button style={buttonStyle} variant="secondary">
              ​ 글목록
            </Button>
          </NavLink>
          <NavLink to="/boardWrite">
            <Button style={buttonStyle} variant="secondary">
              ​ 글쓰기
            </Button>
          </NavLink>
          ​
          <Button style={buttonStyle2} variant="danger" onClick={logout}>
            ​ 로그아웃
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
