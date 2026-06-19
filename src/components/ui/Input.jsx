import React from "react";

/**
 * Input
 *
 * @param {Object} props
 * @param {string} [props.label] - Field label rendered above the input
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.type='text'] - HTML input type (text, email, password, etc.)
 * @param {string} props.value - Controlled value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - Change handler
 * @param {string} [props.error] - Error message; renders below input and red border when present
 * @param {string} [props.name] - Input name attribute
 * @param {boolean} [props.disabled=false] - Disables the input
 * @param {string} [props.className] - Extra classes for the wrapper
 */
export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  name,
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-earth-800 dark:text-earth-100 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        className={`w-full px-4 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed
          bg-earth-50 dark:bg-earth-800 text-earth-900 dark:text-earth-50
          border ${error ? "border-red-400 focus:ring-red-300" : "border-earth-200 dark:border-earth-600 focus:ring-saffron-400"}
        `}
        {...rest}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
