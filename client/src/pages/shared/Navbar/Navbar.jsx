import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthInfo/AuthContext";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiHome,
  FiUserPlus,
  FiLogIn,
  FiLogOut,
  FiUser,
} from "react-icons/fi";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const location = useLocation();

  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Signed out successfully"))
      .catch((error) => console.error("Sign out error:", error));
  };

  // Animated NavLink component
  const NavLink = ({ to, icon, children }) => (
    <motion.li
      whileHover={{
        y: -2,
        transition: { type: "spring", stiffness: 400 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`flex items-center gap-2 relative py-2 px-3 rounded-lg transition-colors ${
          location.pathname === to
            ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        {React.cloneElement(icon, {
          className: `text-lg ${
            location.pathname === to
              ? "text-indigo-600"
              : "text-gray-600 dark:text-gray-300"
          }`,
        })}
        <span>{children}</span>
        {location.pathname === to && (
          <motion.div
            layoutId="navActiveIndicator"
            className="absolute inset-0 border-2 border-indigo-400 rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </Link>
    </motion.li>
  );

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo on the left */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="flex items-center">
              <motion.span
                className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Hello World
              </motion.span>
            </Link>
          </motion.div>

          {/* Navigation links on the right */}
          <div className="flex items-center space-x-1">
            {/* User info and logout if logged in */}
            {user ? (
              <div className="flex items-center space-x-2 ml-2">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2"
                >
                  <Link
                    to="/myPostedJobs"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      location.pathname === "/"
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-md"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <FiHome
                      className={`text-lg ${
                        location.pathname === "/"
                          ? "text-white"
                          : "text-indigo-500 dark:text-indigo-400"
                      }`}
                    />
                    <span>My Posted Jobs</span>
                    {location.pathname === "/" && (
                      <motion.div
                        layoutId="homeActiveIndicator"
                        className="absolute inset-0 rounded-lg bg-indigo-700/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                  {/* Add New Job Section */}
                  <Link
                    to="/addJob"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      location.pathname === "/"
                        ? "bg-indigo-600 text-white border-indigo-700 shadow-md"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                    }`}
                  >
                    <FiHome
                      className={`text-lg ${
                        location.pathname === "/"
                          ? "text-white"
                          : "text-indigo-500 dark:text-indigo-400"
                      }`}
                    />
                    <span>Add new job</span>
                    {location.pathname === "/" && (
                      <motion.div
                        layoutId="homeActiveIndicator"
                        className="absolute inset-0 rounded-lg bg-indigo-700/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center text-sm rounded-full"
                >
                  <span className="mr-2 font-medium text-gray-700 dark:text-gray-200">
                    <FiUser className="inline mr-1" />
                    {user.email}
                  </span>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-2"
                >
                  <Link
                    to="/jobApplication"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-sm font-medium border border-indigo-200 dark:border-indigo-700"
                  >
                    <FiBriefcase />
                    My Applications
                  </Link>
                </motion.div>

                <motion.button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.3)",
                  }}
                  whileTap={{
                    scale: 0.95,
                    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
                  }}
                >
                  <FiLogOut />
                  Sign Out
                </motion.button>
              </div>
            ) : (
              <ul className="flex space-x-1">
                <NavLink to="/" icon={<FiHome />}>
                  Home
                </NavLink>
                <NavLink to="/register" icon={<FiUserPlus />}>
                  Register
                </NavLink>
                <NavLink to="/signIn" icon={<FiLogIn />}>
                  Login
                </NavLink>
              </ul>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
