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
import moment from "moment";
import { GiClawSlashes } from "react-icons/gi";

const Home = () => {
  const { filter, currentPage, setCurrentPage, search, setSearch } =
    useGlobal();

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

  const [calls, setCalls] = useState([]);
  const [filterCalls, setFilterCalls] = useState([]);
  const [callsLoading, setCallsLoading] = useState(true);
  const [customerNames, setCustomerNames] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  async function getCalls() {
    try {
      const { data, status } = await axios.get("http://localhost:8080/Calls");
      if (status == 200) {
        setCalls(data);
        setFilterCalls(data);
        setCustomerNames([...new Set(data.map((call) => call.customerName))]);
        setEmployeeNames([...new Set(data.map((call) => call.employeeName))]);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!");
    } finally {
      setCallsLoading(false);
    }
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

  function previous() {
    setCurrentPage((prev) => prev - 1);
  }
  function next() {
    setCurrentPage((prev) => prev + 1);
  }

  const filteredCalls = calls.filter((call) =>
    call.audioText.toLowerCase().includes(search.query.toLowerCase())
  );

  const CALL_PER_PAGE = 10;

  const initialPoint = CALL_PER_PAGE * (currentPage - 1);

  const calls_with_pagination_and_filter = filteredCalls.slice(
    initialPoint,
    CALL_PER_PAGE * currentPage
  );

  const pagesCount = Math.ceil(filteredCalls.length / CALL_PER_PAGE);
  const dateOptions = [
    "Today",
    "Last Week",
    "Last Month",
    "Last Year",
    // "Custom Range",
  ];
  useEffect(() => {
    getCalls();
  }, []);

  if (callsLoading) {
    return <div>Loading...</div>;
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
                {dateOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      setSearch((prev) => ({
                        ...prev,
                        date: option,
                      }));
                      handleOpenOption("date");
                    }}
                  >
                    {option}
                  </li>
                ))}
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
                  <input
                    type="text"
                    placeholder="Search employee by name"
                    onChange={({ target: { value } }) => {
                      setSearch((prev) => ({
                        ...prev,
                        employee: value,
                      }));
                    }}
                  />
                </li>
                {employeeNames
                  ?.filter((em) => em.toLowerCase().includes(search.employee))
                  ?.map((e) => (
                    <li
                      key={e}
                      onClick={() => {
                        handleOpenOption("employee");
                      }}
                    >
                      {e}
                    </li>
                  ))}
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
                  <input
                    type="text"
                    placeholder="Search customer by name"
                    onChange={({ target: { value } }) => {
                      setSearch((prev) => ({
                        ...prev,
                        customer: value,
                      }));
                    }}
                  />
                </li>
                {customerNames
                  ?.filter((cu) =>
                    cu.toLowerCase().includes(search.customer || "")
                  )
                  ?.map((c) => (
                    <li
                      key={c}
                      onClick={() => {
                        handleOpenOption("customer");
                      }}
                    >
                      {c}
                    </li>
                  ))}
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
        {filterCalls.length ? (
          filterCalls.map((call) => {
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
                  <p>{moment(call.date).format("MMM, DD YYYY")}</p>

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
