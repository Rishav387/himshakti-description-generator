import React from "react";

/**
 * Button
 *
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary'] - Visual style
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Button size
 * @param {boolean} [props.disabled=false] - Disables interaction and dims the button
 * @param {() => void} [props.onClick] - Click handler
 * @param {React.ReactNode} props.children - Button label/content
 * @param {'button'|'submit'|'reset'} [props.type='button'] - HTML button type
 * @param {string} [props.className] - Extra classes to merge in
 */
export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  children,
  type = "button",
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0";

  const variants = {
    primary:
      "bg-saffron-500 hover:bg-saffron-600 text-white hover:-translate-y-0.5 hover:shadow-lg focus:ring-saffron-400 dark:focus:ring-offset-earth-900",
    secondary:
      "bg-earth-100 hover:bg-earth-200 text-earth-800 dark:bg-earth-700 dark:hover:bg-earth-600 dark:text-earth-50 focus:ring-earth-300",
    outline:
      "border-2 border-saffron-500 text-saffron-600 hover:bg-saffron-50 dark:text-saffron-400 dark:hover:bg-earth-800 focus:ring-saffron-300",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
