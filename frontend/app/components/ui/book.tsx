import { book } from "../extra/def";
import Image from "next/image";
import Link from "next/link";
function Book({ book }: { book: book }) {
    

    return (
        <Link href={`/book/${book.id}`} className="w-3/4 relative group bg-red-500">
            <div className="left-56 bg-red-500 absolute h-full origin-left inset-0 scale-x-0 group-hover:scale-x-100">
                hover to show
            </div>
            <div className="flex flex-col justify-between items-center">
                <Image width={80} height={50} src={book.cover_path} alt="book's cover" />
                
                <h3>{ book.title}</h3>

            </div>

        </Link>
    );
 }
 

export default Book;