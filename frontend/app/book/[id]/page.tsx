'use client';
import { useSearchParams } from "next/navigation";
import { book, comment_data } from "@/app/components/extra/def";
import RandomImage from "@/app/components/ui/randomimage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { commentype } from "@/app/components/extra/def";
import { fetch_comments } from "@/app/components/utils/api";
import Comment from "@/app/components/ui/Comment";
import { BsArrowDownCircle } from "react-icons/bs";
import useSWR from "swr";
const Book = () => { 

    const searchParams = useSearchParams();
    const [comments, Setcomments] = useState<commentype[]>([]);
    const [loadingcomments , SetLoadingComments  ]=useState<boolean>(false)
    const [commentpage, SetCommentPage] = useState<number>(0);
    // const [data, Setdata] = useState<comment_data>();
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
    
    function laodmorecomments() {
        SetCommentPage(pagenb => pagenb + 1);
        SetLoadingComments(true);
    }
    const [disabled, Setdisabled] = useState<boolean>(book.comments);
    const { data, error, isLoading:loading } = useSWR<comment_data[]>(
        book.id && commentpage&&loadingcomments
        ? `http://127.0.0.1:8000/api/comment?book_id=${book.id}&page=${commentpage}`
        : null,
         fetch_comments,
         {
             onSuccess: (data) => {
                //  console.log(data)
                     if(data) { 
                        Setcomments((prev)=>[...prev,...data[0].data]);
                    }
                 SetLoadingComments(false);
                 Setdisabled(book.comments && (data?.[0]?.next_page_url !== null));
                 console.log(disabled ,data[0].next_page_url , book.comments)
                }
            }
            
        );

    return (
        <div className="flex flex-col  justify-around">

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
            
            {comments.map((comment:commentype, index:number) => (
                
                <Comment key={`comment-${index}`} comment={comment}/>
            ))}
            <button disabled={!disabled} className="flex justify-center items-center text-6xl text-red-500 disabled:text-white disabled:opacity-50" onClick={laodmorecomments}><BsArrowDownCircle /></button>
            </div>
    );
}


export default Book;