import HttpError from '@wasp/core/HttpError.js';

export const getTask = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  console.log('conetext', context);
  console.log('args', args);

  return context.entities.Task.findUnique({
    where: {
      id: args.taskId,
      // user: {
      //   id: context.user.id,
      // },
    },
  });
};

export const getTasks = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.findMany(
      // { where: { user: { id: context.user.id } } }
    );
};
