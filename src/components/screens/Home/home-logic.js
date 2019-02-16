import { setPhotosToAsync } from '../../../utilities/async';

export const getPhotosFromAzure = async (setPhotos) => {
  let url = 'https://vingsgallery.azurewebsites.net/api/GetPhotos?code=bAVDlZbfCJtiu5rDbk2DWBpVC95KvwnRqgoSHseEjw/77XXgOdzFdA==';
  try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      let resJson = await response.json();
      let fromAzure = JSON.parse(JSON.stringify(resJson));
      await setPhotosToAsync(fromAzure.photos);
    } catch (error) {
      console.error(error);
  }
}