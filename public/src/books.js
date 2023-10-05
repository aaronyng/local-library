function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let returned = [];
    
  books.forEach(book => book.borrows[0].returned === false ? checkedOut.push(book) : returned.push(book));

    return [checkedOut, returned];
};

function getBorrowersForBook(book, accounts) {
  return book.borrows.map(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    return { ...borrow, ...account };
  }).slice(0, 10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
