interface ContactCardProps {
  id: number;
  name: string;
  number: string;
  deleteHandler: (id: number) => void;
  getContactId: (id: number) => void;
  changeStatus: (status: boolean) => void;
  status: boolean;
}

export const ContactCard = ({
  id,
  name,
  number,
  deleteHandler,
  getContactId,
  changeStatus,
  status,
}: ContactCardProps) => {
  return (
    <div
      onClick={() => {
        getContactId(id);
      }}
      className=" flex justify-between border py-4 px-6 mb-2 cursor-pointer hover:shadow-lg hover:transition-all rounded-md"
    >
      <div>
        <p>name: {name}</p>
        <p>number: {number}</p>
      </div>
      <div>
        <button
          onClick={() => {
            changeStatus(!status);
          }}
          type="button"
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Change
        </button>

        <button
          type="button"
          onClick={() => {
            deleteHandler(id);
          }}
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
