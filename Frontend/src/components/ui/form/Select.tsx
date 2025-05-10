import React from "react";

type SelectProps = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  disabled,
  children,
  className,
  ...rest
}: SelectProps) {
  return (
    <select
      className={`select select-secondary rounded-none border-0 border-b-2 p-2 focus:outline-none focus:border-accent ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </select>
  );
}
