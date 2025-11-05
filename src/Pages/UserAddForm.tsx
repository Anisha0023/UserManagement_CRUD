import { ChangeEvent, useEffect, useState } from "react";
import InputField from "../Component/InputField";
import Modal from "../Component/Modal";
import MultiSelectField from "../Component/MultiSelectField";
import axios from "axios";
import { toast } from "react-toastify";

interface Country {
  name: string;
}

interface FormData {
  userName: string;
  countries: string[];
  code: string;
}

interface UserAddFormProps {
  onClose: () => void;
  userData?: any;
  refreshData: () => void;
}

const UserAddForm: React.FC<UserAddFormProps> = ({ onClose, userData, refreshData }) => {
  const [formData, setFormData] = useState<FormData>({
    userName: userData?.UserName || "",
    countries: userData?.Countries || [],
    code: userData?.Code || "",
  });

  const [countryData, setCountryData] = useState<Country[]>([]);
  const [errors, setErrors] = useState({
    nameError: "",
    countryError: "",
  });

  

  const fetchCountry = async () => {
    try {
      const res = await axios.get("http://localhost:5000/countries");
      setCountryData(res.data);
    } catch {
      toast.error("Failed to fetch countries");
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        userName: userData.UserName || "",
        countries: userData.Countries || [],
        code: userData.Code || "",
      });
    }
  }, [userData]);

  const countryOptions = countryData.map((items) => ({
    label: items.name,
    value: items.name,
  }));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "userName" && value.trim() !== "") {
      setErrors((prev) => ({ ...prev, nameError: "" }));
    }
  };

  const handleCountryChange = (selected: string[]) => {
    setFormData((prev) => ({
      ...prev,
      countries: selected,
    }));

    if (selected.length > 0) {
      setErrors((prev) => ({ ...prev, countryError: "" }));
    }
  };

  const handleSave = async () => {
    const newErrors = { nameError: "", countryError: "" };
    let isValid = true;

    if (!formData.userName.trim()) {
      newErrors.nameError = "User name is required.";
      isValid = false;
    }

    if (formData.countries.length <= 0) {
      newErrors.countryError = "Select at least one country.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      //toast.error("Please fix validation errors!");
      return;
    }

    try {
      const payload = {
        UserName: formData.userName,
        Countries: formData.countries,
        Code: formData.code,
      };

      if (userData) {
        const updateUser = await axios.put(
          `http://localhost:5000/users/${userData.id}`,
          payload
        );
        if (updateUser.status === 200) {
          toast.success("User updated successfully!");
          await refreshData();
          onClose();
        }
      } else {
        const res = await axios.post("http://localhost:5000/users", payload);
        if (res.status === 201 || res.status === 200) {
          toast.success("User added successfully!");
          await refreshData();
          setFormData({ userName: "", countries: [], code: "" });
          onClose();
        }
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("Failed to save user");
    }
  };

  return (
    <Modal title={userData ? "Edit User" : "Add New User"} onClose={onClose} onSave={handleSave}>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter the Username <span className="text-red-500">*</span>
          </label>
          <InputField
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Enter User Name"
          />
          {errors.nameError && <p className="text-red-500 text-sm mt-1">{errors.nameError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select the Country
          </label>
          <MultiSelectField
            options={countryOptions}
            selectedValues={formData.countries}
            onChange={handleCountryChange}
          />
          {errors.countryError && <p className="text-red-500 text-sm mt-1">{errors.countryError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter the User Code
          </label>
          <InputField
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Enter User Code"
          />
        </div>
      </form>
    </Modal>
  );
};

export default UserAddForm;
