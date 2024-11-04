const fetchRecommendedBooks = async (profile) => {
    const { favoriteBooks, favoriteAuthors, favoriteGenres, themes } = profile;

    // Build search queries
    const queries = [];

    if (favoriteBooks && favoriteBooks.length) {
        favoriteBooks.forEach(book => {
            queries.push(`intitle:${book}`);
            console.log(`Adding favorite book to query: intitle:${book}`); // Log added book
        });
    }

    if (favoriteAuthors && favoriteAuthors.length) {
        favoriteAuthors.forEach(author => {
            queries.push(`inauthor:${author}`);
            console.log(`Adding favorite author to query: inauthor:${author}`); // Log added author
        });
    }

    if (favoriteGenres && favoriteGenres.length) {
        favoriteGenres.forEach(genre => {
            queries.push(`subject:${genre}`);
            console.log(`Adding favorite genre to query: subject:${genre}`); // Log added genre
        });
    }

    if (themes && themes.length) {
        themes.forEach(theme => {
            queries.push(`subject:${theme}`);
            console.log(`Adding theme to query: subject:${theme}`); // Log added theme
        });
    }

    const allBooks = [];

    // Fetch data for each query separately
    for (const query of queries) {
        const encodedQuery = encodeURIComponent(query); // Properly encode each query
        console.log('Executing Search Query:', query); // Log each query separately

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&key=AIzaSyB1ZDjfU1JjNa8SE57ojxvCfQiHrBbCPy4`);

            // Check if the response is ok
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Google Books API response:', data); // Log the API response

            // Add the fetched books to the list, if available
            if (data.items && data.items.length) {
                allBooks.push(...data.items);
            }
        } catch (error) {
            console.error('Error fetching recommended books:', error);
        }
    }

    return allBooks; // Return all fetched books
};

export default fetchRecommendedBooks;
