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

const initialState = {
  searcherPersons: [],
  targetDate: new Date(new Date().setHours(0, 0, 0, 0)),
  workShifts: [],
  personName: "Неизвестно",
  currentWs: "Нет",
  sidePersons: [],
  sidePage: 0,
  isLoading: false,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TARGET_DATE:
      return { ...state, targetDate: action.payload };
    case LOAD_SIDE_PERSONS:
      return { ...state, sidePersons: action.payload };
    case LOAD_MAIN_DATE:
      return {
        ...state,
        workShifts: action.workShifts,
        personName: action.personName,
      };
    case SHOW_WORKSHIFT:
      return {
        ...state,
        currentWs: action.payload,
      };
    case NEXT_SIDE_PAGE:
      return {
        ...state,
        sidePage: action.payload,
      };
    case UPDATE_SEARCH_PERSON:
      return {
        ...state,
        searcherPersons: action.payload,
      };
    case SWITCH_ON_LOADING:
      return { ...state, isLoading: true };
    case SWITCH_OFF_LOADING:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
