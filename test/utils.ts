function allUniqueValues(array: any[]) {
  return array.length === new Set(array).size;
}

export { allUniqueValues };
