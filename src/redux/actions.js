import { DECREMENT_PROGRESS, DELETE_TASK, INCREMENT_PROGRESS, NEW_TASK, SEARCH, SORT_TYPE, UPDATE_TASK } from "./types";

export function taskCreate(data, id) {
    return {
      type: NEW_TASK,
      data: { data, id }
    }
}

export function taskUpdate(data, id) {
  return {
    type: UPDATE_TASK,
    data: { data, id }
  }
}

export function taskDelete(id) {
  return {
    type: DELETE_TASK,
    id: id,
  }
}

export function incrementProgress(id) {
  return {
    type: INCREMENT_PROGRESS,
    id: id,
  }
}

export function decrementProgress(id) {
  return {
    type: DECREMENT_PROGRESS,
    id: id,
  }
}

export function taskSearch(text) {
  return {
    type: SEARCH,
    text: text,
  }
}

export function updateSortType(data) {
  return {
    type: SORT_TYPE,
    data: data,
  }
}