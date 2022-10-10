import { IContact } from "./../models/models";
import axios from "../axios";

const contactEndpoint = "contacts/";

const contactService = {
  createContact: async (payload: IContact) => {
    const { data } = await axios.post(contactEndpoint, payload);
    return data;
  },
  removeContact: async (contactId: number) => {
    const { data } = await axios.delete(contactEndpoint + contactId);
    return data;
  },
  update: async (payload: IContact) => {
    const { data } = await axios.patch(contactEndpoint + payload.id, payload);
    return data;
  },
};
export default contactService;
