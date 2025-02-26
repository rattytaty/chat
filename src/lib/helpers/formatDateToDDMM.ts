export const formatDateToDDMM = (date: Date) => {

    const month = (date.getMonth()+1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}.${month}`;
}