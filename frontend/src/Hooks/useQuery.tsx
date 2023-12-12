// useCustomQuery.js

import { useQuery, useMutation } from '@tanstack/react-query';

const useGetQuery = (queryKey: string[], url: string) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

type FormData = {
  username?: string;
  password?: string;
  id?: number;
};

const usePostQuery = ({ url }: { url: string }) => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return formData;
    },
    onSuccess(data, variables, context) {
      console.log('data:', data);
      console.log('variables:', variables);
      console.log('context:', context);
    },
    onError(error, variables, context) {
      console.log('error:', error);
      console.log('variables:', variables);
      console.log('context:', context);
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });
};

export { useGetQuery, usePostQuery, usePutQuery, useDeleteQuery };
