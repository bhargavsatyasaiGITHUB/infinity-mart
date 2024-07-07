import { useState } from "react"
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Pagination = () => {

  const [pages, setPages] = useState(["1", "2", "3", "4"])
  const [currentPage, setCurrentPage] = useState("1")

  return (
    <div className="max-w-screen-xl  text-gray-600">
      <div className="hidden justify-between text-sm md:flex">
        <div>
        </div>
        <div className="flex items-center gap-8" aria-label="Pagination">
          <a href="javascript:void(0)" className="p-3  border rounded-lg duration-150 hover:bg-gray-50"><GrFormPrevious /></a>
          <ul className="flex items-center gap-1">
            {
              pages.map((item, idx) => (
                <li key={item}>
                  {
                    item == "..." ? (
                      <div>
                        {item}
                      </div>
                    ) : (
                      <a href="javascript:void(0)" aria-current={currentPage == item ? "page" : false} className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-red-600 ${currentPage == item ? "bg-red-600 text-white font-medium" : ""}`}>
                        {item}
                      </a>
                    )
                  }
                </li>
              ))
            }
          </ul>
          <a href="javascript:void(0)" className="p-3  border rounded-lg duration-150 hover:bg-gray-50"><GrFormNext /></a>
        </div>
      </div>
      {/* On mobile version */}
      <div className="flex items-center justify-between text-sm text-gray-600 gap-2 font-medium md:hidden">
        <a href="javascript:void(0)" className="p-4  border rounded-lg duration-150 hover:bg-gray-50"><GrFormPrevious /></a>
        <a href="javascript:void(0)" className="p-4  border rounded-lg duration-150 hover:bg-gray-50"><GrFormNext /></a>
      </div>
    </div>
  )
}


export default Pagination;
