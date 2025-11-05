import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Breadcrumb from "../Component/BreadCrumb";
import UserAddForm from "./UserAddForm";
import { toast } from "react-toastify";
import axios from "axios";

const PropertiesPage: React.FC = () => {
     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
     const[userList,setUserList]=useState<any[]>([]);


  const fetchUserData=async()=>{
    try{
        const userData=await axios.get("http://localhost:5000/users")
        setUserList(userData.data);
    }
    catch(e){
        toast.error("Failed to fetch the data");
        console.log(e)

    }

  };

  useEffect(()=>{
    fetchUserData();
  },[])

  return (
    <>
      <Breadcrumb items={[{ label: "Home", active: true }]} />
      <h1 className="text-2xl font-semibold mb-6">User Management</h1>

      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <button className="w-20 h-20 bg-gray-200 rounded-full mb-6 flex justify-center items-center hover:bg-gray-300 transition"
        onClick={()=>{setIsModalOpen(true)}}
        >
          <Plus size={30} />
        </button>
        {isModalOpen && <UserAddForm onClose={() => setIsModalOpen(false)} refreshData={fetchUserData} />}
        <h2 className="text-lg font-semibold mb-2">Create a New User</h2>
        <p className="text-gray-500 max-w-md">
          Add user details, set permissions, and assign roles to manage access.
        </p>
      </div>
    </>
  );
};

export default PropertiesPage;
