import { Link } from "react-router-dom";
import "./Nav.css";
import { useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation();
  const getButtonStyles = (path, activeBgColor) => {
    const isActive = location.pathname === path;
    return ` rounded-full focus:outline-none focus:ring ${
      isActive
        ? `px-4 py-2 bg-[${activeBgColor}] text-black font-bold border-2`
        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
    }`;
  };
  return (
    <div className="nav">
      <Link to="/">
        <div className="nav-logo">
          <div className="nav-logo-image">
            <img src="/traveler_logo_ 1.png" alt="Logo" />
          </div>
        </div>
      </Link>
      <div className="nav-menu flex space-x-4">
        <Link to="/search">
          <button
            className={`nav-menu-item ${getButtonStyles("/search", "#D9FAFF")}`}
          >
            <div className="nav-menu-box px-4 py-2 text-black  rounded-full  focus:outline-none  ">
              여행 추천
            </div>
          </button>
        </Link>
        <Link to="/planpage">
          <button
            className={`nav-menu-item ${getButtonStyles(
              "/planpage",
              "#FFD1D1"
            )}`}
          >
            <div className="nav-menu-box px-4 py-2 text-gray-600 rounded-full focus:outline-none ">
              여행 계획
            </div>
          </button>
        </Link>
        <Link to="/storypage">
          <button
            className={`nav-menu-item ${getButtonStyles(
              "/storypage",
              "#D8FFD8"
            )}`}
          >
            <div className="nav-menu-box px-4 py-2 text-gray-600 rounded-full  ">
              커뮤니티
            </div>
          </button>
        </Link>
        <Link to="/mypage">
          <button
            className={`nav-menu-item ${getButtonStyles(
              "/mypage",
              "#E7E152BA"

            )}`}
          >
            <div className="nav-menu-box px-4 py-2 text-gray-600  rounded-full ">
              나의 여행
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
