'use client';
import Book from "./ui/book";
import { useEffect, useState } from "react";
import {fetch_books} from './utils/api'
import { book ,data} from "./extra/def";
export const Homepage = () => { 
    const [page, Setpage] = useState<number>(1);
    const [books, SetBooks] = useState<book[]>([]);
    const [data , Setdata]=useState<data>()
    useEffect( () => { 
        const get_books = async() => { 

            try {
                
                const fetcheddata:data = await fetch_books(`http://localhost:8000/api/books?page=${page}`);
                Setdata(fetcheddata);
                SetBooks(fetcheddata.data);
            } catch (error) { 
                console.log(error)
            }
        }
        get_books();
    },[page])

    return (
        <div className="w-[90%]  flex flex-col justify-center items-center space-y-6">
            
        <div className="w-full min-h-screen grid md:grid-cols-3 grid-cols-2 gap-y-10  place-items-center justify-center">
            { 
                books.map((book, index) => ( 
                    <Book book={book} key={`b-${index}`}/>
                ))
                }
        </div>
            <div className="w-1/2 self-center flex  m-4 justify-around items-center ">
                <button className="p-4 font-bold text-red-500 border rounded-md  disabled:text-red-500 disabled:border disabled:border-gray-600 disabled:cursor-not-allowed" disabled={ page<=1} onClick={e=>Setpage(page=>page-1)}>{'<'}-</button>
                <button className="p-4 font-bold text-red-500 border rounded-md  disabled:text-red-500 disabled:border disabled:border-gray-600 disabled:cursor-not-allowed" disabled={data ?page>=data?.last_page:undefined}  onClick={e=>Setpage(page=>page+1)}>-{'>'}</button>
            </div>
            </div>
    );
}