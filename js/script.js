// Your Giphy API key
const apiKey = "9zpJKG7Npzf0Dboh0MlYS5KGMbZ9OmNG";

// Get the HTML elements we need
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// Fetch GIFs from Giphy when the button is clicked
fetchButton.addEventListener("click", async () => {
    // Get the search term from the input
    const searchTerm = searchInput.value.trim() || "funny";

    // Giphy search endpoint
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12`;

    try {
        // Send the request to Giphy
        const response = await fetch(endpoint);

        // Convert the response to JSON
        const data = await response.json();

        // Get the GIF URLs from the response
        const images = data.data.map(
            (gif) => gif.images.original.url
        );

        // Clear previous GIFs
        gifContainer.innerHTML = "";

        // Display each GIF on the page
        for (const imageUrl of images) {
            gifContainer.innerHTML += `
                <img src="${imageUrl}" class="col-3 mb-3" alt="Giphy GIF">
            `;
        }
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        gifContainer.innerHTML = "<p>Sorry, something went wrong.</p>";
    }
});