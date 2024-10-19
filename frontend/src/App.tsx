import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * The main component of the application that displays a list of best-selling wines.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <App />
 *
 * @remarks
 * This component fetches wine data from an API based on the selected metric (revenue, quantity, or orders).
 * It also provides a search functionality to filter wines by name or vintage.
 *
 * @function
 * @name App
 *
 * @hook
 * @name useState
 * @description Manages the state for wines, filtered wines, search query, and selected metric.
 *
 * @hook
 * @name useEffect
 * @description Fetches wine data from the API whenever the selected metric changes.
 *
 * @param {Object} event - The event object from the search input field.
 *
 * @param {string} event.target.value - The current value of the search input field.
 *
 *
 * @function
 * @name handleSearch
 * @description Filters the list of wines based on the search query.
 *
 * @param {Object} wine - The wine object from the list of wines.
 *
 * @param {string} wine.name - The name of the wine.
 *
 * @param {number} wine.vintage - The vintage year of the wine.
 *
 * @param {number} wine.total - The total metric value of the wine (revenue, quantity, or orders).
 *
 * @param {number} index - The index of the wine in the list.
 *
 * @param {number} length - The total number of wines in the filtered list.
 *
 * @returns {JSX.Element} The rendered list item for each wine.
 */
function App() {
  interface Wine {
    name: string;
    vintage: number;
    total: number;
  }

  const [wines, setWines] = useState<Wine[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [metric, setMetric] = useState("revenue");

  useEffect(() => {
    fetch(`http://localhost:3000/wines?metric=${metric}`)
      .then((response) => response.json())
      .then((data) => {
        setWines(data);
        setFilteredWines(data);
      })
      .catch((error) => console.error("Error fetching wines:", error));
  }, [metric]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    const query = event.target.value.toLowerCase();
    setFilteredWines(
      wines.filter(
        (wine) =>
          wine.name.toLowerCase().includes(query) ||
          wine.vintage.toString().includes(query)
      )
    );
  };

  return (
    <div className="app">
      <h1>Best Selling Wines</h1>
      <input
        type="text"
        placeholder="Search by name or vintage"
        value={searchQuery}
        onChange={handleSearch}
        className="search-bar"
      />
      <select onChange={(e) => setMetric(e.target.value)} value={metric} className="metric-select">
        <option value="revenue">Revenue</option>
        <option value="quantity">Total Bottles Sold</option>
        <option value="orders">Number of Orders</option>
      </select>
      <ul className="wine-list">
        {filteredWines.map((wine, index) => (
          <li key={index} style={{ color: getColor(index, filteredWines.length) }}>
            {wine.name} ({wine.vintage}) - {wine.total}
          </li>
        ))}
      </ul>
    </div>
  );
}

function getColor(index: number, length: number) {
  if (index < length * 0.1) return "green";
  if (index >= length * 0.9) return "red";
  return "black";
}

export default App;