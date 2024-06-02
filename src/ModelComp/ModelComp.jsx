import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";

const userStructre = {
  name: "",
  email: "",
  mobile: "",
  gender: "",
  hobbies: [],
  password: "",
  cpassword: "",
};
export default function ModelComp({
  editIndex,
  modal,
  toggle,
  users,
  setUsers,
  user,
  setUser,
}) {
  let [passwordType, setPasswordType] = useState(null);
  let [cpasswordType, setCPasswordType] = useState(null);
  const manageHobbies = (hooby) => {
    let hobbies = user.hobbies;
    if (user.hobbies.includes(hooby)) {
      hobbies = hobbies?.filter((e) => e != hooby);
    } else {
      hobbies.push(hooby);
    }
    setUser({ ...user, hobbies: hobbies });
  };
  const saveHandler = () => {
    if (user.name == "" || user.email == "" || user.mobile == "") {
      if (user.name == "") {
        toast.error("Please Enter name");
      }
      if (user.email == "") {
        toast.error("Please Enter email");
      }
      if (user.mobile == "") {
        toast.error("Please Enter mobile");
      }
    } else {
      if (user.password != user.cpassword) {
        toast.error("Password Not Match..");
      }else {
        if (editIndex == null) {
          setUsers([...users, user]);
          localStorage.setItem("users", JSON.stringify([...users, user]));
          setUser(userStructre);
          setPasswordType(null);
          setCPasswordType(null);
          toggle(false);
        }else {
           users?.splice(editIndex, 1, user);
          setUsers(users);
          localStorage.setItem("users", JSON.stringify(users));
          setUser(userStructre);
          setPasswordType(null);
          setCPasswordType(null);
          toggle(false);
        } 
     }
    }
  };
  const cancelUpdate = () => {
    setUser(userStructre);
    toggle(false);
  };
  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div className="mb-2">
              <Input
                type="text"
                onChange={(e) => setUser({ ...user, name: e?.target?.value })}
                placeholder="Enter Name"
                value={user?.name}
              />
            </div>
            <div className="mb-2">
              <Input
                type="email"
                onChange={(e) => setUser({ ...user, email: e?.target?.value })}
                placeholder="Enter Email"
                value={user?.email}
              />
            </div>
            <div className="mb-2">
              <Input
                type="text"
                onChange={(e) => setUser({ ...user, mobile: e?.target?.value })}
                placeholder="Enter Mobile no"
                value={user?.mobile}
              />
            </div>
            <div className="mb-2" style={{ display: "flex", gap: "10px" }}>
              <div>
                <Input
                  id="male"
                  type="radio"
                  onChange={(e) => setUser({ ...user, gender: "male" })}
                  checked={user?.gender == "male"}
                />
                <Label for="male">Male</Label>
              </div>
              <div>
                <Input
                  id="female"
                  type="radio"
                  onChange={(e) => setUser({ ...user, gender: "female" })}
                  checked={user?.gender == "female"}
                />
                <Label for="female">Female</Label>
              </div>
              <div>
                <Input
                  id="other"
                  type="radio"
                  onChange={(e) => setUser({ ...user, gender: "other" })}
                  checked={user?.gender == "other"}
                />
                <Label for="other">Other</Label>
              </div>
            </div>
            <div className="mb-2" style={{ display: "flex", gap: "10px" }}>
              <div>
                <Input
                  id=""
                  type="checkbox"
                  onChange={() => {
                    manageHobbies("Playing cricket");
                  }}
                  checked={user?.hobbies?.includes("Playing cricket")}
                />
                <Label for="">Playing cricket</Label>
              </div>
              <div>
                <Input
                  id=""
                  type="checkbox"
                  onChange={() => {
                    manageHobbies("Dancing");
                  }}
                  checked={user?.hobbies?.includes("Dancing")}
                />
                <Label for="">Dancing</Label>
              </div>
              <div>
                <Input
                  id=""
                  type="checkbox"
                  onChange={() => {
                    manageHobbies("Singing");
                  }}
                  checked={user?.hobbies?.includes("Singing")}
                />
                <Label for="">Singing</Label>
              </div>
              <div>
                <Input
                  id=""
                  type="checkbox"
                  onChange={() => {
                    manageHobbies("Coding");
                  }}
                  checked={user?.hobbies?.includes("Coding")}
                />
                <Label for="">Coding</Label>
              </div>
            </div>
            <div className="mb-2 d-flex align-items-center gap-3">
              <Input
                type={passwordType ? "text" : "password"}
                placeholder="Enter Password"
                value={user?.password}
                onChange={(e) =>
                  setUser({ ...user, password: e?.target?.value })
                }
              />
              {passwordType ? (
                <EyeOff onClick={() => setPasswordType(null)} />
              ) : (
                <Eye onClick={() => setPasswordType(true)} />
              )}
            </div>
            <div className="mb-2 d-flex align-items-center gap-3">
              <Input
                type={cpasswordType ? "text" : "password"}
                placeholder="Enter Password"
                value={user?.cpassword}
                onChange={(e) =>
                  setUser({ ...user, cpassword: e?.target?.value })
                }
              />
              {cpasswordType ? (
                <EyeOff onClick={() => setCPasswordType(null)} />
              ) : (
                <Eye onClick={() => setCPasswordType(true)} />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={saveHandler}>
              {editIndex == null ? "Submit" : "Update"}
            </Button>
            <Button color="secondary" onClick={() => cancelUpdate()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
}
