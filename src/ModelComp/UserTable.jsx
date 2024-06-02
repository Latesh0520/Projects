import { Edit, Eye, EyeOff, Trash } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button, Input, Table } from "reactstrap";

export default function UserTable({ users, setUsers, editHandler, toggle }) {
  let [passwordType, setPasswordType] = useState(null);
  const deleteHandler = (index) => {
    let confirmation = confirm("Do You want to delete...");
    if (confirmation) {
      let filterData = users?.filter((e, i) => i != index);
      setUsers(filterData);
      localStorage.setItem("users", JSON.stringify(filterData));
      toast.success("Deleted Successfully...");
    }
  };
  return (
    <>
      <Button color="danger" onClick={toggle}>
        Add User
      </Button>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((e, i) => {
            return (
              <tr key={"key" + i + 1}>
                <th scope="row">{i + 1}</th>
                <td>{e?.name}</td>
                <td>{e?.email}</td>
                <td>{e?.mobile}</td>
                <td>{e?.gender}</td>
                <td>{e?.hobbies.join(", ")}</td>
                <td className="d-flex gap-2 align-items-center" style={{ display: "flex" }}>
                  <Input
                    type={passwordType != i ? "password" : "text"}
                    value={e?.password}
                    readOnly
                  />
                  {passwordType != i ? (
                    <Eye onClick={() => setPasswordType(i)} />
                  ) : (
                    <EyeOff onClick={() => setPasswordType(null)} />
                  )}
                </td>
                <td>
                    <div className="d-flex gap-2">

                  <Edit color="#00ff91" onClick={() => editHandler(e, i)} />
                  <Trash color="#ff0000" onClick={() => deleteHandler(i)} />
                    </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
