const FETCH_URL = 'http://res.cloudinary.com/jennys-alchemy-code-lab/image/fetch';

export const getUrl = (url, options = '') => {
  return `${FETCH_URL}/${options}/${encodeURIComponent(url)}`;
};