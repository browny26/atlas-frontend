import React from "react";

const Tab = () => {
  return (
    <ul class="flex flex-wrap text-sm font-italiana font-medium text-center text-black border-b border-gray-50">
      <li class="me-2">
        <a
          href="#"
          aria-current="page"
          class="inline-block p-4 rounded-t-lg hover:text-gray-600 active border-b border-black"
        >
          Profile
        </a>
      </li>
      <li class="me-2">
        <a href="#" class="inline-block p-4  hover:text-gray-600">
          Dashboard
        </a>
      </li>
      <li class="me-2">
        <a href="#" class="inline-block p-4 hover:text-gray-600">
          Settings
        </a>
      </li>
    </ul>
  );
};

export default Tab;
