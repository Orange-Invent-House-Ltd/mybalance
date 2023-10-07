import React from "react";
import warningIcon from "../../assets/Icons/warningIcon.svg";
import useStore from "../../store";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const Modal = ({
  setLogoutModal,
  logoutModal,
}: {
  setLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
  logoutModal: boolean;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.clear();
    queryClient.invalidateQueries({ queryKey: ["user"] });
    navigate("/login");
  };

  return (
    <AlertDialog.Root open={logoutModal}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#3a3a3a]/50  backdrop-blur-md fixed inset-0 z-50" />
        <AlertDialog.Content className="animate-jump   fixed top-0 left-0 z-50 w-full h-full  ">
          <div className="max-w-[400px] w-full py-6 px-6 min-h-[246px] rounded absolute bg-white  top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 ">
            <img src={warningIcon} className="mb-5" alt="" />
            <div className="mb-8  ">
              <h1 className="text-lg font-medium">Logout!</h1>
              <p className="text-[#303030] ">
                Are you sure you want to logout?{" "}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setLogoutModal(false);
                }}
                className="border-[#999999] border rounded-md py-3 px-14 capitalize text-lg font-medium "
              >
                cancel
              </button>

              <button
                onClick={handleLogout}
                className=" rounded-md py-3 px-14 capitalize text-white bg-[#D92D20] text-lg font-medium "
              >
                logout
              </button>
            </div>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Modal;
