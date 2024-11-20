import Image from "next/image";
import { useState , useEffect } from "react";
const RandomImage = ({ cover_path}: {cover_path:null|string}) => {
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
        width={130}
        height={140}
        className="object-cover"
      />
  );
};

export default RandomImage;
