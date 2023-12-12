// useCustomQuery.js

import { useQuery, useMutation } from '@tanstack/react-query';

const useGetQuery = (queryKey: string[], url: string) => {
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

type FormData = {
  username: string;
  password: string;
};

const usePostQuery = ({ url }: { url: string }) => {
  return useMutation({
    mutationFn: async (formdata: FormData) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formdata),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

const usePutQuery = (queryKey: string[], url: string, body) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

const useDeleteQuery = (queryKey: string[], url: string) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

export { useGetQuery, usePostQuery, usePutQuery, useDeleteQuery };
