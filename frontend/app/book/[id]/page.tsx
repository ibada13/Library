'use client';
import { useSearchParams } from "next/navigation";
import { book } from "@/app/components/extra/def";
import RandomImage from "@/app/components/ui/randomimage";
import Link from "next/link";
const Book = () => { 

    const searchParams = useSearchParams();
    const stringbook = searchParams.get("book");
    if (!stringbook) { 
        return (
            <div>
                no book to show
            </div>
        );
    }
    const book = JSON.parse(stringbook as string) as book;
    if (!book) return <div>No book found.</div>;
  
    return (
        <div className="flex justify-around items-center min-h-screen p-6">
            <div className="w-1/4 bg-red-500 h-1/2 border rounded-md self-start ">
                <RandomImage width={300} height={200} cover_path={book.cover_path}/>
            </div>
            <div className="w-2/3 flex flex-col justify-around items-center min-h-screen space-y-12">
                <p className="text-5xl text-red-500">{book.title}</p>
                <div className=" flex gap-x-3 font-bold w-full">
                    <p  className="whitespace-pre-wrap">المؤلفون   :</p>
                    {book.authors.map((author, index) => (
                        <Link passHref key={`author-${index}`} href={`author/${author.id}`}> { author.name}</Link>
                    ))}
                </div>
                <div className="flex justify-around w-1/2 ">
                    <Link className="p-4 w-1/4 text-md font-bold bg-green-400 hover:text-black transition-colors duration-300 rounded-md text-center" href={`/book/edit/${book.id}`} passHref>تعديل</Link>
                    <Link className="p-4 w-1/4 text-md font-bold bg-red-500 hover:text-black transition-colors duration-300  rounded-md text-center" href={`/book/delete/${book.id}`} passHref>حذف</Link>
                </div>
                <p className="text-xl flex  text-white gap-x-4"><span>{ book.current_page_number}</span><span className="text-red-500">من</span><span>{ book.pages}</span></p>
                <p className="text-md">{book.description}</p>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}


export default Book;