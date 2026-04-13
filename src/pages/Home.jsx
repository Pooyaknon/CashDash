import { useEffect, useState, useRef } from "react";
import { supabase } from "../services/supabaseClient";
import { authService } from "../services/authService";
import { useNavigate, useLocation } from "react-router-dom";
import { transactionService } from "../services/transactionService";
import { ChevronDown, Trash2, ArrowLeft, BarChart3 } from "lucide-react";

function Home() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");
  const [username, setUsername] = useState("Loading...");
  const navigate = useNavigate();
  const location = useLocation();
  const initialDate =
    location.state?.date ||
    new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [date, setDate] = useState(initialDate);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" });
  const isToday = date === today;
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const dateInputRef = useRef(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // 👈 บันทึก
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // 👈 บันทึก
    }
  }, [dark]);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("profiles").select("username").eq("id", user.id).single();
        if (data) setUsername(data.username);
      } else {
        navigate("/login");
      }
    }
    getProfile();
  }, [navigate]);

  useEffect(() => {
    async function fetchTransactions() {
      const data = await transactionService.getByDate(date);
      setTransactions(data);
      setBalance(transactionService.calculateBalance(data));
    }
    fetchTransactions();
  }, [date]);

  const handleLogout = async () => {
    await authService.signOut();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center gap-10 font-lilita pb-10
                bg-[radial-gradient(circle_at_center,_#E9F7FF_0%,_#CDEBFF_60%,_#B8E0FF_100%)]
                dark:bg-[radial-gradient(circle_at_center,_#111827_0%,_#111827_100%)]"
    >
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-[#E9F5FF] dark:bg-gray-800 dark:border-r dark:border-gray-700 shadow-2xl z-40
                    transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    transition-all duration-300 ease-in-out
                    flex flex-col items-center pt-20`}
      >
        {/* Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-5 right-5 text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100 transition"
        >
          ✕
        </button>

        {/* User Icon */}
        <div className="flex flex-col items-center mt-10">
          <div className="w-24 h-24 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center text-4xl border border-[#295F8D] dark:border-gray-600">
            👤
          </div>
          <h2 className="mt-6 text-[#295F8D] dark:text-gray-100 text-[35px] font-lilita uppercase">
            {username}
          </h2>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          className={`relative inline-flex items-center w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none
            ${dark ? "bg-[#295F8D]" : "bg-gray-300"}`}
        >
          <span className="absolute left-1.5 text-[13px] select-none">🌙</span>
          <span className="absolute right-1.5 text-[13px] select-none">☀️</span>
          <span
            className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300
              ${dark ? "translate-x-7" : "translate-x-0.5"}`}
          />
        </button>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mb-20 px-8 py-0.5 bg-[#E04847] text-white text-[37px] rounded-[14px] font-lilita shadow-figma hover:scale-105 transition"
        >
          LOG OUT
        </button>
      </div>

      {/* Header Section */}
      <div className="w-full px-4 md:px-10 lg:px-16 pt-8 flex justify-between items-center">
        {!isToday ? (
          <button
            onClick={() => setDate(today)}
            className="text-[#295F8D] dark:text-gray-100 text-[20px] flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to today
          </button>
        ) : (
          <button onClick={() => setSidebarOpen(true)} className="text-[#295F8D] dark:text-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* ด้านขวา */}
        <div className="flex items-center gap-3">
          {/* Overview Button */}
          <button
            onClick={() => navigate("/Overview")}
            className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-2 rounded-xl shadow-figma hover:scale-105 transition"
          >
            <BarChart3 size={20} className="text-[#295F8D] dark:text-gray-100" />
          </button>

          {/* Calendar */}
          <div className="relative">
            {/* ปุ่มแสดงผล */}
            <button
              onClick={() => dateInputRef.current?.showPicker()}
              className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 text-[#295F8D] dark:text-gray-100
                         px-4 py-1 rounded-xl font-lilita text-[20px]
                         shadow-figma hover:scale-105 transition flex items-center gap-2"
            >
              More Date
              <ChevronDown size={20} />
            </button>
            {/* input จริง (ซ่อน) */}
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="absolute inset-0 opacity-0 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Today's Balance Card */}
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-[40px] w-[90%] max-w-sm sm:max-w-md p-8 shadow-figma text-center">
        {isToday ? (
          <h3 className="text-[#295F8D] dark:text-[#FFFFFF] text-[25px] mb-2">Today's balance</h3>
        ) : (
          <>
            <h3 className="text-[#295F8D] dark:text-gray-400 text-[20px] mb-1">Balance on</h3>
            <h2 className="text-[#295F8D] dark:text-gray-100 text-[28px] mb-2">{formatDate(date)}</h2>
          </>
        )}
        <p className={`text-[55px] tracking-tighter ${balance >= 0 ? "text-[#37AD59]" : "text-[#E04847]"}`}>
          {balance.toLocaleString()} THB
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/add-income", { state: { date } })} // navigate to add-income
          className="px-5 py-1 bg-[#37AD59] text-white text-[25px] rounded-[14px] font-lilita shadow-figma hover:scale-105 transition flex items-center"
        >
          <span className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full mr-3">+</span>
          INCOME
        </button>
        <button
          onClick={() => navigate("/add-expense", { state: { date } })} // navigate to add-expense
          className="px-5 py-1 bg-[#E04847] text-white text-[25px] rounded-[14px] font-lilita shadow-figma hover:scale-105 transition flex items-center"
        >
          <span className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full mr-3">-</span>
          EXPENSE
        </button>
      </div>

      {/* Transaction List Container */}
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-[30px] w-[90%] max-w-sm sm:max-w-md p-6 shadow-figma space-y-5">
        {transactions.length === 0 && (
          <p className="text-center text-gray-400">No transactions</p>
        )}
        {transactions.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-gray-100 dark:border-gray-700 pb-2 text-[25px]"
          >
            <span className="text-black dark:text-gray-100">{item.description}</span>
            <div className="flex items-center gap-2">
              <span className={item.type === "income" ? "text-[#37AD59]" : "text-[#E04847]"}>
                {item.type === "income" ? "+" : "-"}
                {Number(item.amount).toLocaleString()} THB
              </span>
              <button
                onClick={() => setDeleteTarget(item)}
                className="px-2 py-1 bg-[#EEEEEE] dark:bg-gray-700 rounded-[14px] hover:scale-105 transition flex items-center"
              >
                <Trash2 size={25} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-[#F2F2F2] dark:bg-gray-800 dark:border dark:border-gray-700 rounded-[25px] p-6 w-[90%] max-w-sm shadow-figma text-center z-10">
            <h2 className="text-[35px] text-black dark:text-gray-100 mb-4">Delete Transaction?</h2>

            <div className={`rounded-2xl p-4 mb-4 bg-white dark:bg-gray-700 border-2 ${deleteTarget.type === "income" ? "border-[#37AD59]" : "border-[#E04847]"}`}>
              <div className={`text-[20px] font-bold mb-2 ${deleteTarget.type === "income" ? "text-[#37AD59]" : "text-[#E04847]"}`}>
                {deleteTarget.type === "income" ? "INCOME :" : "EXPENSE :"}
              </div>
              <div className="flex justify-between items-center text-[25px]">
                <span className="text-black dark:text-gray-100">{deleteTarget.description}</span>
                <span className={`font-bold ${deleteTarget.type === "income" ? "text-[#37AD59]" : "text-[#E04847]"}`}>
                  {deleteTarget.type === "income" ? "+" : "-"}
                  {Number(deleteTarget.amount).toLocaleString()} THB
                </span>
              </div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-6">Are you sure you want to delete this transaction?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-1 bg-white dark:bg-gray-800 dark:border dark:border-gray-600 dark:text-gray-100 rounded-xl text-[20px] shadow-figma hover:scale-105 transition"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await transactionService.deleteTransaction(deleteTarget.id);
                  const updated = await transactionService.getByDate(date);
                  setTransactions(updated);
                  setBalance(transactionService.calculateBalance(updated));
                  setDeleteTarget(null);
                }}
                className={`px-5 py-1 rounded-xl text-white text-[20px] shadow-figma hover:scale-105 transition ${deleteTarget.type === "income" ? "bg-[#37AD59]" : "bg-[#E04847]"}`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
