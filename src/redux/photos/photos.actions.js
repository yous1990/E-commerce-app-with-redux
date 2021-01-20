import axios from 'axios';
import PhotosActionTypes from "./photos.types";

const fetchPhotosStart = (payload) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_START,
  payload,
});

const fetchPhotosSuccess = (photos) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_SUCCESS,
  payload: photos,
});

const fetchPhotosFailure = (errorMessage) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_FAILURE,
  payload: errorMessage,
});

export const searchPhotos = (filteredItems) => ({
  type: PhotosActionTypes.SEARCH_PHOTOS,
  payload: filteredItems,
});


export const fetchPhotos = () => async (dispatch) => {
  dispatch(fetchPhotosStart());
  await axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then((response) => {
        dispatch(fetchPhotosSuccess(response.data))
      })
      .catch((err) => {
        dispatch(fetchPhotosFailure(err));
      })
};