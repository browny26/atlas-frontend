import { useModal } from "../hooks/useModal";
import { Modal } from "./ui/modal";
import Button from "./ui//Button";
import Input from "./ui/InputField";
import Label from "./ui/Label";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default function UserInfoCard() {
  const { isOpen, openModal, closeModal } = useModal();
  const { user, fetchUser } = useUser();
  const [userData, setUserData] = useState({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    email: user ? user.email : "",
    phoneNumber: user ? user.phoneNumber : "",
    bio: user ? user.bio : "",
    xLink: user ? user.xLink : "",
    facebookLink: user ? user.facebookLink : "",
    linkedinLink: user ? user.linkedinLink : "",
    instagramLink: user ? user.instagramLink : "",
  });

  const handleSave = (e) => {
    e.preventDefault();

    console.log("User Data to be saved:", userData);

    try {
      const response = fetch(`http://localhost:8080/v1/api/user/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userData),
      });
      setTimeout(() => {
        fetchUser();
      }, 1000);
    } catch (error) {
      console.error("Error updating user data:", error);
    } finally {
      closeModal();
    }
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <div className="p-5 border border-gray-100 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-xl font-semibold text-gray-800 lg:mb-6">
            Personal Information
          </h4>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                First Name
              </p>
              <p className="text-sm font-medium text-gray-800">
                {user ? user.firstName : "Name"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                Last Name
              </p>
              <p className="text-sm font-medium text-gray-800">
                {user ? user.lastName : "Surname"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">
                Email address
              </p>
              <p className="text-sm font-medium text-gray-800">
                {user ? user.email : "Email"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-800">
                {user ? user.phoneNumber : "Phone number"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500">Bio</p>
              <p className="text-sm font-medium text-gray-800">
                {user ? user.bio : "Bio"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={openModal}
          className="flex w-full items-center justify-center gap-2 border border-gray-300 bg-black px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-gray-700 hover:text-gray-50 lg:inline-flex lg:w-auto"
        >
          <svg
            className="fill-current"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
              fill=""
            />
          </svg>
          Edit
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800">
              Edit Personal Information
            </h4>
            <p className="mb-6 text-sm text-gray-500 lg:mb-7">
              Update your details to keep your profile up-to-date.
            </p>
          </div>
          <form className="flex flex-col" onSubmit={handleSave}>
            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div>
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6">
                  Social Links
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      value={userData.facebookLink}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          facebookLink: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>X.com</Label>
                    <Input
                      type="text"
                      value={userData.xLink}
                      onChange={(e) =>
                        setUserData({ ...userData, xLink: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      value={userData.linkedinLink}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          linkedinLink: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label>Instagram</Label>
                    <Input
                      type="text"
                      value={userData.instagramLink}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          instagramLink: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6">
                  Personal Information
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <Label>First Name</Label>
                    <Input
                      type="text"
                      value={userData.firstName}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      value={userData.lastName}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Email Address</Label>
                    <Input
                      type="text"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2 lg:col-span-1">
                    <Label>Phone</Label>
                    <Input
                      type="text"
                      value={userData.phoneNumber}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Bio</Label>
                    <Input
                      type="text"
                      value={userData.bio}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          bio: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button text="Close" onClick={closeModal} />
              <Button text="Save Changes" type="submit" />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
