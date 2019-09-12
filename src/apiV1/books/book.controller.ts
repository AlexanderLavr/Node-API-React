import { Request, Response } from 'express';
import Book from './book.model';

export default class BookController {
  
  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const books = await Book.find();
        res.status(200).send({
          success: true,
          data: books
        });
      }catch(err) {
        res.status(500).send({
          success: false
        });
      }
  };

  public saveBook = async (req: Request, res: Response): Promise<any> => {
    let {title, price, description, amount, choosePhoto} = req.body
    const book = new Book({
      _id: null,
      title: title,
      price: price, 
      amount: amount,
      description: description,
      choosePhoto: choosePhoto
    });

    try {
      let matchBooks = await Book.findOne({ title: book.title });
      if (!matchBooks) {
          await Book.create(book);
      }else return res.status(401).send({
          success: false,
          message: 'This book exists!'
        });
    
      res.status(201).send({
        success: true
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
      });
    }
  };

  public takeBook = async (req: Request, res: Response): Promise<any> => {
    try {
      const takeBook = await Book.findById(req.params.id);
        res.status(200).send({
          success: true,
          data: takeBook
        });
      }catch(err) {
        res.status(500).send({
          success: false
        });
      }
  };

  public bookUpdate = async (req: Request, res: Response): Promise<any> => {
    let {title, price, description, amount, choosePhoto} = req.body
    try {
      await Book.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: title,
            price: price, 
            amount: amount,
            description: description,
            choosePhoto: choosePhoto
          }
        },
        { new: true }
      );
      res.status(200).send({
        success: true
      });
      }catch(err) {
        res.status(500).send({
          success: false
        });
      }
  };

  public deleteBooks = async (req: Request, res: Response): Promise<any> => {
    let arrayDelBooks = req.body;
    try{
    await arrayDelBooks.forEach(async id => {
        await Book.findByIdAndRemove({_id: id})
    });
    await res.status(200).send({
      success: true
    });
    }catch(err){
      res.status(500).send({
        success: false
      });
    }
  };
}
