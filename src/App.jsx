import { GoHomeFill } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { IoAlert } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { FaShield } from "react-icons/fa6";
import { RiMapPin2Fill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { Link, Outlet, Route, Routes, useLocation } from "react-router";
import { useEffect, useMemo, useState } from "react";
import PayFlow_v1 from "./PayFlow";

//#region Icons
const icons = {
  home: <GoHomeFill />,
  dashboard: <MdOutlineDashboard />,
  history: <AiOutlineHistory />,
  scheduler: <RiCalendarScheduleLine />,
  bell: <FaBell />,
  clock: <FaClock />,
  check: <FaCheck />,
  search: <FaSearch />,
  edit: <TbEdit />,
  pause: <FaPause />,
  play: <FaPlay />,
  close: <IoMdClose />,
  plus: <FaPlus />,
  alert: <IoAlert />,
  star: <FaRegStar />,
  wallet: <FaWallet />,
  circleCheck: <FaRegCircleCheck />,
  bar: <FaBars />,
  shield: <FaShield />,
  mapPin: <RiMapPin2Fill />,
  phone: <FaPhoneAlt />,
  mail: <IoMail />,
  right: <FaArrowRight />,
  up: <FaArrowUp />,
};
//#endregion

//#region Logo
function Logo() {
  return (
    <div className="flex justify-center items-center text-white px-4 h-[60px] pointer-events-none select-none">
      <div id="logo" className="h-full">
        <img
          src="/logo.svg"
          alt="logo"
          className="h-full w-full object-contain object-center"
        />
      </div>
      <div id="content" className="flex flex-col items-start justify-center">
        <div id="title" className="font-(family-name:--font-display) font-bold">
          PayFlow
        </div>
        <div id="sub-title" className="text-[10px] text-gray-400 uppercase">
          smart scheduler
        </div>
      </div>
    </div>
  );
}

//#endregion

//#region Header
function Header() {
  class NavigationData {
    constructor(path, content, icon) {
      this.id = "nav-btn";
      this.path = path;
      this.innerHTML = content;
      this.icon = icon;
    }
    createElement(key, isTrue) {
      return (
        <Link key={key} to={this.path} replace>
          <button
            style={{
              borderColor: isTrue ? "var(--gold)" : "transparent",
              color: isTrue ? "#fff" : "#ddd",
              fontWeight: isTrue ? "600" : "",
              "--i": key,
            }}
            className="border-b-2 px-3 py-3 flex items-center justify-center capitalize gap-1 transition duration-200 hover:bg-[#ffffff24] cursor-pointer"
            id={this.id}
          >
            <span id="icon" className="text-[18px]">
              {this.icon}
            </span>
            <span id="content">{this.innerHTML}</span>
          </button>
        </Link>
      );
    }
  }
  const navItems = [
    { path: "/", label: "home", icon: icons.home },
    { path: "/dashboard", label: "dashboard", icon: icons.dashboard },
    { path: "/history", label: "history", icon: icons.history },
    { path: "/scheduler", label: "scheduler", icon: icons.scheduler },
  ];

  const [navElements, setNavElements] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const activeIndex = navItems.findIndex(
      (item) => item.path === location.pathname,
    );

    setNavElements(
      navItems.map((item, i) =>
        new NavigationData(item.path, item.label, item.icon).createElement(
          i,
          i === activeIndex,
        ),
      ),
    );
  }, [location.pathname]);

  return (
    <header className="flex items-center h-[70px] bg-(--g600) text-white">
      <Logo />
      <div
        id="navigation"
        className="border-l border-[#ffffff3a] h-full text-[12px] flex items-center gap-3 pl-5"
      >
        {navElements.map((el) => el)}
      </div>
    </header>
  );
}
//#endregion

//#region Footer
function Footer() {
  return <footer>Footer</footer>;
}
//#endregion

//#region Home
function Home() {
  //#region Hero Section
  function HeroSection() {
    function getTimeOfDay() {
      const now = new Date();
      const hour = now.getHours(); // 0-23

      if (hour >= 5 && hour < 12) {
        return "morning";
      } else if (hour >= 12 && hour < 18) {
        return "afternoon";
      } else {
        return "evening";
      }
    }

    function generateFinanceComment(due) {
      const positiveComments = [
        "Your finances are on track - nothing due this week, keep it up!",
        "Great job! No payments due, you're ahead of schedule.",
        "All payments for this week have been cleared. Financials look stable.",
        "Zero due payments - a stress-free week for your wallet!",
        "No outstanding payments this week. Well managed!",
      ];

      const neutralComments = [
        "You have a few payments due. Stay on top of them.",
        "Keep an eye on your upcoming payments this week.",
        "Some payments are scheduled - plan accordingly.",
      ];

      const negativeComments = [
        "You have overdue payments! Take action soon.",
        "Payments are pending. Consider reviewing your finances.",
      ];

      if (due === 0) {
        // Pick a random positive comment
        return positiveComments[
          Math.floor(Math.random() * positiveComments.length)
        ];
      } else if (due > 0 && due <= 3) {
        return neutralComments[
          Math.floor(Math.random() * neutralComments.length)
        ];
      } else {
        return negativeComments[
          Math.floor(Math.random() * negativeComments.length)
        ];
      }
    }

    const [heroSectionData] = useState({
      username: "Jews",
      currencyType: "$",
      scheduledAmount: 0,
      paidAmount: 0,
      activeSchedules: 0,
      duePaymentsCurrentWeek: 0,
    });

    const greeting = useMemo(() => `Good ${getTimeOfDay()}👋`, []);

    const financeComment = useMemo(
      () => generateFinanceComment(heroSectionData.duePaymentsCurrentWeek),
      [heroSectionData.duePaymentsCurrentWeek],
    );

    return (
      <div
        id="hero-section"
        className="border flex flex-col gap-2 rounded-[30px] p-10 text-[#ccccccd8] text-[13px]"
        style={{
          background:
            "linear-gradient(135deg,var(--g600) 0%,var(--g700) 60%,var(--g800) 100%)",
        }}
      >
        <p className="capitalize tracking-wide" style={{ "--i": "1" }}>
          {greeting}
        </p>
        <p
          className="font-(family-name:--font-display) text-[40px] text-white"
          style={{ "--i": "2" }}
        >
          Welcome back,{" "}
          <span id="user" className="text-(--g200)">
            {heroSectionData.username}
          </span>
        </p>
        <p style={{ "--i": "3" }}>
          {financeComment} {heroSectionData.duePaymentsCurrentWeek} payments due
          this week.
        </p>
        <div id="category-section" className="flex my-6" style={{ "--i": "4" }}>
          <div
            id="container"
            className="flex border-[#ffffff2a] border-r flex-col items-start justify-center mr-4 min-w-[200px]"
          >
            <div
              id="digit"
              className="text-white text-[30px] font-(family-name:--font-display)"
            >
              <span id="currency">{heroSectionData.currencyType}</span>
              {heroSectionData.scheduledAmount}
            </div>
            <div id="comment" className="text-[11px]">
              Scheduled This Month
            </div>
          </div>
          <div
            id="container"
            className="flex border-[#ffffff2a] flex-col items-start justify-center mr-4 border-r min-w-[200px]"
          >
            <div
              id="digit"
              className="text-white text-[30px] font-(family-name:--font-display)"
            >
              <span id="currency">{heroSectionData.currencyType}</span>
              {heroSectionData.paidAmount}
            </div>
            <div id="comment" className="text-[11px]">
              Paid So Far
            </div>
          </div>
          <div
            id="container"
            className="flex border-[#ffffff2a] flex-col items-start justify-center mr-4 min-w-[200px]"
          >
            <div
              id="digit"
              className="text-white text-[30px] font-(family-name:--font-display)"
            >
              {heroSectionData.activeSchedules}
            </div>
            <div id="comment" className="text-[11px]">
              Active Schedules
            </div>
          </div>
        </div>
        <div id="button-section" className="flex gap-4" style={{ "--i": "5" }}>
          <Link to={"/scheduler"}>
            <button className="border px-6 py-3 flex items-center justify-center gap-2 text-[13px] cursor-pointer bg-white text-(--g500) rounded-[10px] hover:bg-[#e2ffe2] hover:border-[#e2ffe2] transition duration-200">
              <span id="icon">{icons.plus}</span>New Schedule
            </button>
          </Link>
          <Link to={"/dashboard"}>
            <button className="border bg-[rgba(255,255,255,.09)] text-white rounded-[10px] border-[rgba(255,255,255,0.25)] px-4 py-3 flex items-center justify-center gap-2 text-[13px] cursor-pointer hover:bg-[rgba(255,255,255,0.2)] transition duration-200">
              View Dashboard<span id="icon">{icons.right}</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }
  //#endregion

  //#region Remainder
  function Remainder() {
    const [remainderData, setRemainderData] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showRemainder, setShowRemainder] = useState(true);

    const getRemainderLatest = async () => {
      try {
        const result = {
          "due-payment-name": "DSTV Subscription",
          "due-amount": 8500,
          "due-days-left": 2,
          "currency-type": "$",
          stat: "not empty",
        };
        if (result.stat.toLowerCase() == "empty") {
          setShowRemainder(false);
        }
        return result;
      } catch (err) {
        console.error("Error fetching remainder:", err);
        setError("Failed to load remainder data");
        return "";
      }
    };

    useEffect(() => {
      (async function () {
        const data = await getRemainderLatest();
        setRemainderData(data);
        setLoading(false);
        setPutRemainder(true);
      })();
    }, []);

    if (!showRemainder) {
      return <></>;
    }

    return (
      <div
        id="remainder-slip"
        style={{ "--i": 1 }}
        className={`flex rounded-[5px] gap-2 border px-10 py-4 text-[14px] text-[--remainder] ${!error ? " border-(--amber) bg-(--amber-lt) text-(--remainder)" : "bg-[#ff000060] border-red-500"}`}
      >
        <span id="title" className="font-bold">
          Remainder:
        </span>
        {loading ? (
          <span>Loading...</span>
        ) : error ? (
          <span>{error}</span>
        ) : (
          <span>
            <span id="payment-name">{remainderData["due-payment-name"]}</span>
            &nbsp;of&nbsp;
            <span id="payment-currency-type" className="font-bold">
              {remainderData["currency-type"]}
            </span>
            <span id="payment-amount">
              {parseInt(remainderData["due-amount"]).toLocaleString()}
            </span>
            &nbsp;is due in&nbsp;
            <span id="due-days-left">{remainderData["due-days-left"]}</span>
            &nbsp;days. Ensure sufficient wallet balance to avoid failed
            payments.
          </span>
        )}
      </div>
    );
  }
  //#endregion

  function OverViewContainer() {
    return <div className="border h-40"></div>;
  }

  return (
    <>
      <HeroSection />
      <Remainder />
      <OverViewContainer />
    </>
  );
}
//#endregion

//#region Dashboard
function Dashboard() {
  return <div>Dashboard</div>;
}
//#endregion

//#region History
function History() {
  return <div>History</div>;
}
//#endregion

//#region Scheduler
function Scheduler() {
  return <div>Scheduler</div>;
}
//#endregion

//#region Wrapper
function Wrapper() {
  return (
    <>
      <Header />
      <div className="max-w-(--max-width) m-auto py-10 px-10 flex flex-col gap-10 min-h-svh">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
//#endregion

//#region App
function App() {
  return (
    <Routes>
      <Route element={<Wrapper />}>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/prototype" element={<PayFlow_v1 />} />
      </Route>
    </Routes>
  );
}
//#endregion

export default App;
