import React from "react";
import { Tv, Settings, CreditCard, User, Users, Menu, House } from "lucide-react";

interface SidebarProps {
  active: string;
  onChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onChange }) => {
  const menuItems = [
    { label: "Properties", icon: <House className="w-6 h-6" /> },
    { label: "Users", icon: <Users className="w-6 h-6" /> },
    { label: "Profile", icon: <User className="w-6 h-6" /> },
    { label: "Settings", icon: <Settings className="w-6 h-6" /> },
    { label: "TV", icon: <Tv className="w-6 h-6" /> },
    { label: "Cards", icon: <CreditCard className="w-6 h-6" /> },
  ];

  return (
    <aside className="w-24 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-6 select-none cursor-pointer">
      <Menu className="w-6 h-6 text-gray-600" />
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`flex flex-col items-center ${
            active === item.label
              ? "text-blue-600"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => onChange(item.label)}
        >
          {item.icon}
          <h1 className="text-xs mt-1">{item.label}</h1>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
