import { FaAngleRight } from "react-icons/fa6";
import { useState } from "react";
function Search ({props}) {
    const [data, setData] = useState("");
    return (
        <div className="search bg-white text-center">
            <input className="p-2 m-8  mr-0 border-2 border-slate-300" type="text" placeholder="Search product..." value={data} onChange={(e) => setData(e.target.value)} />
            <button className="p-3 m-8 ml-2 bg-teal-400 border-1 border-b-2 border-teal-400" onClick={() => props(data)}><FaAngleRight/></button>
        </div>
    )
}
export default Search