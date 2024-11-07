import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import img1 from "../assets/book-dlight.jpg";
import img2 from "../assets/img-1.jpg";
import img3 from "../assets/img-9.jpg";
import img4 from "../assets/img-3.jpg";
import img5 from "../assets/img-5.jpg";
import img6 from "../assets/img-2.jpg";
import img7 from "../assets/imgal-4.jpg";
import img8 from "../assets/books-nlight.jpg";

const FrontPage = () => {
  const quotes = [
    {
      text: "A room without books is like a body without a soul. – Marcus Tullius Cicero",
      bgImage: img1,
    },
    {
      text: "So many books, so little time. – Frank Zappa",
      bgImage: img2,
    },
    {
      text: "The only thing that you absolutely have to know is the location of the library. – Albert Einstein",
      bgImage: img3,
    },
    {
      text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking. – Haruki Murakami",
      bgImage: img4,
    },
    {
      text: "Books are a uniquely portable magic. – Stephen King",
      bgImage: img5,
    },
    {
      text: "Good friends, good books, and a sleepy conscience: this is the ideal life. – Mark Twain",
      bgImage: img6,
    },
    {
      text: "Libraries were full of ideas – perhaps the most dangerous and powerful of all weapons. – Sarah J. Maas",
      bgImage: img7,
    },
    {
      text: "Reading is essential for those who seek to rise above the ordinary. – Jim Rohn",
      bgImage: img8,
    },
  ];

  const [index, setIndex] = useState(0);

  // Automatically change quotes and background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[index];

  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${currentQuote.bgImage})` }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{currentQuote.text}</h2>
        </div>
      </div>
    </>
  );
};

export default FrontPage;
