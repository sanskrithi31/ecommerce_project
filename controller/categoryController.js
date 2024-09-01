import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits please try a different category",
      });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Category has been created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Category creation",
    });
  }
};

export const updateCategoryController = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const category = await categoryModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Category has been Updated Successfully",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating category please try again",
      });
    }
  };


export const categoryController = async (req, res) => {
    try {
      const category = await categoryModel.find({});
      res.status(200).send({
        success: true,
        message: "List of all Categories",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all categories please try again",
      });
    }
  };


  export const singleCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Getting Single Category Successfull",
        category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({    
        success: false,
        error,
        message: "Error While getting Single Category please try again",
      });
    }
  };


  export const deleteCategoryCOntroller = async (req, res) => {
    try {
      const { id } = req.params;
      await categoryModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Category has been Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error occurred while deleting category please try again",
        error,
      });
    }
  };