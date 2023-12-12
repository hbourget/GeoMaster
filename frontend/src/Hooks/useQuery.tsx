// useCustomQuery.js

import { useQuery } from '@tanstack/react-query';

const useCustomQuery = (queryKey: string[], url: string) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

export default useCustomQuery;
