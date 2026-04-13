import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Overview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const dark = document.documentElement.classList.contains("dark");
  const tickColor = dark ? "#9ca3af" : "#6B7280";
  const gridColor = dark ? "#374151" : "#e5e7eb";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /*  FETCH  */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data } = await supabase.from("transactions").select("*");
      let incomeTotal = 0, expenseTotal = 0;
      const monthly = {};
      const maxMonth = year === currentYear ? currentMonth : 12;
      for (let i = 1; i <= maxMonth; i++) monthly[i] = { income: 0, expense: 0 };

      data.forEach((t) => {
        const month = new Date(t.date).getMonth() + 1;
        const tYear = new Date(t.date).getFullYear();
        if (tYear === year && month <= maxMonth) {
          if (t.type === "income") { monthly[month].income += Number(t.amount); incomeTotal += Number(t.amount); }
          else { monthly[month].expense += Number(t.amount); expenseTotal += Number(t.amount); }
        }
      });

      setChartData(Object.keys(monthly).map((m) => ({ month: m, income: monthly[m].income, expense: monthly[m].expense })));
      setSummary({ income: incomeTotal, expense: expenseTotal });
      setLoading(false);
    }
    fetchData();
  }, [year]);

  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  /*  UI  */
  return (
    <div
      className="min-h-screen flex flex-col items-center gap-5 font-lilita pb-10
                bg-[radial-gradient(circle_at_center,_#E9F7FF_0%,_#CDEBFF_60%,_#B8E0FF_100%)]
                dark:bg-[radial-gradient(circle_at_center,_#111827_0%,_#111827_100%)]"
    >
      {/* Header */}
      <div className="w-full px-6 pt-6 flex justify-between items-center">
        {/* LEFT: Back */}
        <button
          onClick={() => navigate("/home")}
          className="text-[#295F8D] dark:text-gray-100 text-[20px] flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to today
        </button>

        {/* RIGHT: Year */}
        <div className="flex gap-2 items-center">
          <span className="text-[#295F8D] dark:text-gray-400 text-[20px]">Year:</span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-3 py-1 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-100 dark:border dark:border-gray-600 text-[#295F8D]"
          >
            {Array.from({ length: currentYear - 2020 + 1 }, (_, i) => 2020 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-[#295F8D] dark:text-gray-100 text-[45px] font-lilita">Overview</h1>

      {/* TOTAL INCOME */}
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 w-[90%] max-w-md rounded-[30px] p-2 shadow-figma text-center">
        <p className="text-[#295F8D] dark:text-gray-400 text-[20px]">TOTAL INCOME</p>
        <p className="text-[#37AD59] text-[40px]">+{summary.income.toLocaleString()} THB</p>
      </div>

      {/* TOTAL EXPENSE */}
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 w-[90%] max-w-md rounded-[30px] p-2 shadow-figma text-center">
        <p className="text-[#295F8D] dark:text-gray-400 text-[20px]">TOTAL EXPENSE</p>
        <p className="text-[#E04847] text-[40px]">-{summary.expense.toLocaleString()} THB</p>
      </div>

      {/* CHART */}
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 w-[90%] max-w-md rounded-[30px] p-6 shadow-figma">
        <h3 className="text-center text-[#295F8D] dark:text-gray-100 text-[20px] mb-4">Monthly Overview</h3>

        {loading ? (
          <div className="text-center py-10 animate-pulse text-gray-400">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} barCategoryGap="25%" margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="month"
                tickFormatter={(m) => monthNames[m - 1]}
                interval={0}
                padding={{ left: 10, right: 10 }}
                angle={isMobile ? -30 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 60 : 30}
                tick={{ fontSize: isMobile ? 10 : 12, fill: tickColor }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
              />
              <YAxis
                width={50}
                tick={{ fill: tickColor }}
                axisLine={{ stroke: gridColor }}
                tickLine={{ stroke: gridColor }}
                tickFormatter={(v) => v >= 1000000 ? v / 1000000 + "M" : v >= 1000 ? v / 1000 + "k" : v}
              />
              <Tooltip
                formatter={(value) => value.toLocaleString()}
                labelFormatter={(label) => monthNames[label - 1]}
                contentStyle={{
                  background: dark ? "#1f2937" : "#ffffff",
                  border: `1px solid ${dark ? "#374151" : "#D1E4F5"}`,
                  borderRadius: "12px",
                  color: dark ? "#f9fafb" : "#1a1a1a",
                }}
                cursor={{ fill: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
                itemSorter={(item) => item.dataKey === "income" ? -1 : 1}
              />
              <Bar dataKey="income" fill="#37AD59" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out" />
              <Bar dataKey="expense" fill="#E04847" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#37AD59] rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E04847] rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">Expense</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
