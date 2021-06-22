export const handleTextLength = (text, maxLen) => {
  if (text?.length > maxLen) {
    return `${text?.substring(0, maxLen)}...`;
  }
  return text;
};
