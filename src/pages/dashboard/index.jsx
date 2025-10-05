import React from "react";
import Card from "../../components/ui/Card";
import { PlusIcon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Dashboard
        </h3>
        <div className="flex flex-col gap-5">
          <h4 className="text-xl font-medium">Locations</h4>
          <div className="space-x-6 flex">
            <Card
              size="w-72 h-[400px]"
              img={
                "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              title={{ first: "Duomo", second: "of Milan" }}
              location="Milan, Italy"
            />
            <Card
              size="w-72 h-[400px]"
              img={
                "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              title={{ first: "Duomo", second: "of Milan" }}
              location="Milan, Italy"
            />
            <Card
              size="w-72 h-[400px]"
              img={
                "https://images.unsplash.com/photo-1610016302534-6f67f1c968d8?q=80&w=2150&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              title={{ first: "Duomo", second: "of Milan" }}
              location="Milan, Italy"
            />
            <div className="w-72 h-[400px] bg-gray-100 text-gray-500 flex items-center justify-center">
              <PlusIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
