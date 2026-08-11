import { useState, useEffect } from 'react'
import API from "./services/app.js"
import './App.css'

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
  });
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getEmployees = async () => {
    try {
      const response = await API.get("/employees");

      console.log(response.data);
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE employee
        const response = await API.put(`/employees/${editId}`, formData);

        console.log("Employee Updated:", response.data);
        alert("Employee Updated Successfully");

        setEditId(null);
      } else {
        // ADD employee
        const response = await API.post("/employees", formData);

        console.log("Employee Added:", response.data);
        alert("Employee Added Successfully");
      }

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        salary: "",
      });

      // Refresh employee list
      await getEmployees();

    } catch (error) {
      console.log(error);
      console.log("Server Error:", error.response?.data);
      alert("Failed to save employee");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/employees/${id}`);

      alert("Employee Deleted Successfully");

      await getEmployees();
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Employee");
    }
  };

  const handleUpdate = async (id) => {
    const employee = employees.find((emp) => emp._id === id);

    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      salary: employee.salary,
    });

    setEditId(id);
  };



  // Keep your existing return(...) here
  // return (
  //   <div class="app bg-green-200 w-100%">
  //     <h1 >Employee Management System</h1>
  //       <form class='employee-form ' class="flex flex-col justify-center gap-1" onSubmit={handleSubmit}>

  //         <input class="bg-amber-200 text-amber-800 border rounded shadow hover:scale-102 transition w-40 h-10"
  //           type="text"
  //           name="name"
  //           placeholder='Employee Name'
  //           value={formData.name}
  //           onChange={handleChange}
  //         />

  //         <input class="bg-amber-200 text-amber-800 border rounded shadow hover:scale-102 transition w-40 h-10"
  //           type="email"
  //           name="email"
  //           placeholder='Employee Email'
  //           value={formData.email}
  //           onChange={handleChange}
  //         />

  //         <input class="bg-amber-200 text-amber-800 border rounded shadow hover:scale-102 transition w-40 h-10"
  //           type="text"
  //           name="phone"
  //           placeholder='phone Number'
  //           value={formData.phone}
  //           onChange={handleChange}
  //         />

  //         <input class="bg-amber-200 text-amber-800 border rounded shadow hover:scale-102 transition w-40 h-10"
  //           type="text"
  //           name="department"
  //           placeholder='Department'
  //           value={formData.department}
  //           onChange={handleChange}
  //         />

  //         <input class="bg-amber-200 text-amber-800 border rounded shadow hover:scale-102 transition w-40 h-10"
  //           type="text"
  //           name="salary"
  //           placeholder='Salary'
  //           value={formData.salary}
  //           onChange={handleChange}
  //         />

  //         <button type="submit" class='bg-amber-700 w-40 h-10 rounded hover:scale-105'>
  //           {editId ? "Update Employee" : "Add Employee"}
  //         </button>
  //       </form>
      


  //     <div class="employee-list">
  //       <h2>Employees</h2>
  //       <div class='employee-form '>

  //         {employees.map((employee) => (
  //           <div key={employee._id} class="employee-card">
  //             <h3>{employee.name}</h3>
  //             <p>Email: {employee.email}</p>
  //             <p>Phone: {employee.phone}</p>
  //             <p>Department: {employee.department}</p>
  //             <p>Salary: ₹{employee.salary}</p>
  //             <div>
  //               <button onClick={() => handleUpdate(employee._id)}>
  //                 Update
  //               </button>
  //               <button onClick={() => handleDelete(employee._id)}>
  //                 Delete
  //               </button>
  //             </div>

  //           </div>
  //         ))}
  //       </div>

  //     </div>
  //   </div>
  // );

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
    <div class="mb-12">
      <h1 class="text-5xl font-bold bg-gradient-to-r m-4 from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        Employee Management System
      </h1>
      <div class="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div class="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 shadow-2xl border border-purple-500/20 sticky top-8">
          <h2 class="text-2xl font-bold text-white mb-6">
            {editId ? "✏️ Update Employee" : "➕ Add Employee"}
          </h2>
          
          <form class="flex flex-col gap-4 p-3" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Employee Name" value={formData.name} onChange={handleChange} class="px-4 py-3 rounded-lg bg-slate-700/50 border border-purple-400/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
            <input type="email" name="email" placeholder="Employee Email" value={formData.email} onChange={handleChange} class="px-4 py-3 rounded-lg bg-slate-700/50 border border-purple-400/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} class="px-4 py-3 rounded-lg bg-slate-700/50 border border-purple-400/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
            <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} class="px-4 py-3 rounded-lg bg-slate-700/50 border border-purple-400/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
            <input type="text" name="salary" placeholder="Salary" value={formData.salary} onChange={handleChange} class="px-4 py-3 rounded-lg bg-slate-700/50 border border-purple-400/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition" />
            <button type="submit" class="mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-lg">
              {editId ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        </div>
      </div>

      <div class="lg:col-span-2">
        <h2 class="text-3xl font-bold text-white mb-6 flex items-center gap-2">
          <span class="w-2 h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"></span>
          Team Members
        </h2>

        <div class=" p-1 grid grid-cols-1  md:grid-cols-2 gap-6">
          {employees.map((employee) => (
            <div key={employee._id} class="bg-gradient-to-br m-2 p-2 from-slate-800 to-slate-700 rounded-2xl p-6 border border-purple-500/20 hover:border-pink-500/40 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
              <div class="mb-4 pb-4 border-b border-purple-500/20">
                <h3 class="text-2xl font-bold text-white">{employee.name}</h3>
                <div class="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-2"></div>
              </div>
              
              <div class="space-y-3 mb-6">
                <div class="flex items-start gap-3"><span class="text-purple-400 font-semibold">📧 Email:</span><span class="text-slate-300">{employee.email}</span></div>
                <div class="flex items-center gap-3"><span class="text-purple-400 font-semibold">📱 Phone:</span><span class="text-slate-300">{employee.phone}</span></div>
                <div class="flex items-center gap-3"><span class="text-purple-400 font-semibold">🏢 Dept:</span><span class="text-slate-300">{employee.department}</span></div>
                <div class="flex items-center gap-3"><span class="text-purple-400 font-semibold">💰 Salary:</span><span class="text-pink-400 font-bold">₹{employee.salary}</span></div>
              </div>

              <div class="flex gap-3 pt-4 border-t border-purple-500/20">
                <button onClick={() => handleUpdate(employee._id)} class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition transform hover:scale-105">✏️ Update</button>
                <button onClick={() => handleDelete(employee._id)} class="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold rounded-lg hover:from-red-700 hover:to-pink-700 transition transform hover:scale-105">🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
  
}


export default App;
