🧑‍💻 User Management CRUD Application

A simple React + TypeScript CRUD application for managing users, built with reusable components, validation, toast notifications, and mock backend integration using JSON Server.

🚀 Features

Create, Read, Update, Delete (CRUD) operations for users

Reusable components (Modal, InputField, MultiSelect, Toast, Breadcrumb)

Form validation with inline error handling

Dynamic country selection using multi-select dropdown

User details view page

Success/Error notifications using react-toastify

Clean, modern UI styled with Tailwind CSS

🧩 Tech Stack

⚛️ React (TypeScript)

🎨 Tailwind CSS

🔔 React Toastify

🌐 Axios

💾 JSON Server (for mock backend)

🏗️ Project Structure look like this
src/
 ├── Component/
 │   ├── BreadCrumb.tsx
 │   ├── InputField.tsx
 │   ├── Modal.tsx
 │   ├── MultiSelectField.tsx
 │   └── Toast.tsx
 │
 ├── Pages/
 │   ├── Home.tsx
 │   └── UserView.tsx
 │
 ├── App.tsx
 └── index.tsx

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/user-crud-app.git
cd user-crud-app

2️⃣ Install Dependencies
npm install

3️⃣ Start the Mock Backend (JSON Server)

Run the JSON server to simulate API endpoints:

npx json-server --watch db.json --port 5000


Make sure your db.json file looks like this:

{
  "users": [
    {
      "id": 1,
      "UserName": "Anisha",
      "Countries": ["India", "USA"],
      "Code": "A101"
    }
  ],
  "countries": [
    { "name": "India" },
    { "name": "USA" },
    { "name": "UK" },
    { "name": "Germany" }
  ]
}

4️⃣ Start the React App
npm start


The app will run on
👉 Frontend: http://localhost:3000
👉 Backend (Mock): http://localhost:5000

🧠 Key Components
Component	Description
Modal	For adding or editing users
InputField	Reusable input with label
MultiSelectField	Select multiple countries as tags
Toast	Displays success/error messages
Breadcrumb	For navigation hierarchy
UserView	Displays individual user details
🧰 Available Scripts
Command	Description
npm start	Runs the app in development mode
npm run build	Builds the app for production
npx json-server --watch db.json --port 5000	Runs mock API server
