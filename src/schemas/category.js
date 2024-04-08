import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Ten loại sản phẩm không được để trống",
    "any.required": "Ten loại sản phẩm bắt buộc phải nhập",
  }),
});
