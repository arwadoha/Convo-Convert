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
import { BiCheck } from "react-icons/bi";

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
  const [callsLoading, setCallsLoading] = useState(true);
  const [customerNames, setCustomerNames] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [employeeInput, setEmplyeeInput] = useState("");
  const [customerInput, setCustomerInput] = useState("");
  async function getCalls() {
    try {
      const { data, status } = await axios.get("http://localhost:8080/Calls");
      if (status == 200) {
        setCalls([...data]);
        setCustomerNames([...new Set(data.map((call) => call.customerName))]);
        setEmployeeNames([...new Set(data.map((call) => call.employeeName))]);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!!");
    } finally {
      setCallsLoading(false);
    }
  }

  function previous() {
    setCurrentPage((prev) => prev - 1);
  }
  function next() {
    setCurrentPage((prev) => prev + 1);
  }

  const CALL_PER_PAGE = 10;
  function globalFiltering(arr) {
    return arr
      .slice((currentPage - 1) * CALL_PER_PAGE, CALL_PER_PAGE * currentPage)
      .filter((c) => {
        const lowerCustomerName = search.customer.toLowerCase();
        const lowerEmployeeName = search.employee?.toLowerCase();
        const lowerQuery = search.query?.toLowerCase();
        let dateCondition;
        const callDate = new Date(c.date).toDateString();
        const today = new Date().toDateString();
        const weekAgo = new Date(
          Date.now() - 7 * 24 * 60 * 60 * 1000
        ).toDateString();
        const monthAgo = new Date(
          Date.now() - 30 * 24 * 60 * 60 * 1000
        ).toDateString();
        const yearAgo = new Date(
          Date.now() - 365 * 24 * 60 * 60 * 1000
        ).toDateString();
        switch (search.date) {
          case "Today":
            dateCondition = callDate == today;
            break;
          case "Last Week":
            dateCondition = callDate >= weekAgo;
            break;
          case "Last Month":
            dateCondition = callDate >= monthAgo;
            break;
          case "Last Year":
            dateCondition = callDate >= yearAgo;
            break;
          default:
            dateCondition = true;
            break;
        }
        return (
          (!search.query || c.audioText.toLowerCase().includes(lowerQuery)) &&
          (filter.starred == null || c.started == filter.starred) &&
          (filter.status == "" || c.status == filter.status) &&
          (!search.customer ||
            c.customerName.toLowerCase().includes(lowerCustomerName)) &&
          (!search.employee ||
            c.employeeName.toLowerCase().includes(lowerEmployeeName)) &&
          dateCondition
        );
      });
  }
  const pagesCount = Math.ceil(globalFiltering(calls).length / CALL_PER_PAGE);

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
          <button
            onClick={() => {
              setSearch({
                date: "",
                query: "",
                customer: "",
                employee: "",
              });
            }}
          >
            Clear
          </button>
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
                    {search.date == option && <BiCheck color="green" />}
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
                    onChange={(e) => setEmplyeeInput(e.target.value)}
                  />
                </li>
                {employeeNames
                  ?.filter((em) =>
                    em.toLowerCase().includes(employeeInput.toLowerCase())
                  )
                  ?.map((e) => (
                    <li
                      key={e}
                      onClick={() => {
                        handleOpenOption("employee");
                        setSearch((prev) => ({
                          ...prev,
                          employee: e,
                        }));
                      }}
                    >
                      {search.employee == e && <BiCheck color="green" />}
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
                    onChange={(e) => setCustomerInput(e.target.value)}
                  />
                </li>
                {customerNames
                  ?.filter((cu) =>
                    cu.toLowerCase().includes(customerInput.toLowerCase())
                  )
                  ?.map((c) => (
                    <li
                      key={c}
                      onClick={() => {
                        setSearch((prev) => ({
                          ...prev,
                          customer: c,
                        }));
                        handleOpenOption("customer");
                      }}
                    >
                      {search.customer == c && <BiCheck color="green" />}
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
        {globalFiltering(calls).length ? (
          globalFiltering(calls).map((call) => {
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
