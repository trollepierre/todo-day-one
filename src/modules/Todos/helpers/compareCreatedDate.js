export const compareByCreatedDate = (a, b) => {
  if (a === b) {
    return 0
  }

  return new Date(a) > new Date(b) ? 1 : -1
}
