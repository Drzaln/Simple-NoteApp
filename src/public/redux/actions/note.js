import axios from "axios";
import url from "../../../supports/url";

export const getNote = () => {
    return {
      type: "GET_NOTE",
      payload: axios.get(url + `note`)
    };
  };
  
  export const getNoteId = (id_note) => {
    return {
      type: "GET_NOTE_ID",
      payload: axios.get(url + `note/${id_note}`)
    };
  };
  
  export const postNote = (data) => {
    return {
      type: "POST_NOTE",
      payload: axios.post(url + `note`, data)
    };
  };
  
  export const editNote = (data, id_note) => {
    return {
      type: "EDIT_NOTE",
      payload: axios.patch(url + `note/${id_note}`, data)
    };
  };
  
  export const deleteBook = (id_note) => {
    return {
      type: "DELETE_BOOK",
      payload: axios.delete(url + `note/${id_note}`)
    }
  }