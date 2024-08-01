export const url = "https://66a0bb4b7053166bcabc8698.mockapi.io/Data";

export const fetchData = (url, option) => {
  return fetch(url, option)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
};

export const handleError = (error) => {
  let errorMessage = "Error: " + error.message;

  return errorMessage;
};
