import Image from "next/image";
import { useState , useEffect } from "react";
const RandomImage = ({ cover_path , width , height}: {cover_path:null|string , width?:number , height?:number}) => {
    const [randompic, Setrandompic] = useState<number>();
    useEffect(() => {
        const randomPage = Math.floor(Math.random() * 2) + 1; 
        Setrandompic(randomPage)
     },[])

  const imagePath = `/images/${randompic}.jpg`;

  return (
      <Image
        src={cover_path||imagePath}
        alt={`book's cover`}
        width={width?width:130}
        height={height?height:140}
        className="object-cover rounded-md"
      />
  );
};

export default RandomImage;
