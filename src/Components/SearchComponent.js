import React, { use, useState } from "react"

const SearchComponent = () => {
    const [search, setSearch] = useState('')

    const items = [
        'Apple',
        'Banana',
        'Orange',
        'Mango',
        'Pineapple',
        'Strawberry',
        'Blueberry',
        'Grapes',
    ];

    const filterItems = items.filter(item => item.toLowerCase().includes(search.toLowerCase()))


    return (
        <>
            <h1>Search Fruits</h1>
            <input 
                type="text"
                placeholder="search..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
            />

            <ul>
                {filterItems.map((ele, index) => (
                    <li key={index}>{ele}</li>
                ))}
            </ul>
        </>
    )
}

export default SearchComponent;