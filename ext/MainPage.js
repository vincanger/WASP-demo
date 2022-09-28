import React, { useEffect } from 'react';

/**
 * GET WASPY {= 🐝
 */
import getTasks from '@wasp/queries/getTasks';
import { useQuery } from '@wasp/queries';
import createTask from '@wasp/actions/createTask';
import updateTask from '@wasp/actions/updateTask';
import logout from '@wasp/auth/logout.js';
import Clocks from './Clocks';

const MainPage = ({ user }) => {
  const { data: tasks, isFetching, error } = useQuery(getTasks);

  useEffect(() => {
    console.log('tasks', tasks);
  }, [tasks]);

  return (
    <div>
      <NewTaskForm />

      {tasks && <TasksList tasks={tasks} />}
      {isFetching && 'Fetching...'}
      {error && 'Error: ' + error}
      <button onClick={logout}> Logout </button>
      <div>
        <Clocks />
      </div>
    </div>
  );
};

const Task = (props) => {

  const handleIsDoneChange = async (event) => {
    try {
      const { isLoading } = await updateTask({
        taskId: props.task.id,
        data: { isDone: event.target.checked },
      });
      
      console.log('isLoading', isLoading);

    } catch (error) {
      window.alert('Error while updating task: ' + error.message);
    }
  };

  return (
    <div>
      <input type='checkbox' id={props.task.id} checked={props.task.isDone} onChange={handleIsDoneChange} />
      {props.task.description}
    </div>
  );
};

const TasksList = (props) => {
  if (!props.tasks?.length) return 'No tasks';
  return props.tasks.map((task, idx) => <Task task={task} key={idx} />);
};

const NewTaskForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const description = event.target.description.value;
      event.target.reset();
      await createTask({ description });
    } catch (err) {
      window.alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='description' type='text' defaultValue='' />
      <input type='submit' value='Create task' />
    </form>
  );
};

export default MainPage;
