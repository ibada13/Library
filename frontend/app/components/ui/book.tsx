import React, { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import RandomImage from "./randomimage";
import { book } from "../extra/def";

const BookCard = ({ book }: { book: book }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(overlayRef.current, {
      opacity: 1, // Slide into view from left
      y: "0",
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, 
      y:"-100%",
      duration:1,
      ease: "power2.out",
    });
  };

  return (
    <div >
      <div
        className="relative group w-48 h-50 overflow-hidden border rounded-md cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute flex flex-col justify-between items-center  top-0 left-0 opacity-0 w-full h-3/4 p-3 backdrop-blur-md text-white"
        >
          <div>
            {book.authors.map((author, index) => (
              <Link className="text-red-500" key={`author-${index}`} href={`/author/${author.id}`}><p>{ author.name}</p></Link>
              
            ))}
          </div>
          <div><p className="text-xs">{book.description?book.description.length>50?book.description.substring(0,50)+"...":book.description:"No description available"}</p></div>
          <div className="flex space-x-4"><p>{book.current_page_number}</p><p className="text-red-500">of</p><p>{book.pages }</p></div>
        </div>

        {/* Card Content */}
        <Link href={`/book/${book.id}`} passHref className="flex flex-col justify-between items-center h-full p-4">
                  <RandomImage cover_path={book.cover_path } />
          {/* <Image
            src={book.cover_path || '/images/1.jpg'} // Fallback image if no cover_path
            alt={`Cover of ${book.title}`}
            width={130}
            height={140}
            className="object-cover rounded-lg bg-red-400 flex-grow"
            /> */}
          <h4 className="text-center text-xs font-semibold truncate mt-4">{book.title}</h4>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
