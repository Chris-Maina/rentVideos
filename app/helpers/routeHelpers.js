const Joi = require('joi');

exports.validateSlug = (schema) => {
  return (req, res, next) => {
    const result = Joi.validate({ param: req.params.slug }, schema);
    if (result.error) return res.status(400).json({ status: 'failure', message: result.error });
    if (!req.value) {
      req.value = {}
    };
    req.value['slug'] = result.value.param;
    next();
  }
};

exports.schemas = {
  slugSchema: Joi.object().keys({
    param: Joi.string().regex(/^[a-z0-9-]/).required()
  })
};
