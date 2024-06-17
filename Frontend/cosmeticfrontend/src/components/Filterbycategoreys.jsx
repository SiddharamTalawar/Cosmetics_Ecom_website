function Filterbycategoreys ({props}){
    function sendcategorydata(e){
        let data = e.target.textContent
        props(data)
    }
    return(
        <div className="filterbycategoreys p-3 bg-white pl-16 ">
            <p className="text-2xl mt-4 mb-2">Filter by Categorey</p>
            <ul>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>All Products</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Anti-aging Cream</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Balms</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Face Cream</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Feminine Deodorants</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Paste Masks</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Skin Fresheners</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Skin Milk</li>
                <li className="mb-3 text-teal-400 cursor-pointer" onClick={sendcategorydata}>Skin Toner</li>
            </ul>
        </div>
    )
}
export default Filterbycategoreys