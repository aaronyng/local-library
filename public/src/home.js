function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const booksBorrowed = books.filter(book => book.borrows.filter(borrowed => 
    borrowed.returned === false).length > 0);
  return booksBorrowed.length;
}

//helper function for getMostCommonGenres
function total(books) {
  let totalGenres = {};
  
  books.forEach(book => {
    totalGenres[book.genre] != null ? 
      totalGenres[book.genre] ++ : 
        totalGenres[book.genre] = 1;
  });
  return totalGenres;
}

function getMostCommonGenres(books) {
  let totalGenres = total(books);
  let mostCommon = [];

  for(const [book, total] of Object.entries(totalGenres)) {
    mostCommon.push({
      'name' : book,
      'count' : total
    });
  }
  mostCommon.sort((least, most) => most.count - least.count);

  return mostCommon.slice(0, 5);
}

function getMostPopularBooks(books) {
  const popular = books.map(book => 
    ({ name: book.title, count: book.borrows.length }));
  
  popular.sort((least, most) => most.count - least.count);

  return popular.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  return authors.map(author => {
    author.count = books.filter(book => book.authorId === author.id)
      .reduce((acc, cur) => acc + (cur.borrows && cur.borrows.length || 0), 0);
    
    author.name = `${author.name.first} ${author.name.last}`;
    delete author.id;

    return author;
  }).sort((least, most) => most.count - least.count).slice(0, 5);

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
