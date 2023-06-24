export const classNames = (...rest: string[]) => {
  return rest.filter(Boolean).join(' ');
};
