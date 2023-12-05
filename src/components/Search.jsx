import React from "react";
import Fuse from "fuse.js";
import PropTypes from "prop-types";

/**
 * Component representing a search bar for podcasts.
 * @param {Object} props - The component props.
 * @param {function} props.onSearch - Callback function to handle search results.
 * @returns {JSX.Element} JSX element representing the Search component.
 */
export default function Search({ onSearch }) {
    // State to store user's search input
    const [searchQuery, setSearchQuery] = React.useState("");
    // State to store search results
    const [searchResults, setSearchResults] = React.useState([]);
    // State to store podcast data
    const [podcasts, setPodcasts] = React.useState([]);
    // State to store initialized Fuse instance
    const [fuse, setFuse] = React.useState(null);

    // Effect hook to fetch podcasts when the component mounts
    React.useEffect(() => {
        fetchPodcasts();
    }, []);

    /**
     * Fetches the list of podcasts from the API.
     */
    const fetchPodcasts = async () => {
        try {
            const res = await fetch("https://podcast-api.netlify.app/shows");
            const data = await res.json();
            setPodcasts(data);
        } catch (error) {
            console.error("Error fetching podcasts:", error);
        }
    };

    // Effect hook to initialize Fuse when podcasts state changes
    React.useEffect(() => {
        if (podcasts.length > 0) {
            // Initialize the Fuse instance with the podcast data
            setFuse(new Fuse(podcasts, { keys: ["title"], includeScore: true, threshold: 0.4 }));
        }
    }, [podcasts]);

    /**
     * Handles the change of the search input.
     * @param {Object} event - The input change event.
     */
    const handleInputChange = (event) => {
        // Updates searchQuery state with user's input
        setSearchQuery(event.target.value);
    };

    /**
     * Handles the search click event.
     * Checks if the search query is empty and either sets the searchResults state to an empty array
     * or performs a search using the Fuse instance and updates the searchResults state.
     */
    const handleSearchClick = () => {
        // Checks if search query is empty; if it is, sets the searchResults state to empty array
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            // Calls the onSearch callback with the entire podcast data
            onSearch(podcasts);
        } else {
            // Otherwise, use the Fuse instance to perform the search and update searchResults state
            const results = fuse.search(searchQuery).map((result) => result.item);
            setSearchResults(results);
            // Calls the onSearch callback with the search results
            onSearch(results);
        }
    };

    // JSX rendering of the search component
    return (
        <div className="search-container">
            {/* Search input field */}
            <input
                className="searchbtn"
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search for podcasts"
            />
            {/* Search button */}
            <button onClick={handleSearchClick} className="search-button">
                Search
            </button>
        </div>
    );
}

// Prop type validation
Search.propTypes = {
    onSearch: PropTypes.func,
};
