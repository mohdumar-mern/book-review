import { Circle, CircleUser, LogOut, Mail } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/auth";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName, userId, userEmail, userRole } = useSelector(
    (state) => state.auth
  );

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const updateProfileHandler = () => {
    navigate(`/update-profile/${userId}`);
  };

  return (
    <section className="p-6 mt-12 max-w-xl mx-auto bg-white shadow rounded text-black">
      <Helmet>
        <title>{userName ? `${userName}'s Profile` : "User Profile"} | Book Review</title>
        <meta
          name="description"
          content="View and manage your profile, update personal information, and logout securely from your account."
        />
      </Helmet>

      <h1 className="text-3xl flex items-center gap-1 font-bold mb-4"><CircleUser size={40} color="gray" /> {userName || "User"}</h1>

      <div className="flex items-center gap-2 mb-3 text-gray-800">
        <Mail className="text-blue-600" />
        <span className="text-lg">{userEmail || "No email"}</span>
      </div>

      <p className="mb-4 text-gray-700">
        <strong>Role:</strong> {userRole || "user"}
      </p>

      <p className="text-gray-600 mb-6">
        Welcome to your profile. Here you’ll see your reviews and activity.
      </p>

      <div className="flex gap-4">
        <button
          onClick={logoutHandler}
          aria-label="Logout"
          className="text-red-500 flex items-center gap-1 hover:bg-red-200 hover:text-red-600 border border-red-500 px-4 py-2 rounded shadow transition"
        >
          <LogOut size={18} />
          Logout
        </button>

        <button
          onClick={updateProfileHandler}
          aria-label="Update Profile"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition"
        >
          Update Profile
        </button>
      </div>
    </section>
  );
};

export default Profile;
