import React from "react";
import Table from "../../components/Table";

const index = () => {
  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Itineraries
        </h3>
        <div className="space-y-6">
          <Table />
        </div>
      </div>
    </>
  );
};

export default index;
