import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [toSearch, setToSearch] = useState("");

  const user = useSelector((state) => state.authentication.user);
  return (
    <div className="container-fluid nopad margin-bot ">
      <nav className="navbar navbar-expand-lg navbar-light bg-light main-navbar">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Recipes{" "}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  My recipes
                </a>
                <Link to={"/recipes/random"} className="text-decoration-none">
                <span className="dropdown-item" href="#">
                  Random Recipe
                </span>
                </Link>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  href={user ? "/CreateRecipe" : "/Login"}
                >
                  Create my own recipe
                </a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Looking for a recipe ?"
              aria-label="Recipe"
              onChange={(e) => setToSearch(e.target.value)}
            />
            <Link to={"/search/" + toSearch}>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </Link>
          </form>
        </div>

        {user ? (
          <div className="media">
            <div className="media-body">
              <h5 className="username-navbar">{user.username}</h5>
              <a className="username-navbar" href="/login">
                Log out
              </a>
            </div>
            <img
              src="../../images/Lenna.png"
              alt="..."
              className="rounded-circle profile-picture-navbar"
            />
          </div>
        ) : (
          <button
            type="button"
            className="btn btn-outline-primary my-2 my-sm-0"
          >
            <a href="/Login">Connection</a>
          </button>
        )}
      </nav>
    </div>
  );
};

export { NavBar };
