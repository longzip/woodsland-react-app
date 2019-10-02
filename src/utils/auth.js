export const isAllowed = (user, rights) =>
  user && rights.some(right => user.rights.includes(right));

export const hasRole = (user, roles) =>
  user && roles.some(role => user.roles.includes(role));
