import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Breadcrumb from "../Component/BreadCrumb";
import UserAddForm from "./UserAddForm";
import axios from "axios";
import { toast } from "react-toastify";
import DataTable from "../Component/DataTable";
import { useNavigate } from "react-router-dom";

const UsersList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("users");
  const[userList,setUserList]=useState<any[]>([]);
  const[selectedUser,setSelectedUser]=useState<any | null>(null);

  const navigate=useNavigate();


  const fetchUserData=async()=>{
    try{
        const userData=await axios.get("http://localhost:5000/users")
        setUserList(userData.data);
    }
    catch(e){
        toast.error("Failed to fetch the data");
        //console.log(e)
    }
  };

  useEffect(()=>{
    fetchUserData();
  },[]);

   const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

    const handleAdd = () => {
    setSelectedUser(null); 
    setIsModalOpen(true);
  };

const columns = [
  { accessor: "UserName", header: "User Name" },
  { accessor: "Countries", header: "Country",cells: (row: any) => row?.Countries?.join(", ") || "-" },
  { accessor: "Code", header: "Code", },
  {
    header: "Action",
    cells: (row: any) => (
      <div className="p-2 space-x-2 flex items-center">
        <button
          className="text-blue-600"
          onClick={() =>navigate(`userView/${row.id}`) }
        >
          View
        </button>
        <button
          className="text-green-600"
          onClick={() => handleEdit(row)}
        >
          Edit
        </button>
      </div>
    ),
  },
];


  return (
    <>
      <Breadcrumb
        items={[
          { label: "Users & Partners" },
          { label: "Users", active: true },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 select-none">
        <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Users</h1>

        <button
          onClick={() => handleAdd()}
          className="flex items-center justify-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={15} />
          Add New User
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-6 select-none">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-3 px-4 font-medium ${
            activeTab === "users"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 px-4 font-medium ${
            activeTab === "profile"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Profile
        </button>
      </div>

      {activeTab === "users" && (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm select-none">
         <DataTable
        columns={columns}
        data={userList}
      />
        </div>
      )}

      {activeTab === "profile" && (
        <div className="p-6 bg-white border rounded-lg shadow-sm select-none">
          <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
          <p className="text-gray-600">Profile info will appear here...</p>
        </div>
      )}

      {isModalOpen && 
      <UserAddForm 
      onClose={() => {setIsModalOpen(false); fetchUserData()}} 
      userData={selectedUser}
        refreshData={fetchUserData} 
          />
          }
    </>
  );
};

export default UsersList;
