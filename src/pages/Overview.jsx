import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import { ArrowLeft } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Overview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [chartData, setChartData] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  /*  FETCH  */
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { data } = await supabase.from("transactions").select("*");

      let incomeTotal = 0;
      let expenseTotal = 0;
      const monthly = {};

      const maxMonth = year === currentYear ? currentMonth : 12;

      for (let i = 1; i <= maxMonth; i++) {
        monthly[i] = { income: 0, expense: 0 };
      }

      data.forEach((t) => {
        const dateObj = new Date(t.date);
        const month = dateObj.getMonth() + 1;
        const transactionYear = dateObj.getFullYear();

        if (transactionYear === year && month <= maxMonth) {
          if (t.type === "income") {
            monthly[month].income += Number(t.amount);
            incomeTotal += Number(t.amount);
          } else {
            monthly[month].expense += Number(t.amount);
            expenseTotal += Number(t.amount);
          }
        }
      });

      const result = Object.keys(monthly).map((m) => ({
        month: m,
        income: monthly[m].income,
        expense: monthly[m].expense,
      }));

      setChartData(result);
      setSummary({
        income: incomeTotal,
        expense: expenseTotal,
      });

      setLoading(false);
    }

    fetchData();
  }, [year]);

  const monthNames = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  /*  UI  */
  return (
    <div
      className="min-h-screen flex flex-col items-center gap-5 font-lilita pb-10
                bg-[radial-gradient(circle_at_center,_#E9F7FF_0%,_#CDEBFF_60%,_#B8E0FF_100%)]"
    >
      {/* Header */}
      <div className="w-full px-6 pt-6 flex justify-between items-center">
        {/* LEFT: Back */}
        <button
          onClick={() => navigate("/home")}
          className="text-[#295F8D] text-[20px] flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to today
        </button>

        {/* RIGHT: Year */}
        <div className="flex gap-2 items-center">
          <span className="text-[#295F8D] text-[20px]">Year:</span>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="px-3 py-1 rounded-lg"
          >
            {Array.from(
              { length: currentYear - 2020 + 1 },
              (_, i) => 2020 + i,
            ).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-[#295F8D] text-[45px] font-lilita">Overview</h1>

      {/* TOTAL INCOME */}
      <div className="bg-[#ffffff] w-[90%] max-w-md rounded-[30px] p-2 shadow-figma text-center">
        <p className="text-[#295F8D] text-[20px]">TOTAL INCOME</p>
        <p className="text-[#37AD59] text-[40px]">
          +{summary.income.toLocaleString()} THB
        </p>
      </div>

      {/* TOTAL EXPENSE */}
      <div className="bg-[#ffffff] w-[90%] max-w-md rounded-[30px] p-2 shadow-figma text-center">
        <p className="text-[#295F8D] text-[20px]">TOTAL EXPENSE</p>
        <p className="text-[#E04847] text-[40px]">
          -{summary.expense.toLocaleString()} THB
        </p>
      </div>

      {/* CHART */}
      <div className="bg-[#ffffff] w-[90%] max-w-md rounded-[30px] p-6 shadow-figma">
        <h3 className="text-center text-[#295F8D] text-[20px] mb-4">
          Monthly Overview
        </h3>

        {loading ? (
          <div className="text-center py-10 animate-pulse">Loading...</div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              barCategoryGap="25%"
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                tickFormatter={(m) => monthNames[m - 1]}
                interval={0}
                padding={{ left: 10, right: 10 }}
                angle={isMobile ? -30 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 60 : 30}
                tick={{ fontSize: isMobile ? 10 : 12 }}
              />
              <YAxis
                width={50} 
                tickFormatter={(value) => {
                  if (value >= 1000000) return value / 1000000 + "M";
                  if (value >= 1000) return value / 1000 + "k";
                  return value;
                }}
              />
              <Tooltip
                formatter={(value) => value.toLocaleString()}
                labelFormatter={(label) => monthNames[label - 1]}
                itemSorter={(item) => {
                  return item.dataKey === "income" ? -1 : 1;
                }}
              />
              <Bar
                dataKey="income"
                fill="#37AD59"
                radius={[6, 6, 0, 0]}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Bar
                dataKey="expense"
                fill="#E04847"
                radius={[6, 6, 0, 0]}
                animationDuration={800}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        )}

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#37AD59] rounded-full"></div>
            <span>Income</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E04847] rounded-full"></div>
            <span>Expense</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
