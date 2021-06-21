export const range = (start, to) => {
  return [...Array(to - start + 1).keys()].map((i) => i + start);
};
