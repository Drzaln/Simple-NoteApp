import axios from "axios";
import url from "../../../supports/url";

export const getCategory = () => {
    return {
      type: "GET_CATEGORY",
      payload: axios.get(url + `category`)
    };
  };
  
  export const getCategoryId = (id_category) => {
    return {
      type: "GET_BOOK_ID",
      payload: axios.get(url + `category/${id_category}`)
    };
  };
  
  export const postCategory = (data) => {
    return {
      type: "POST_CATEGORY",
      payload: axios.post(url + `category`, data)
    };
  };
  
  export const deleteCategory = (id_category) => {
    return {
      type: "DELETE_BOOK",
      payload: axios.delete(url + `category/${id_category}`)
    }
  }