import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, LogOut, CircleUser } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/auth";
import Container from "./UI/Container";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, userRole } = useSelector((state) => state.auth);

  const handleToggle = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    closeMenu();
  };

  const baseNavItems = [
    { label: "Home", path: "/" },
    { label: "Books", path: "/books" },
    userRole === "admin" && { label: "Add Book", path: "/add-book" },
    !token && { label: "Login", path: "/login" },
  ].filter(Boolean);
  
  const profileNavItem = token ? { label: <CircleUser />, path: "/profile" } : null;
  
  const navItems = profileNavItem ? [...baseNavItems, profileNavItem] : baseNavItems;
  

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex justify-between items-center px-4 py-3">
          {/* Logo */}
          <NavLink to="/" className="text-blue-600 text-2xl font-bold">
          📚 BookVerse
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                    : "text-gray-700 hover:text-blue-600"
                }
              >
                {item.label}
              </NavLink>
            ))}


          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={handleToggle}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <Menu size={28} />
          </button>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white px-4 pb-4">
            <ul className="flex flex-col gap-4 text-base">
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
                        : "text-gray-700 hover:text-blue-600"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {token && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 flex items-center gap-1 hover:text-red-600"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Header;
