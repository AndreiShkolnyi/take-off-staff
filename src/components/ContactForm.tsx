import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IContact, ITarget } from "../models/models";
import { createContact, updateContact } from "../store/slices/contactsSlice";
import { AppDispatch } from "../store/store";
import ContactInputField from "./ContactInputField";

interface ContactFormProps {
  closeForm: (status: boolean) => void;
  status: boolean;
  userData: any;
  action: string;
}

const ContactForm = ({
  closeForm,
  status,
  userData,
  action,
}: ContactFormProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [data, setData] = useState<any>({});
  const name = userData?.[0]?.name ? userData[0].name : "";
  const number = userData?.[0]?.number ? userData[0].number : "";
  const handleChange = (target: ITarget): void => {
    setData((prevState: IContact) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    closeForm(!status);
    if (action === "CREATE") {
      dispatch(createContact(data));
    } else if (action === "UPDATE") {
      const newData = { ...data, id: userData[0].id };
      dispatch(updateContact(newData));
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            closeForm(!status);
          }}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-2 py-2 text-end"
        >
          <svg
            className="h-4 w-4 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="18" y1="6" x2="6" y2="18" />{" "}
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <ContactInputField
        name={"name"}
        label={"Name"}
        onChange={handleChange}
        userData={name}
      />
      <ContactInputField
        name={"number"}
        label={"Number"}
        onChange={handleChange}
        userData={number}
      />
      <div className="flex justify-center pt-5">
        <button
          type="submit"
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
