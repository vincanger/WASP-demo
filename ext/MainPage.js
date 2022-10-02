import React, { useEffect } from 'react';

/**
 * GET WASPY {= 🐝
 */
import getTasks from '@wasp/queries/getTasks';
import getTask from '@wasp/queries/getTask';
import { useQuery } from '@wasp/queries';
import createTask from '@wasp/actions/createTask';
import { useUpdate } from './useOperations';
import logout from '@wasp/auth/logout.js';
import Clocks from './Clocks';
import { useQueryClient,  } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';


const MainPage = ({ user }) => {
  const [taskToFetch, setTaskToFetch] = React.useState(null);
  const [filteredTasks, setFilteredTasks] = React.useState(null);

  const { data: tasks, isFetching, error } = useQuery(getTasks);
  const { data: task } = useQuery(getTask, { taskId: Number(taskToFetch) }, { enabled: !!taskToFetch });

  useEffect(() => {
    if (task) {
      findTaskToHighlight(taskToFetch)
    }
  }, [task, tasks]);

  const findTaskToHighlight = (taskId) => {
    if (!tasks) return;

    // setTaskToFetch(taskId);

    const taskHighlight = tasks.find((task) => {
      return task.id === parseInt(taskId);
    });

    // prepend highlight property to task object
    const taskHighlightWithProperty = { ...taskHighlight, highlighted: true };
    setFilteredTasks([taskHighlightWithProperty, ...tasks.filter((task) => task.id !== parseInt(taskId))]);

    return taskHighlight;
  };

  return (
    <div>
      <NewTaskForm />
      <FindTaskForm setTaskToFetch={setTaskToFetch} />

      {filteredTasks ? <TasksList tasks={filteredTasks} /> : <TasksList tasks={tasks} />}
      {isFetching && 'Fetching...'}
      {error && 'Error: ' + error}
      <button onClick={logout}> Logout </button>
      <div>
        <Clocks />
      </div>
      <ReactQueryDevtools />
    </div>
  );
};

const Task = (props) => {
  // console.log('props', props);
  const queryClient = useQueryClient();

  const mutation = useUpdate();
  const handleIsDoneChange = (event) => {
    try {
      mutation.mutate({
        taskId: props.task.id,
        data: { isDone: event.target.checked },
      });
      console.log('mutation', mutation);
      // queryClient.invalidateQueries(['Tasks']);
    } catch (error) {
      window.alert('Error while updating task: ' + error.message);
    }
  };

  return (
    <div style={{ margin: '5px' }}>
      <span>
        {props.task.id}
        {''}
      </span>
      <input type='checkbox' id={props.task.id} checked={props.task.isDone} onChange={handleIsDoneChange} />
      <span style={{ color: props.task.highlighted ? 'red' : 'black' }}>{props.task.description}</span>
      {' '}{mutation.isLoading && '...Updating...'}
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

const FindTaskForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const taskId = event.target.taskId.value;
      // event.target.reset();
      props.setTaskToFetch(taskId);
    } catch (err) {
      window.alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name='taskId' type='number' defaultValue='1' />
      <input type='submit' value='Highlight task by ID' />
    </form>
  );
};

export default MainPage;
