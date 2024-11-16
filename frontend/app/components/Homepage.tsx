import Book from "./ui/book";
import { books } from "./extra/data";
export const Homepage = () => { 
    return (
        <div className="w-screen h-screen grid grid-cols-3 gap-3">
            { 
                books.map((book, index) => ( 
                    <Book book={book} key={`b-${index}`}/>
                ))
            }
        </div>
    );
}