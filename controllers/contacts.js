const contacts = require("../models/contacts");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");
  
  const getAll = async (req, res) => {
      const result = await contacts.listContacts();
      res.json(result);
  }

  const getById = async (req, res) => {
      const { contactId } = req.params;
      const result = await contacts.getContactById(contactId);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
  }

  const addContact = async (req, res) => {
      const result = await contacts.addContact(req.body);
      res.status(201).json(result);
  }

  const deleteById = async (req, res) => {
      const {contactId} = req.params;
      const result = await contacts.removeContact(contactId);
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json({
        message: "Contact deleted"
      })
  }

  const updateById = async (req, res) => {
      const {contactId} = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
  }

  module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
  }