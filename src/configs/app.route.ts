// Root
const authRoot = `auth`;
const usersRoot = `users`;
const postsRoot = `posts`;

// Api Versions
const v1 = 'v1';

export const routesV1 = {
  version: v1,

  auth: {
    root: authRoot,
    signUp: `${authRoot}/sign-up`,
  },

  users: {
    root: usersRoot,
  } as const,

  posts: {
    root: postsRoot,
  } as const,
} as const;
