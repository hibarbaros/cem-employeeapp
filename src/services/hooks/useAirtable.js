import {useQuery, useMutation} from 'react-query';
import {fetchTableByName, createWorkTime, updateWorkTime} from '../airtableapi';

const getFetchTableByName = async (tableName, viewName) => {
  const res = await fetchTableByName(tableName, viewName);
  return res;
};

export function useFetchTableByName(tableName, viewName, options) {
  return useQuery(
    [`${tableName}`, tableName],
    () => getFetchTableByName(tableName, viewName),
    options,
  );
}

const getAddWork = async (values) => {
  const data = await createWorkTime(values);
  return data;
};

export function useAddWork() {
  const mutate = useMutation((values) => getAddWork(values), {
    onError: (e) => {
      return e;
    },
    onSuccess: (data) => {
      if (data) {
        return data;
      }
    },
  });

  return mutate;
}

const getUpdateWork = async (values) => {
  const data = await updateWorkTime(values);
  return data;
};

export function useUpdateWork() {
  const mutate = useMutation((values) => getUpdateWork(values), {
    onError: (e) => {
      return e;
    },
    onSuccess: (data) => {
      if (data) {
        return data;
      }
    },
  });

  return mutate;
}
