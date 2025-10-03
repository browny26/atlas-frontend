import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const profileMenu = [
    { label: "My account", icon: "icon-[tabler--user]" },
    { label: "Setting", icon: "icon-[tabler--settings]" },
    { label: "Billing", icon: "icon-[tabler--credit-card]" },
    { label: "Manage team", icon: "icon-[tabler--users]" },
    { label: "Customisation", icon: "icon-[tabler--edit]" },
    { label: "Add team account", icon: "icon-[tabler--circle-plus]" },
  ];

  return (
    <>
      {/* Header */}
      <header className="bg-white items-center justify-between border-gray-200 w-full sticky top-0 z-50 flex border-b lg:ps-75 px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-soft btn-square btn-sm lg:hidden"
            aria-haspopup="dialog"
            aria-expanded={isSidebarOpen}
            aria-controls="layout-toggle"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="icon-[tabler--menu-2] size-4.5"></span>
          </button>

          {/* Search */}
          <button
            type="button"
            className="max-sm:btn max-sm:btn-text max-sm:btn-sm max-sm:btn-square flex items-center gap-2 text-sm btn-ghost"
          >
            <span className="icon-[tabler--search] text-base-content size-5"></span>
            <span className="text-base-content/50 max-sm:hidden">
              Type to search...
            </span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <Menu as="div" className="relative inline-flex">
          <Menu.Button className="dropdown-toggle avatar">
            <span className="rounded-field size-5">
              <img
                src="https://cdn.flyonui.com/fy-assets/avatar/avatar-6.png"
                alt="User Avatar"
                className="rounded-full"
              />
            </span>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="dropdown-menu absolute right-0 mt-2 w-75 bg-white rounded-lg shadow-lg border border-gray-200 z-50 focus:outline-none">
              {/* Profile Header */}
              <div className="dropdown-header mb-1 gap-4 px-5 pt-4.5 pb-3.5 flex items-center">
                <div className="avatar avatar-online-top">
                  <div className="w-10 rounded-full">
                    <img
                      src="https://cdn.flyonui.com/fy-assets/avatar/avatar-8.png"
                      alt="avatar"
                    />
                  </div>
                </div>
                <div>
                  <h6 className="text-base-content mb-0.5 font-semibold">
                    Charlotte Anne
                  </h6>
                  <p className="text-base-content/80 font-medium">Influencer</p>
                </div>
              </div>

              <div className="px-1 py-1 space-y-0.5">
                {profileMenu.map((item, index) => (
                  <Menu.Item key={item.label}>
                    {({ active }) => (
                      <a
                        className={`dropdown-item px-3 py-2 flex items-center gap-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                        href="#"
                      >
                        <span className={`${item.icon} size-5`}></span>
                        {item.label}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>

              <div className="border-t border-gray-200 my-1"></div>

              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`btn btn-text btn-error btn-block h-11 justify-start px-3 font-normal text-sm ${
                        active ? "bg-red-50" : ""
                      }`}
                      href="#"
                    >
                      <span className="icon-[tabler--logout] size-5"></span>
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </header>
    </>
  );
};

export default Header;
