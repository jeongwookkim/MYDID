import React, { useState, useEffect } from "react";
import { Navbar, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import {} from "jquery.cookie";
axios.defaults.withCredentials = true;
const headers = { withCredentials: true };

function Header() {
  const [buttonDisplay, setButtonDisplay] = useState("none");
  const [logoutbutton, setlogoutbutton]= useState(false);

  useEffect(() => {
    getButtonStyle();
  }, []);
  useEffect(()=> {
    getLogoutStyle();
  }, []); 

  function getLogoutStyle(){
    if (sessionStorage.getItem('auth') ==='0') {
      setlogoutbutton("block");
    }else if(sessionStorage.getItem('auth') ==='2'){
      setlogoutbutton("block");
    }else{
      setlogoutbutton("none");
    }    
  }
  function getButtonStyle() {
    if (sessionStorage.getItem('auth')==='2') {
      setButtonDisplay("block");
    } else {
      setButtonDisplay("none");
    }
  }

  function logout() {
    axios
      .get(process.env.REACT_APP_URL+"/member/logout", { headers })
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

  const logoutstyle = {
    margin: "0px 5px 0px 10px",
    display: logoutbutton,
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
          ​<Button style={logoutstyle}  variant="danger" onClick={logout} >
           ​ 로그아웃
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
