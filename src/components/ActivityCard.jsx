const ActivityCard = ({ activity, timeSlot, emoji, bordered }) => {
  if (!activity) return null;

  return (
    <div
      className={`flex items-start gap-5 space-x-4 p-4 ${
        bordered ? "border-b border-gray-100" : ""
      }`}
    >
      <div className="flex flex-col flex-shrink-0 w-16 text-center items-center">
        <div className="text-2xl">{emoji}</div>
        <div
          className={`text-xs font-medium mt-1 ${
            timeSlot === "morning"
              ? "text-orange-600"
              : timeSlot === "afternoon"
              ? "text-green-600"
              : "text-purple-600"
          }`}
        >
          {timeSlot.toUpperCase()}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{activity.activity}</h4>
        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
          {activity.time && <span>{activity.time}</span>}
          {activity.cost && <span>{activity.cost}</span>}
        </div>
      </div>
    </div>
  );
};
export default ActivityCard;
