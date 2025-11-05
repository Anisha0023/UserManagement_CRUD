import React, { useState } from "react";
import Sidebar from "../Component/Sidebar";
import PropertiesPage from "./PropertiesPage";
import UsersList from "./UserList";

const Home: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("Users"); 

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar active={activePage} onChange={setActivePage} />

      <main className="flex-1 p-8 overflow-y-auto select-none">
        {activePage === "Properties" && <PropertiesPage />}
        {activePage === "Users" && <UsersList />}
        {activePage === "Profile" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4 ">Profile</h1>
            <p>This is the Profile section.</p>
          </div>
        )}
        {activePage === "Settings" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Settings</h1>
            <p>Settings content goes here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
