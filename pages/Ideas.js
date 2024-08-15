import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import LazyLoad from "react-lazyload";
import axios from "axios";
import dayjs from "dayjs";

const Ideas = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("-published_at");
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState(null);
  const [links, setLinks] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/ideas?page[number]=${page}&page[size]=${size}&append[]=small_image&append[]=medium_image&sort=${sort}`
      )
      .then((response) => {
        setIdeas(response.data.data);
        setMeta(response.data.meta);
        setLinks(response.data.links);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page, size, sort]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.last_page) {
      setPage(newPage);
    }
  };

  const handleSizeChange = (event) => {
    setSize(Number(event.target.value));
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const paginationRange = () => {
    if (!meta) return [];

    let start = Math.max(1, meta.current_page - 2);
    let end = Math.min(meta.last_page, meta.current_page + 2);

    if (meta.last_page > 5) {
      if (meta.current_page <= 3) {
        end = Math.min(5, meta.last_page);
      } else if (meta.current_page + 2 >= meta.last_page) {
        start = Math.max(1, meta.last_page - 4);
      }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Banner
        imageUrl="https://plus.unsplash.com/premium_photo-1673514503545-1ca1193e4094?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Ideas"
        subtitle="We have great ideas"
      />
      <main className="px-20 py-10">
        <div className="flex justify-between items-center mb-10">
          <span>
            Showing {meta?.from} - {meta?.to} of {meta?.total}
          </span>
          <div className="flex space-x-4">
            <div className="mr-5">
              <label htmlFor="show-per-page" className="mr-2">
                Show per page:
              </label>
              <select
                id="show-per-page"
                value={size}
                onChange={handleSizeChange}
                className="border rounded-full px-10 py-1 pl-3 text-left"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort-by" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sort}
                onChange={handleSortChange}
                className="border rounded-full px-10 py-1 pl-3 text-left"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <LazyLoad height={200} offset={100}>
                <img
                  src="https://plus.unsplash.com/premium_photo-1673356713504-d8a6a35eb209?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={idea.title}
                  className="w-full h-48 object-cover"
                />
              </LazyLoad>
              <div className="p-4">
                <p className="text-gray-500 text-xs mb-1 uppercase">
                  {dayjs(idea.published_at).format("D MMMM, YYYY")}
                </p>
                <h2 className="text-xl font-semibold mb-2 line-clamp-3">
                  {idea.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={!links.prev}
            className={`px-1 py-1 text-md ${
              !links.prev ? "text-gray-500" : "text-black"
            }`}
          >
            &laquo;
          </button>
          <button
            onClick={() => handlePageChange(meta.current_page - 1)}
            disabled={!links.prev}
            className={`px-1 py-1 text-md ${
              !links.prev ? "text-gray-500" : "text-black"
            }`}
          >
            &lsaquo;
          </button>
          {paginationRange().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-1 py-1 rounded text-xs ${
                meta.current_page === pageNum
                  ? "bg-[rgb(255,102,0)] text-white"
                  : "bg-transparent text-black"
              }`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(meta.current_page + 1)}
            disabled={!links.next}
            className={`px-1 py-1 text-md ${
              !links.next ? "text-gray-700" : "text-black"
            }`}
          >
            &rsaquo;
          </button>
          <button
            onClick={() => handlePageChange(meta.last_page)}
            disabled={!links.next}
            className={`px-1 py-1 text-md ${
              !links.next ? "text-gray-700" : "text-black"
            }`}
          >
            &raquo;
          </button>
        </div>
      </main>
    </div>
  );
};

export default Ideas;
