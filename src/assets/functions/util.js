// eslint-disable-next-line import/prefer-default-export
export const toDate = (date) => {
  const d = new Date(date);

  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
};

export const getYTVideoThumbnail = (url) => {
  return `https://img.youtube.com/vi/${url.split('?v=')[1].split('&')[0]}/0.jpg`;
};
