'use client';
import Book from "./ui/book";
import { books } from "./extra/data";
export const Homepage = () => { 
    return (
        <div className="w-[90%]  flex justify-center items-center overflow-hidden">
            
        <div className="w-full grid grid-cols-3 gap-y-10  place-items-center justify-center">
            { 
                books.map((book, index) => ( 
                    <Book book={book} key={`b-${index}`}/>
                ))
            }
        </div>
            </div>
    );
}