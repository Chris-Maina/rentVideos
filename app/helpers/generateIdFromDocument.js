const mongoose = require('mongoose');

/**
 * @summary Generated ids to be used for the referenced Documents
 * @param {String} document - model you want to create records for
 * @param {Array} dataArray - video field to get ids from
 * @param {Object} res - response object
 * @returns {Array} ids
 */
exports.generateIdFromDocument = (document, dataArray, fieldName, res) => {
  const documentIDs = dataArray.map(async item => {
    try {
      // Search, if found return its id else create a new entry
      const searchedItem = await document.findOne({ [fieldName]: item});
      if (searchedItem) return mongoose.Types.ObjectId(searchedItem._id);
      const createdItem = await document.create({ item });
      if (!createdItem) return res.status(400).json({ status: 'failure', message: `${document} not created required. Try again.` });
      return mongoose.Types.ObjectId(createdItem._id);
    } catch (error) {
      return res.status(400).json({ status: 'failure', message: `There was an error creating ${document} for this video` });
    }
  });
  return Promise.all(documentIDs)
};