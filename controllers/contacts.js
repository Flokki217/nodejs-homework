const Joi = require("joi");
const contactService = require("../models/contacts");

const schema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name should be a string",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com"] } })
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.email": "Email format is 'example@mail.com'",
      "any.required": "Email is required",
    }),
  phone: Joi.string()
    .pattern(/^\+380 \d{2} \d{3} \d{4}$/)
    .required()
    .messages({
      "string.base": "Phone should be a string",
      "string.pattern.base": "Phone format is '+380 XX XXX XXXX'",
      "any.required": "Phone is required",
    }),
  favorite: Joi.boolean().messages({
    "string.base": "Field should be a boolean type",
  }),
});
const patchSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "boolean.base": "Field should be a boolean type",
    "any.required": "Favorite field is required",
  }),
});
const get = async (req, res, next) => {
  try {
    const data = await contactService.getAllContacts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactService.getContactById(contactId);

    if (data) {
      res.status(200).json(data);
    }
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await contactService.removeContact(contactId);

    if (!deletedContact) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { error: validationResult } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult) {
      const errorMessage = validationResult.details
        .map((detail) => detail.message)
        .join(". ");
      const error = new Error(errorMessage);
      error.status = 400;
      throw error;
    }

    const data = await contactService.createContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { error: validationResult } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult) {
      const errorMessage = validationResult.details
        .map((detail) => detail.message)
        .join(". ");
      const error = new Error(errorMessage);
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const data = await contactService.updateContact(contactId, req.body);

    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error: validationResult } = patchSchema.validate(req.body);

    if (validationResult) {
      const errorMessage = validationResult.details
        .map((detail) => detail.message)
        .join(". ");
      const error = new Error(errorMessage);
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const data = await contactService.updateFavoriteContact(
      contactId,
      req.body
    );

    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  get,
  getByID,
  create,
  update,
  updateFavorite,
  remove,
};
