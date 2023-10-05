function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((first, last) => 
  first.name.last.toLowerCase() > last.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach(book => book.borrows.forEach(borrow => account.id === borrow.id && total ++));
  
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  let borrowedBooks = [];

  books.forEach(book => {
    const borrowed = book.borrows;
    if(borrowed.find(borrow => borrow.id === account.id && !borrow.returned)) {
      borrowedBooks.push(book);
    };
  });

  borrowedBooks.forEach(book => {
    const authorInfo = authors.find(author => author.id === book.authorId);
    book['author'] = authorInfo;
  });

  return borrowedBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
