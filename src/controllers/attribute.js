import Attribute, { ValueAttributeModel } from "../model/attribute";
import Product from "../model/product";

// Controller để tạo mới một thuộc tính
export const createAttribute = async (req, res) => {
  try {
    const data = await Attribute.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createAttributeForProduct = async (req, res) => {
  try {
    const data = await Attribute.create(req.body);

    const product = await Product.findById(req.params.id);

    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.attributes.push(data._id);
    await product.save();

    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller để lấy tất cả các thuộc tính
export const getAllAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().populate("values");
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy một thuộc tính theo ID
export const getAttributeById = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id).populate(
      "values"
    );
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    console.log(attribute);

    res.json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để cập nhật một thuộc tính
export const updateAttribute = async (req, res) => {
  try {
    const { name } = req.body;
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    attribute.name = name;
    const updatedAttribute = await attribute.save();
    res.json(updatedAttribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller để xóa một thuộc tính
export const deleteAttribute = async (req, res) => {
  try {
    console.log("PARAM", req.params.id);

    const attribute = await Attribute.findByIdAndDelete(req.params.id);

    console.log("ATTRIBUTE", attribute);
    // return;

    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    res.json({ message: "Attribute deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//==================================== VALUE ============================================

// Controller để tạo mới một giá trị của thuộc tính
export const createValueAttribute = async (req, res) => {
  try {
    const { name, color } = req.body;
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    const valueAttribute = new ValueAttributeModel({
      name,
      color,
    });
    const newValueAttribute = await valueAttribute.save();
    attribute.values.push(newValueAttribute);
    await attribute.save();
    res.status(201).json(newValueAttribute);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller để lấy tất cả các giá trị của thuộc tính
export const getAllValueAttributes = async (req, res) => {
  try {
    const values = await ValueAttributeModel.find();
    res.json(values);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để lấy một giá trị của thuộc tính theo ID
export const getValueAttributeById = async (req, res) => {
  try {
    const value = await ValueAttributeModel.findById(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "ValueAttribute not found" });
    }
    res.json(value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller để cập nhật một giá trị của thuộc tính
export const updateValueAttribute = async (req, res) => {
  try {
    const { name, color } = req.body;
    const value = await ValueAttributeModel.findById(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "ValueAttribute not found" });
    }
    value.name = name;
    value.color = color;
    const updatedValue = await value.save();
    res.json(updatedValue);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller để xóa một giá trị của thuộc tính
export const deleteValueAttribute = async (req, res) => {
  try {
    const value = await ValueAttributeModel.findByIdAndDelete(req.params.id);
    if (!value) {
      return res.status(404).json({ message: "ValueAttribute not found" });
    }
    res.json({ message: "ValueAttribute deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
