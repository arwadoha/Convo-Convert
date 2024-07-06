import React, { useEffect, useState } from "react";
import "./Home.css";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { HeaderContext } from "../../assets/context/HeaderProvider";
import { useHeader } from "../../hooks/useHeader";
import axios from "axios";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { useGlobal } from "../../assets/context/GlobalProvider";

const Home = () => {
  const Navigate = useNavigate();
  const { filter } = useGlobal();
  const { currentPage, setCurrentPage } = useGlobal()

  const { open: openAdvanceSearch } = useHeader();

  const [open, setOpen] = useState({
    date: false,
    employee: false,
    customer: false,
    tags: false,
  });

  function handleOpenOption(option) {
    Object.keys(open).map((key) => {
      if (option !== key && open[key] === true) {
        setOpen((prev) => ({
          ...prev,
          [key]: false,
        }));
      }
    });
    setOpen((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  }

  const { data: calls, isLoading } = useQuery({
    queryKey: ["get-calls"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8080/Calls");
      return response.data;
    },
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  function filterArray(arr) {
    return arr.filter((call) => {
      if (filter.status && filter.starred != null) {
        return call.status == filter.status && call.started == filter.starred;
      } else if (filter.status && filter.starred == null) {
        return call.status == filter.status;
      } else if (filter.status == "" && filter.starred != null) {
        return call.started == filter.starred;
      } else {
        return call;
      }
    });
  }

  const CALL_PER_PAGE = 10;

  const initialPoint = CALL_PER_PAGE * (currentPage - 1);

  const calls_with_pagination_and_filter = calls.slice(
    initialPoint,
    CALL_PER_PAGE * currentPage
  );

  const pagesCount = Math.ceil(calls.length / CALL_PER_PAGE);

  function previous() {
    setCurrentPage((prev) => prev - 1);
  }
  function next() {
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <div className="home-page">
      <div className="top-section">
        <div className="addvance-search" data-show={openAdvanceSearch}>
          <p>Advance Search</p>
          <div className="date">
            <div className="trigger" onClick={() => handleOpenOption("date")}>
              Date
            </div>
            {open.date && (
              <ul>
                <li>Today</li>
                <li>Last Week</li>
                <li>Last Month</li>
                <li>Last Year</li>
                <li>Custom Range</li>
              </ul>
            )}
          </div>

          <div className="employee">
            <div
              className="trigger"
              onClick={() => handleOpenOption("employee")}
            >
              Employee
            </div>
            {open.employee && (
              <ul>
                <li className="employee-search">
                  <input type="text" placeholder="Search employee by name" />
                </li>
                <li>Today</li>
                <li>Last Week</li>
                <li>Last Month</li>
                <li>Last Year</li>
                <li>Custom Range</li>
              </ul>
            )}
          </div>

          <div className="customer">
            <div
              className="trigger"
              onClick={() => handleOpenOption("customer")}
            >
              Customer
            </div>
            {open.customer && (
              <ul>
                <li className="customer-search">
                  <input type="text" placeholder="Search customer by name" />
                </li>
                <li>Today</li>
                <li>Last Week</li>
                <li>Last Month</li>
                <li>Last Year</li>
                <li>Custom Range</li>
              </ul>
            )}
          </div>
        </div>
        <div className="pagination">
          <div className="info">
            <span>{currentPage}</span>
            <span>of</span>
            <span>{pagesCount}</span>
          </div>
          <div className="arrows">
            <button onClick={previous} disabled={currentPage <= 1}>
              <MdOutlineKeyboardArrowLeft size={20} />
            </button>
            <button onClick={next} disabled={currentPage >= pagesCount}>
              <MdOutlineKeyboardArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="messages">
        {filterArray(calls_with_pagination_and_filter).length > 0 ? (
          filterArray(calls_with_pagination_and_filter).map((call) => {
            return (
              <div key={call.id} className="message">
                <Link to={`/message-details/${call.id}`} className="employee">
                  {call.employeeName}
                </Link>

                <Link to={`/message-details/${call.id}`} className="customer">
                  <p>{call.phoneNumber}</p>
                  <p className="audio-text" title={call.audioText}>
                    {call.audioText}
                  </p>
                </Link>

                <div className="controls">
                  <p>{new Date(call.date).toLocaleString()}</p>
                  <div className="icons">
                    {call.started ? <FaStar color="orange" /> : <FaRegStar />}

                    <input
                      type="checkbox"
                      checked={call.status == "solved"}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>No Items Found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
