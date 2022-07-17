export const isExistToken = () => {
  if (localStorage.getItem('token')) {
    return true;
  }
  return false;
};

export const getToken = () => localStorage.getItem('token');
