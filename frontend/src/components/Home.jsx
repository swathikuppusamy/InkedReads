import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";

const FrontPage = () => {
  const quotes = [
    {
      text: "A room without books is like a body without a soul. – Marcus Tullius Cicero",
      bgImage: "https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978_640.jpg", // Example URL, you can replace with actual URLs
    },
    {
      text: "So many books, so little time. – Frank Zappa",
      bgImage: "https://cdn.pixabay.com/photo/2014/08/16/18/17/book-419589_640.jpg",
    },
    {
      text: "The only thing that you absolutely have to know is the location of the library. – Albert Einstein",
      bgImage: "https://cdn.pixabay.com/photo/2016/03/27/19/32/book-1283865_640.jpg",
    },
    {
      text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking. – Haruki Murakami",
      bgImage: "https://cdn.pixabay.com/photo/2019/02/15/11/04/book-3998252_640.jpg.",
    },
    {
      text: "Books are a uniquely portable magic. – Stephen King",
      bgImage: "https://cdn.pixabay.com/photo/2021/06/07/16/50/woman-6318447_640.jpg",
    },
    {
      text: "Good friends, good books, and a sleepy conscience: this is the ideal life. – Mark Twain",
      bgImage: "https://cdn.pixabay.com/photo/2016/05/28/07/05/book-1421097_640.jpg",
    },
    {
      text: "Libraries were full of ideas – perhaps the most dangerous and powerful of all weapons. – Sarah J. Maas",
      bgImage: "https://cdn.pixabay.com/photo/2022/01/16/19/01/candle-6942931_640.jpg",
    },
    {
      text: "Reading is essential for those who seek to rise above the ordinary. – Jim Rohn",
      bgImage: "https://cdn.pixabay.com/photo/2022/02/17/10/21/book-7018452_640.jpg",
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
