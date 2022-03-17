export const paginationRange = (currentPage: number, totalItems: number, rowPerPage: number): number[] => {
    const from = currentPage * rowPerPage - rowPerPage + 1;
    let to = from + rowPerPage - 1;
    if (to > totalItems) {
        to = totalItems;
    }
    return [from, to];
};
