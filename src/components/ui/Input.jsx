import React from "react";

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
          bg-earth-50 dark:bg-earth-700 text-earth-900 dark:text-white placeholder:text-earth-400 dark:placeholder:text-earth-400
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
