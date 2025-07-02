import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToggleButton } from "primereact/togglebutton";
import { Tag } from "primereact/tag";
import { InputSwitch } from "primereact/inputswitch";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/admin/users",
        axiosConfig
      );
      // setUsers(res.data);

      const filteredUsers = res.data.filter((user) => user.role !== "superadmin");
      setUsers(filteredUsers);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleUser = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:5001/admin/toggle/${userId}`,
        {},
        axiosConfig
      );
      await fetchUsers(); // Refresh list
    } catch (err) {
      console.error("Error toggling user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Role tag template
  const roleTemplate = (rowData) => {
    const severity =
      rowData.role === "superadmin"
        ? "danger"
        : rowData.role === "admin"
        ? "warning"
        : "info";
    return <Tag value={rowData.role} severity={severity}></Tag>;
  };

  // Active toggle button template
  const activeTemplate = (rowData) => {
    if (rowData.role !== "user") return <span>—</span>;

    return (
      // <ToggleButton
      //   checked={rowData.active}
      //   onLabel="Active"
      //   offLabel="Inactive"
      //   onIcon="pi pi-check"
      //   offIcon="pi pi-times"
      //   className="p-button-sm"
      //   onChange={() => toggleUser(rowData.id)}
      // />
      <InputSwitch
        checked={rowData.active}
        onChange={() => toggleUser(rowData.id)}
      />
    );
  };

  return (
    <div className="card p-4">
      <h2>User Management (Superadmin)</h2>

      <DataTable
        value={users}
        loading={loading}
        paginator
        rows={10}
        responsiveLayout="scroll"
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="name" header="Name" sortable></Column>
        <Column field="emailId" header="Email" sortable></Column>
        <Column field="role" header="Role" body={roleTemplate}></Column>
        <Column
          field="active"
          header="Toggle Active"
          body={activeTemplate}
        ></Column>
      </DataTable>
    </div>
  );
};

export default UserManagement;
