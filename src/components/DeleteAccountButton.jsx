import React, { useEffect, useState } from "react";
import Button from "./ui/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { userAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Modal } from "./ui/Modal";
import { useModal } from "../hooks/useModal";
import Alert from "./ui/Alert";

const DeleteAccountButton = ({ userId }) => {
  const navigate = useNavigate();
  const { isOpen, openModal, closeModal } = useModal();
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message.text]);

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await userAPI.deleteUser(userId);

      if (res.status !== 200) throw new Error("Failed to delete account");

      setMessage({ type: "success", text: "Account deleted successfully!" });
      closeModal();

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      console.error("Error deleting account: ", error);
      setMessage({
        type: "success",
        text: "Error deleting account. Please try again.",
      });
    } finally {
      setLoading(false);
      closeModal();
    }
  };
  return (
    <>
      {message.text && (
        <div className="absolute top-0 right-0">
          <Alert type={message.type} message={message.text} />
        </div>
      )}
      <Button className="w-fit flex gap-2 items-center" onClick={openModal}>
        <TrashIcon className="h-4 w-4 text-white" />
        Delete Account
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        className="max-w-fit m-4 p-20"
      >
        <h1 className="mb-2 font-semibold text-gray-800 text-xl sm:text-2xl">
          Delete Account
        </h1>
        <p className="text-sm text-gray-500">
          Are you sure you want to delete this account?
        </p>
        <div className="flex flex-col sm:flex-row gap-5 mt-10">
          <Button
            className="flex gap-2 justify-center"
            variant="gray"
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            className="flex gap-2 justify-center"
            onClick={handleDeleteAccount}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Deleting Account...
              </div>
            ) : (
              "Delete Account"
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAccountButton;
