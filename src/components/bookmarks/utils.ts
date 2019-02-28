export const contains = (value: string, label: string) => {
  const labelLower = label.toLocaleLowerCase();
  const valueLower = value.toLocaleLowerCase();
  const hasValue = labelLower.search(valueLower) !== -1;
  return hasValue;
};
