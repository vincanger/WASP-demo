import getTask from '@wasp/queries/getTask';
import updateTask from '@wasp/actions/updateTask';
import { useMutation } from 'react-query';
import { useQuery } from '@wasp/queries';

export const useGetTask = (taskId) => {
  const { data: task } = useQuery(getTask, { taskId }, { enabled: !!taskId });
  return task;
};

export const useUpdate = () => {
  return useMutation(async ({ taskId, data }) => {
    return new Promise((resolve) => setTimeout(() => resolve(
      updateTask({ taskId, data })
    ), 1500));

    // return setTimeout(() => {
    //  return updateTask({ taskId, data });
    // }, 3000);

  });
};
