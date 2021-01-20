import PhotosActionTypes from "./photos.types";

const initialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case PhotosActionTypes.FETCH_PHOTOS_START:
      return {
        ...state,
        isFetching: true,
      };
    case PhotosActionTypes.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
      };
    case PhotosActionTypes.FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PhotosActionTypes.SEARCH_PHOTOS:
      let filteredItems = []
      filteredItems = [
          ...state.data.filter(
              (val) => val.title.includes(action.payload) 
          )
      ]
      return {...state, data: filteredItems}
    default:
      return state;
  }
};

export default photoReducer;