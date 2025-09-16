import React from "react";

const CharWithBg = ({ char = "0" }) => {
  return (
    <div className="relative mb-6">
      <div
        className="text-[100px] sm:text-[200px] lg:text-[400px] xl:text-[500px] font-bold leading-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')", // Replace with your image
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        {char}
      </div>
    </div>
  );
};

export default CharWithBg;
