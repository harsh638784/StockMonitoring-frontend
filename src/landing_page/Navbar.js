import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

function Navbar() {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (cookies.token) {
      // ✅ If token exists → go to external game site
      window.location.href = "https://color-pattern-memory-game.vercel.app";
    } else {
      // ❌ If no token → show toast + redirect to login
      toast.warn("Please login to access Dashboard", {
        position: "bottom-left",
      });
      navigate("/login");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <RouterLink className="navbar-brand" to="/">
          <img src="media/images/logo.svg" style={{ width: "30%" }} alt="" />
        </RouterLink>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Button
                component={RouterLink}
                to="/about"
                variant="text"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                About
              </Button>
            </li>

            <li className="nav-item">
              <Button
                component={RouterLink}
                to="/products"
                variant="text"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Products
              </Button>
            </li>

            <li className="nav-item">
              <Button
                component={RouterLink}
                to="/pricing"
                variant="text"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Pricing
              </Button>
            </li>

            <li className="nav-item">
              <Button
                component={RouterLink}
                to="/support"
                variant="text"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Support
              </Button>
            </li>

            {/* ✅ Dashboard button with token check */}
            <li className="nav-item">
              <Button
                onClick={handleDashboardClick}
                variant="text"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                Dashboard
              </Button>
            </li>
          </ul>

          <div className="ms-auto d-flex">
            <Stack direction="row" spacing={1}>
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                color="secondary"
                size="small"
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Signup
              </Button>

              <Button
                component={RouterLink}
                to="/login"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Login
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
