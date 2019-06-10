import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START, ASYNC_POST_START,ASYNC_POST_FINISH,ASYNC_POST_ERROR } from './asyncConstants';

export const asyncActionStart = () => {
  return {
    type: ASYNC_ACTION_START
  }
}

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  }
}

export const asyncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  }
}

export const asyncPostStart = () => {
  return {
    type: ASYNC_POST_START
  }
}

export const asyncPostFinish = () => {
  return {
    type: ASYNC_POST_FINISH
  }
}

export const asyncPostError = () => {
  return {
    type: ASYNC_POST_ERROR
  }
}