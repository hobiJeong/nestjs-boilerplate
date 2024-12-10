// Root
const postsRoot = `posts`;
const usersRoot = `users`;

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,

  user: {
    root: usersRoot,
  } as const,

  posts: {
    root: postsRoot,
  } as const,
} as const;
