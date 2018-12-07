import axios from "axios";

export const FETCHING = "FETCHING";
export const FETCHED = "FETCHED";
export const SAVING = "SAVING";
export const SAVED = "SAVED";
export const DELETING = "DELETING";
export const DELETED = "DELETED";
export const UPDATING = "UPDATING";
export const UPDATED = "UPDATED";
export const SINGLE_FETCHING = "SINGLE_FETCHING";
export const SINGLE_FETCHED = "SINGLE_FETCHED";
export const FILTER = "FILTER";
export const FETCHING_ERROR = "FETCHING_ERROR";
export const ERROR = "ERROR";

const host = "https://fe-notes.herokuapp.com/note";

export const fetchNotes = () => dispatch => {
  const notes = axios.get(`${host}/get/all`);
  dispatch({ type: FETCHING });
  notes
    .then(res => {
      // console.log(res.data);
      dispatch({ type: FETCHED, payload: res.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: FETCHING_ERROR, payload: err });
    });
};

export const fetchSingle = id => dispatch => {
  const note = axios.get(`${host}/get/${id}`);
  dispatch({ type: SINGLE_FETCHING });
  note
    .then(res => dispatch({ type: SINGLE_FETCHED, payload: res.data }))
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const saveNote = info => dispatch => {
  const saved = axios.post(`${host}/create`, info);
  dispatch({ type: SAVING });
  saved
    .then(res => {
      // console.log(res.data);
      dispatch({ type: SAVED, payload: info });
    })
    .catch(err => dispatch({ type: ERROR, paylaod: err }));
};

export const editNote = (info, id) => dispatch => {
  const updated = axios.put(`${host}/edit/${id}`, info);
  dispatch({ type: UPDATING });
  updated
    .then(res => {
      // console.log(res.data);
      dispatch({ type: UPDATED, payload: res.data });
    })
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const deleteNote = id => dispatch => {
  const deleted = axios.delete(`${host}/delete/${id}`);
  dispatch({ type: DELETING });
  deleted
    .then(res => {
      // console.log(res.data);
      dispatch({ type: DELETED, payload: res.data });
    })
    .catch(err => dispatch({ type: ERROR, payload: err }));
};

export const filterNotes = id => {
  return {
    type: FILTER,
    payload: id
  };
};