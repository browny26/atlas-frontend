const Badge = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium";

  // Define size styles
  const sizeStyles = {
    sm: "text-theme-xs", // Smaller padding and font size
    md: "text-sm", // Default padding and font size
  };

  // Define color styles for variants
  const variants = {
    light: {
      primary: "bg-violet-50 text-violet-500",
      success: "bg-green-50 text-green-600",
      error: "bg-red-50 text-red-600",
      warning: "bg-orange-50 text-orange-600",
      info: "bg-blue-50 text-blue-500",
      light: "bg-gray-100 text-gray-700",
      dark: "bg-gray-500 text-white",
    },
    solid: {
      primary: "bg-violet-500 text-white",
      success: "bg-green-500 text-white",
      error: "bg-red-500 text-white",
      warning: "bg-orange-500 text-white",
      info: "bg-blue-light-500 text-white",
      light: "bg-gray-400 text-white",
      dark: "bg-gray-700 text-white",
    },
  };

  // Get styles based on size and color variant
  const sizeClass = sizeStyles[size];
  const colorStyles = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorStyles}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
