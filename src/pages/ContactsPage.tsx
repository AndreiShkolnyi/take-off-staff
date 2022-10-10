import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContactCard } from "../components/ContactCard";
import ContactForm from "../components/ContactForm";
import { Modal } from "../components/Modal";
import { Search } from "../components/Search";
import { IContact } from "../models/models";
import {
  fetchContacts,
  getContacts,
  removeContact,
} from "../store/slices/contactsSlice";
import { AppDispatch } from "../store/store";
export const ContactsList: React.FC = () => {
  const [isModal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const dispatch: AppDispatch = useDispatch();

  const contacts = useSelector(getContacts());

  const deleteHandler = (id: number) => {
    dispatch(removeContact(id));
  };
  const getContactId = (id: number) => {
    setSelectedId(id);
  };
  const selectedUserData = contacts.filter(
    (contact: IContact) => contact.id === selectedId
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div className="container mx-auto p-4 flex justify-center relative">
      <div className="min-w-[760px] justify-center flex-col">
        <Search />
        {contacts.map((contact: IContact) => (
          <ContactCard
            {...contact}
            key={contact.id}
            deleteHandler={deleteHandler}
            getContactId={getContactId}
            status={updateModal}
            changeStatus={setUpdateModal}
          />
        ))}
        <div className="flex justify-center">
          <button
            onClick={() => setModal(!isModal)}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Create new contact
            </span>
          </button>
        </div>
      </div>
      {updateModal && (
        <Modal>
          <ContactForm
            closeForm={setUpdateModal}
            status={updateModal}
            userData={selectedUserData}
            action={"UPDATE"}
          />
        </Modal>
      )}
      {isModal && (
        <Modal>
          <ContactForm
            closeForm={setModal}
            status={isModal}
            action={"CREATE"}
            userData={undefined}
          />
        </Modal>
      )}
    </div>
  );
};
