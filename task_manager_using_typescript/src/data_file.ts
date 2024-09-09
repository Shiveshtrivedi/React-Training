const baseUrl: string = 'https://66a0bb4b7053166bcabc8698.mockapi.io/Tasklist';

export const fetchData = <T>(
  url: string = '',
  option: RequestInit = {}
): Promise<T> => {
  const fullUrl = `${baseUrl}${url}`;

  return fetch(fullUrl, option)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data: T) => {
      if (typeof data !== 'object') {
        throw new Error('Received data is not a valid object.');
      }

      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
};

export const handleError = (error: Error): string => {
  if (error instanceof Error) {
    return 'Error: ' + error.message;
  } else {
    return 'An unknown error occured.';
  }
};
