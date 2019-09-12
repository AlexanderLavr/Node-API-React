import { Router } from 'express';
import Controller from './book.controller';

const books: Router = Router();
const controller = new Controller();


// Get all books
books.get('/', controller.getAll);

// Save book
books.post('/saveBook', controller.saveBook);

// Take book by id
books.get('/takeEditBook/:id', controller.takeBook);

// Book Update
books.put('/savEditBook/:id', controller.bookUpdate);

// Delete a book(s)
books.delete('/deleteBooks', controller.deleteBooks);


export default books;
