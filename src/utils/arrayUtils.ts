export const joinNumbersWithHyphen = (userIds: number[]): string => {
  return userIds.sort((a, b) => a - b).join('-')
}
