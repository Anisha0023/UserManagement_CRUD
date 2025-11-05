import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface UserData {
  id: string;
  UserName: string;
  Countries: string[];
  Code: string;
}

const UserView: React.FC = () => {
  const [userDataByID, setUserDataByID] = useState<UserData | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchUserDataById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${id}`);
      setUserDataByID(res.data);
    } catch (e) {
      toast.error("Failed to fetch the user data");
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDataById();
    }
  }, [id]);

  return (
    <div className="p-8">

      {!userDataByID ? (
        <div className="text-center text-gray-500">Loading user details...</div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {userDataByID.UserName}
          </h2>

          <div className="space-y-3 text-gray-700">
            <div>
              <span className="font-semibold">User ID:</span> {userDataByID.id}
            </div>
            <div>
              <span className="font-semibold">User Name:</span>{" "}
              {userDataByID.UserName}
            </div>
            <div>
              <span className="font-semibold">Code:</span> {userDataByID.Code}
            </div>
            <div>
              <span className="font-semibold">Countries:</span>{" "}
              {userDataByID.Countries && userDataByID.Countries.join(", ")}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserView;
