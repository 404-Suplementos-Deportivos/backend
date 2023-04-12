export const formatDate = (date: Date): string => {
  // cambiar de formato 2023-01-01T00:00:00.000Z a yyyy-mm-dd
  const dateArray = date.toISOString().split('T')[0].split('-')
  return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`
}