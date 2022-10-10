import React from "react";
import { ITarget } from "../models/models";

interface ContactInputFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange: (target: ITarget) => void;
  userData: string;
}

const ContactInputField = ({
  label,
  name,
  value,
  onChange,
  userData,
}: ContactInputFieldProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange({ name: event.target.name, value: event.target.value });
  };
  return (
    <>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-center"
      >
        {label}
      </label>
      <div className="flex mb-6">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600 w-[85px]">
          {label}
        </span>
        <input
          type="text"
          defaultValue={userData ? userData : ""}
          value={value}
          name={name}
          onChange={handleChange}
          id={name}
          className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={label}
        />
      </div>
    </>
  );
};
export default ContactInputField;
