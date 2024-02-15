import {useState} from 'react';

export function Search() {

    const[query,setQuery] = useState("")

    return (
        <input 
            type="search" 
            placeholder="Search..." 
            value={query}
            onChange={e=>setQuery(e.target.value)}
         />
    )
}