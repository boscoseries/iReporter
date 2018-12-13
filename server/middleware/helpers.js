import Joi from 'joi';
// class Middlewares {}
const checkFields = (req, res, next) => {
  const schema = Joi.object().keys({
    type: Joi.string().required(),
    location: Joi.string().min(3).required(),
    comment: Joi.string().min(5).required(),
    created_by: Joi.number().required(),
    status: Joi.string(),
    images: Joi.string(),
    videos: Joi.string(),
  });
  const result = Joi.validate(req.body, schema, { abortEarly: false });
  if (!result.error) {
    next();
  } else {
      let message = [];
     for (let error of result.error.details) {
        message.push({error: error.message});
     } 
    res.status(400).json({
      status: 400,
      message,
    });
  }
};

export default checkFields;