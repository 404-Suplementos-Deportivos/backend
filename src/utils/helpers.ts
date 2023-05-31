export const formatDate = (date: Date): string => {
  // cambiar de formato 2023-01-01T00:00:00.000Z a yyyy-mm-dd
  const dateArray = date.toISOString().split('T')[0].split('-')
  return `${dateArray[0]}-${dateArray[1]}-${dateArray[2]}`
}

export const gemerateInvoiceNumber = (): number => {
  // Get the current date and time.
  const now = new Date();

  // Create a random number.
  const randomNumber = Math.floor(Math.random() * 1000000);

  // Return the invoice number.
  return Number(`${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${randomNumber}`);
}