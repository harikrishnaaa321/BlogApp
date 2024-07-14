import { Sidebar } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { useLocation, Link } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const currentUser = useSelector((state)=>state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {}
  };
  return (
    <Sidebar className="w-full md:w-36">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ?'Admin':'User' }
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
            <Sidebar.Item active={tab === "posts"} icon={HiDocumentText}>
              posts
            </Sidebar.Item>
          </Link>
          )}
          

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
            as='div'
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
