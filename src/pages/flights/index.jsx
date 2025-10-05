import React from "react";
import Input from "../../components/ui/InputField";
import Label from "../../components/ui/Label";

const Flights = () => {
  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Flights
        </h3>
        <div className="space-y-6">
          <div className="border border-gray-100 flex gap-10 justify-between p-10">
            <div>
              <Label>Origin</Label>
              <Input type="text" placeholder="Musharof" />
            </div>
            <div>
              <Label>Destination</Label>
              <Input type="text" placeholder="Musharof" />
            </div>
            <div>
              <Label>Departure Date</Label>
              <Input type="text" placeholder="Musharof" />
            </div>
            <div>
              <Label>Return Date</Label>
              <Input type="text" placeholder="Musharof" />
            </div>
            <div>
              <Label>Number of Adults</Label>
              <Input type="text" placeholder="Musharof" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Flights;
