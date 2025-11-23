import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "./Menu.css";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Ab yeh line error nahi degi

  const handleMenu = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
  console.log("Profile clicked! Current state is:", isProfileDropdownOpen);
  setIsProfileDropdownOpen(!isProfileDropdownOpen);
};

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/logout",
        {},
        { withCredentials: true }
      );
      toast.success("Logged out successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="" />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/Home"
              onClick={() => {
                handleMenu(0);
              }}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/Home/orders"
              onClick={() => {
                handleMenu(1);
              }}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/Home/holdings"
              onClick={() => {
                handleMenu(2);
              }}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holding
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/Home/positions"
              onClick={() => {
                handleMenu(3);
              }}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/Home/funds"
              onClick={() => {
                handleMenu(4);
              }}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/Home/apps"
              onClick={() => {
                handleMenu(5);
              }}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                App
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        
      </div>
      <div className="profile-section" ref={dropdownRef}>
  <div className="profile" onClick={handleProfileClick}>
    <div className="avatar">ZU</div>
    <p className="username">USERID</p>
  </div>
  
  {isProfileDropdownOpen && (
    <div className="profile-dropdown">
      <ul>
        <li>
          <Link to="/profile">View Profile</Link>
        </li>
        <li>
          <Link to={"/settings"}>Settings</Link>
        </li>
        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </li>
      </ul>
    </div>
  )}
</div>
      <ToastContainer />
    </div>
  );
};

export default Menu;
