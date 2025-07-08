import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ToggleButton } from "primereact/togglebutton";
import { Tag } from "primereact/tag";
import { InputSwitch } from "primereact/inputswitch";
import { Paginator } from "primereact/paginator";
import CommonLayout from "../../pages/CommonLayout";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [totalRecords, setTotalRecords] = useState(0); // for total users count
  const [first, setFirst] = useState(0); // for pagination starting index
  const [rows, setRows] = useState(10); // for number of rows per page
  const [page, setPage] = useState(1);

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPage(event.page + 1);
  };

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchUsers = async (page, rows) => {
    try {
      const res = await axios.get(
        `http://localhost:5001/admin/users?page=${page}&limit=${rows}`,
        axiosConfig
      );
      console.log("resresres", res);
      // setUsers(res.data);

      //   const filteredUsers = res?.data?.filter((user) => user.role !== 1);
      //   setUsers(filteredUsers);
      //   setTotalRecords(res.data.length); // Set the total count
      // } catch (err) {
      //   console.error("Error fetching users:", err.response?.data || err.message);
      // } finally {
      //   setLoading(false);
      // }

      if (res.data && Array.isArray(res.data.users)) {
        // const filteredUsers = res.data.users.filter((user) => user.role !== 1);
        // setUsers(filteredUsers);
        // console.log("filteredUsers",filteredUsers)
        // setTotalRecords(filteredUsers.length)
        setUsers(res.data.users);
        setTotalRecords(res.data.totalRecords); // Set the total count of users
      } else {
        console.error("Unexpected response structure:", res.data);
      }
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
      await fetchUsers(page, rows);
    } catch (err) {
      console.error("Error toggling user:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchUsers(page, rows);
  }, [page, rows]);

  // Role tag template (mapping integers to string labels)
  const roleTemplate = (rowData) => {
    const roleMap = {
      1: "Superadmin",
      2: "Admin",
      3: "User",
    };

    const severity =
      rowData.role === 1 ? "danger" : rowData.role === 2 ? "warning" : "info";

    return <Tag value={roleMap[rowData.role]} severity={severity}></Tag>;
  };

  // Active toggle button template
  const activeTemplate = (rowData) => {
    if (rowData.role === 1) return <span>—</span>; // Cannot toggle superadmin

    return (
      <InputSwitch
        checked={rowData.active}
        onChange={() => toggleUser(rowData.id)}
      />
    );
  };

  return (
    <CommonLayout>
    <div className="card p-4">
      <h2>User Management (Superadmin)</h2>

      <DataTable
        value={users}
        loading={loading}
        // paginator
        // rows={10}
        responsiveLayout="scroll"
        stripedRows
        scrollable scrollHeight="700px"
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
      {/* Custom Paginator Component */}
      <Paginator
        first={first}
        rows={rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 20, 50]}
        className="fixed bottom-20 w-[75vw]"

      />
    </CommonLayout>
  );
};

export default UserManagement;
