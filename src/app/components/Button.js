import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) {
  const baseClass =
    "font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:  "bg-teal-600 hover:bg-teal-700 text-white",

    secondary:
      "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:bg-gray-100",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-gray-300",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-400",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <button
      className={clsx(baseClass, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
