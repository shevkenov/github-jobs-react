import { useReducer, useEffect } from "react";
import axios from "axios";

const BASE_URL =
  "https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json";

const initialState = {
  jobs: [],
  loading: false,
  error: false,
  hasNextPage: false
};

const ACTIONS = {
  REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  NEXT_PAGE_REQUEST: "next-page-request"
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REQUEST:
      return {
        ...state,
        jobs: [],
        loading: true,
      };
    case ACTIONS.GET_DATA:
        return {
            ...state,
            loading: false,
            jobs: action.payload.jobs
        }
    case ACTIONS.ERROR:
        return {
            ...state,
            loading: false,
            error: action.payload.error
        }
    case ACTIONS.NEXT_PAGE_REQUEST:
        return {
          ...state,
          hasNextPage: action.payload.hasNextPage
        }

    default:
      return state;
  }
};

export default (params, page) => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      const cancelToken1 = axios.CancelToken.source();
      const cancelToken2 = axios.CancelToken.source();

        dispatch({type: ACTIONS.REQUEST})
        
        const deafultPageRequest = () => {
          return axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: {
              markdown: true,
              page,
              ...params,
            },
          });
        }

        const nextPageRequest = () => {
          return axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: {
              markdown: true,
              page: ++page,
              ...params,
            },
          });
        }

        Promise.all([deafultPageRequest(), nextPageRequest()])
          .then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res[0].data } });
            dispatch({ type: ACTIONS.NEXT_PAGE_REQUEST, payload: { hasNextPage: (res[1].data.length !== 0) } });
          })
          .catch(err => {
            if (axios.isCancel(err)) {
              return;
            }

            dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
          })

        
        

        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        }
    }, [params, page])

  return state;
};
