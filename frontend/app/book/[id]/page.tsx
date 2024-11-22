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
        <div className="flex flex-col space-y-6 md:flex-row justify-center md:justify-around items-center min-h-screen p-6">
            <div className="w-1/4  bg-red-500 h-1/2 border rounded-md self-center ">
                <RandomImage width={300} height={200} cover_path={book.cover_path}/>
            </div>
            <div className="md:w-2/3 w-full flex flex-col justify-around items-center min-h-screen space-y-12">
                <p className="text-5xl text-red-500">{book.title}</p>
                <div className=" flex gap-x-3 font-bold w-full">
                    <p  className="whitespace-pre-wrap">المؤلفون   :</p>
                    {book.authors.map((author, index) => (
                        <Link passHref key={`author-${index}`} href={`author/${author.id}`}> { author.name}</Link>
                    ))}
                </div>
                <div className="flex flex-col gap-y-3 sm:gap-y-0 sm:flex-row  sm:gap-x-4 text-lg ">
                    {book.types.map((type, index) => (
                        <Link key={`types-${index}`} className="hover:text-red-500 transition-colors duration-300" href={`/type/${type.id}`}>{ type.name}</Link>
                    ))}
                </div>
                <div className="self-center gap-y-3 flex items-center justify-between  sm:gap-y-0 sm:items-center sm:justify-around flex-col sm:flex-row  w-1/2 ">
                    <Link className="p-4 sm:w-1/4 w-1/2 text-md  font-black bg-green-400 hover:text-black transition-colors duration-300 rounded-md text-center" href={`/book/edit/${book.id}`} passHref>تعديل</Link>
                    <Link className="p-4 sm:w-1/4 w-1/2 text-md font-black bg-red-500 hover:text-black transition-colors duration-300  rounded-md text-center" href={`/book/delete/${book.id}`} passHref>حذف</Link>
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