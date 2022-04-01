import {
  UPDATE_TARGET_DATE,
  LOAD_SIDE_PERSONS,
  LOAD_MAIN_DATE,
  SHOW_WORKSHIFT,
  NEXT_SIDE_PAGE,
  UPDATE_SEARCH_PERSON,
  SWITCH_ON_LOADING,
  SWITCH_OFF_LOADING,
} from "../types";
import axios from "axios";
import { domain } from "../../config";

export function updateTargetDate(newTargetDate) {
  return {
    type: UPDATE_TARGET_DATE,
    payload: newTargetDate,
  };
}

export function loadSidePersons(date) {
  return async (dispatch) => {
    dispatch({
      type: SWITCH_ON_LOADING,
    });
    axios
      .get(`${domain}/api/get_side_persons`, {
        params: { date: date },
      })
      .then((response) => {
        dispatch({
          type: LOAD_SIDE_PERSONS,
          payload: response.data.persons,
        });
        dispatch({
          type: SWITCH_OFF_LOADING,
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: SWITCH_OFF_LOADING,
        });
      });
  };
}

export function loadMainDate(personId) {
  return async (dispatch) => {
    dispatch({
      type: SWITCH_ON_LOADING,
    });
    axios
      .get(`${domain}/api/get_person`, {
        params: { personId },
      })
      .then((response) => {
        const { name, workShifts } = response.data;
        workShifts.sort((a, b) => {
          const d1 = new Date(a.date);
          const d2 = new Date(b.date);
          return d1 - d2;
        });
        const wsParseDate = workShifts.map((item) => {
          return { ...item, date: new Date(item.date) };
        });

        dispatch({
          type: LOAD_MAIN_DATE,
          workShifts: wsParseDate,
          personName: name,
        });
        dispatch({
          type: SWITCH_OFF_LOADING,
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: SWITCH_OFF_LOADING,
        });
      });
  };
}

export function showWorkshift(workshift = "Нет") {
  return {
    type: SHOW_WORKSHIFT,
    payload: workshift,
  };
}

export function nextSidePage(prev) {
  if (prev === "reset") {
    return {
      type: NEXT_SIDE_PAGE,
      payload: 0,
    };
  }
  return {
    type: NEXT_SIDE_PAGE,
    payload: prev + 1,
  };
}

export function updateSearchPerson(searcherValue) {
  return async (dispatch) => {
    dispatch({
      type: SWITCH_ON_LOADING,
    });
    axios
      .get(`${domain}/api/livesearch`, {
        params: { search: searcherValue },
      })
      .then((response) => {
        const { persons } = response.data;
        dispatch({
          type: UPDATE_SEARCH_PERSON,
          payload: persons,
        });
        dispatch({
          type: SWITCH_OFF_LOADING,
        });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: SWITCH_OFF_LOADING,
        });
      });
  };
}
