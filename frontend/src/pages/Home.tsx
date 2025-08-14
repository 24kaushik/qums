import { useEffect, useState } from "react";
import QULong from "../assets/qu_long.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Combobox } from "@/components/combo-box";
import Loader from "@/components/loader";
import { useReg } from "@/context/RegContext";
import { Button } from "@/components/ui/button";
import fetchFunction from "@/utils/fetchFunction";

const Home = () => {
  const [heroProps, setHeroProps] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setRegId } = useReg();

  // Check if user is logged in.
  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data, status } = await fetchFunction(
          "/api/Account/GetStudentDetail",
          "POST"
        );
        if (status !== 200 || !data || data.state === "[]") {
          throw new Error("Failed to fetch student details.");
        }
        const state = JSON.parse(data.state)[0];
        setHeroProps(state);
        setRegId(state.RegID);
        setIsLoggedIn(true);
      };
      fetchData();
    } catch (error) {
      alert("You are not logged in. Please login to continue.");
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className="pt-14 bg-gray-50">
          {/* Banner and profile pic */}
          <Hero data={heroProps} />

          {/* Attendance CGPA Fee */}
          <BasicInfo />

          <div className="flex flex-wrap">
            {/* Today's Class Info */}
            <ClassInfo />

            {/* Monthly Classes Info */}
            <MonthlyClassInfo />

            {/* Semester wise attendance */}
            <SemWiseAtt data={heroProps} />

            {/* Exam Result */}
            <ExamResult />

            {/*Circulars*/}
            <Circulars />

            {/* This Erp Notices */}
            <Notices />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

const Hero = ({ data }: { data: any }) => {
  return (
    <div className="pb-2 mb-4 shadow-md bg-white">
      <div className="bg-violet-400 aspect-[1546/423] sm:aspect-[1855/423] md:aspect-[3500/423] border-b-4 border-white">
        <img className="h-full w-full object-cover" src={QULong} alt="" />
      </div>
      <div className="h-14 relative">
        <img
          src={`data:image/png;base64,${data.Photo}`}
          alt="avatar"
          className="h-[180%] aspect-square shadow-lg rounded-full border-4 border-white z-10 absolute bottom-2 left-1/2 -translate-x-1/2 scale-125"
        />
      </div>
      <div className="relative z-10 mt-4">
        <h1 className="text-center leading-6 font-josefins text-3xl md:text-4xl -mb-1 ">
          {data.StudentName}
        </h1>
        <h4 className="text-center text-gray-600 mt-1">
          Q.Id: {data.StudentID}&nbsp;&nbsp; &#8226; &nbsp;&nbsp; Roll. No:{" "}
          {data.PRollNo}
        </h4>
        <div className="text-center text-gray-600 my-1">
          {data.Course}
          <br />
          {data.Branch}
        </div>
        <div className="text-center text-gray-600">
          <span>Semester: {data.YearSem}</span>
          &nbsp;&nbsp; &#8226; &nbsp;&nbsp;
          <span>Section: {data.Section?.toUpperCase()?.replace("SECTION", "").replace("-", "").trim()}</span>
          &nbsp;&nbsp; &#8226; &nbsp;&nbsp;
          <span>Set: {data.SetAssign}</span>
        </div>
      </div>
    </div>
  );
};

const BasicInfo = () => {
  const { regId } = useReg();
  const [basicData, setBasicData] = useState<{
    attendance: string | undefined;
    cgpa: string | undefined;
    dues: string | undefined;
    paid: string | undefined;
  }>({
    attendance: undefined,
    cgpa: undefined,
    dues: undefined,
    paid: undefined,
  });

  useEffect(() => {
    try {
      const fetchBasicInfo = async () => {
        const formData = new FormData();
        formData.append("RegID", `${regId}`);
        const { data, status } = await fetchFunction(
          "/api/Web_StudentAcademic/GetStudentTileData",
          "POST",
          formData
        );
        if (status === 200 && data.state !== "[]") {
          const state = JSON.parse(data.state)[0];
          setBasicData({
            attendance: state.AttendPer,
            cgpa: state.CGPA,
            dues: state.DueAmount,
            paid: state.CreditAmount,
          });
        }
      };

      fetchBasicInfo();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex flex-wrap px-3 text-center">
      <div className="h-28 my-1 shadow-md bg-white mr-1 w-[calc(50%-0.25rem)] border-t-4 border-green-500 md:w-[calc(25%-0.25rem)]">
        <div className="text-xl mt-2 font-josefins font-semibold">
          Attendance (%)
        </div>
        <div className="mt-3 text-3xl">{basicData.attendance}</div>
      </div>
      <div className="h-28 my-1 shadow-md bg-white ml-1 w-[calc(50%-0.25rem)] border-t-4 border-purple-500 md:mr-1 md:w-[calc(25%-0.25rem)]">
        <div className="text-xl mt-2 font-josefins font-semibold">CGPA</div>
        <div className="mt-3 text-3xl">{basicData.cgpa}/10</div>
      </div>
      <div className="h-28 my-1 shadow-md bg-white w-full border-t-4 border-indigo-500 md:w-[calc(50%-0.50rem)] md:ml-1">
        <div className="text-xl mt-2 font-josefins font-semibold">
          FEE (&#8377;) (Total / <span className="text-green-600">Paid</span> /{" "}
          <span className="text-red-500">To Pay</span>)
        </div>
        <div className="mt-3 text-3xl">
          {basicData.dues} /{" "}
          <span className="text-green-600">{basicData.paid}</span> /{" "}
          <span className="text-red-500">
            {basicData.dues && basicData.paid
              ? +basicData.dues - +basicData.paid
              : 0}
          </span>
        </div>
      </div>
    </div>
  );
};

const ClassInfo = () => {
  const invoices = [
    {
      time: "9:30-11:25",
      class: "Data Structure & Algorithm",
      teacher: "Dr. Rakesh Kumar",
      attend: "P",
    },
    {
      time: "11:30-1:25",
      class: "Computer Networks",
      teacher: "Dr. Rakesh Kumar",
      attend: "A",
    },
    {
      time: "2:00-3:55",
      class: "Data Structure & Algorithm",
      teacher: "Dr. Rakesh Kumar",
      attend: "P",
    },
    {
      time: "4:00-5:55",
      class: "Computer Networks",
      teacher: "Dr. Rakesh Kumar",
      attend: "N.M.",
    },
    {
      time: "6:00-7:55",
      class: "Data Structure & Algorithm",
      teacher: "Dr. Rakesh Kumar",
      attend: "A",
    },
  ];

  return (
    <div className="text-center m-3 md:ml-3 md:mr-0 shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-.75rem)]">
      <h4 className="text-2xl font-josefins py-2 font-semibold">
        Today's Class schedule (Demo data)
      </h4>

      <div className="mx-10 flex flex-wrap justify-between text-sm">
        <div className="my-2 flex items-center">
          <div className="bg-green-300 h-4 w-8 border border-black"></div>
          <div>&nbsp;&nbsp;- Present</div>
        </div>
        <div className="my-2 flex items-center">
          <div className="bg-red-300 h-4 w-8 border border-black"></div>
          <div>&nbsp;&nbsp;- Absent</div>
        </div>
        <div className="my-2 flex items-center">
          <div className=" h-4 w-8 border border-black"></div>
          <div>&nbsp;&nbsp;- Not Mentioned</div>
        </div>
      </div>

      <div className="my-2 mx-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Time</TableHead>
              <TableHead className="text-center">Subject</TableHead>
              <TableHead className="text-center">Teacher</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, i) => (
              <TableRow
                key={i}
                className={
                  invoice.attend == "P"
                    ? "bg-green-300"
                    : invoice.attend == "A"
                    ? "bg-red-300"
                    : ""
                }
              >
                <TableCell className="font-medium">{invoice.time}</TableCell>
                <TableCell>{invoice.class}</TableCell>
                <TableCell>{invoice.teacher}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const MonthlyClassInfo = () => {
  const currentMonth = String(new Date().getMonth() + 1);
  const [month, setMonth] = useState(currentMonth);
  const { regId } = useReg();
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [col, setCol] = useState<string[]>([]);

  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  useEffect(() => {
    if (month) {
      try {
        const fetchMonthlyAttendance = async () => {
          const formData = new FormData();
          formData.append("RegID", `${regId}`);
          formData.append("Month", month);

          const { data, status } = await fetchFunction(
            "/api/Web_StudentAcademic/GetMonthRegister",
            "POST",
            formData
          );

          if (status === 200 && data.state !== "[]") {
            const parsedData = JSON.parse(data.state);
            setAttendanceData(parsedData);
            setCol(data.col?.split(",") || []);
          }
        };
        fetchMonthlyAttendance();
      } catch (error) {
        console.error(error);
      }
    }
  }, [month]);

  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)]">
      <h4 className="text-2xl font-josefins py-2 font-semibold">
        Monthly Class Attendance
      </h4>
      <Combobox
        className="mb-5"
        setSelected={setMonth}
        listData={months}
        placeholder={currentMonth}
      />
      <div className="my-2 mx-3 overflow-auto">
        <Table className="max-h-96">
          <TableHeader>
            <TableRow>
              {col.map((e) => (
                <TableHead
                  key={e}
                  className="text-center border-r border-b text-xs md:text-sm"
                >
                  {e}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((row, i) => (
              <TableRow key={i} className="hover:bg-gray-100">
                {col.map((e) => (
                  <TableCell
                    key={e}
                    className={`border-r border-b whitespace-nowrap px-1 text-xs md:text-sm ${
                      row[e] == "A" || row[e] == "A,A"
                        ? "bg-red-300"
                        : row[e] == "P" || row[e] == "P,P"
                        ? "bg-green-300"
                        : ""
                    }`}
                  >
                    {row[e]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const SemWiseAtt = ({ data }: { data: any }) => {
  const [semData, setSemData] = useState<any[]>([]);
  const [sems, setSems] = useState<{ value: string; label: string }[]>([]);
  const [sem, setSem] = useState(data.YearSem as string);
  const { regId } = useReg();

  useEffect(() => {
    if (data.YearSem) {
      for (let i = 1; i <= data.YearSem; i++) {
        setSems((prev) => [...prev, { value: String(i), label: String(i) }]);
      }
    }
  }, [data]);
  // Did all that shit to access previous sems. Worked for a while then they deleted all previous sem data. All that effort in drain ;-;

  useEffect(() => {
    if (sem) {
      try {
        const fetchSemData = async () => {
          const formData = new FormData();
          formData.append("RegID", `${regId}`);
          formData.append("YearSem", sem);

          const { data, status } = await fetchFunction(
            "/api/Web_StudentAcademic/GetYearSemWiseAttendance",
            "POST",
            formData
          );

          if (status === 200 && data.state !== "[]") {
            const attData = JSON.parse(data.data);
            // Stick to a convention bruh. Who developed this fuckass ERP? Cyborg my ass.
            // Sending the data sometimes in "state" sometimes in "data", sometimes some randomass key.
            setSemData(attData);
          }
        };
        fetchSemData();
      } catch (error) {
        console.error(error);
      }
    }
  }, [sem]);

  return (
    <div className="text-center m-3 md:ml-3 md:mr-0 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-.75rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">
        Semester wise Attendance
      </h4>
      <Combobox
        className="mb-2"
        setSelected={setSem}
        listData={sems}
        placeholder={sem}
      />

      <div className="mx-10 flex flex-wrap justify-evenly text-sm">
        <div className="my-2 flex items-center">
          <div className="bg-red-300 h-4 w-8 border border-black"></div>
          <div>&nbsp;&nbsp;- Below 75%</div>
        </div>
      </div>

      <div className="my-2 mx-3">
        <Table className="max-h-96">
          <TableHeader>
            <TableRow className="text-xs md:text-sm">
              <TableHead className="text-center border-r border-b">
                Code
              </TableHead>
              <TableHead className="text-center border-r border-b">
                Subject
              </TableHead>
              <TableHead className="text-center border-r">Percentage</TableHead>
              <TableHead className="text-center border-r border-b">
                Total/Present/Absent
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semData.map((row, i) => (
              <TableRow
                key={i}
                className={`${
                  row.Percentage < 75 ? "bg-red-300" : ""
                } text-xs md:text-sm`}
              >
                <TableCell className="font-semibold border-r border-b">
                  {row.SubjectCode}
                </TableCell>
                <TableCell className="border-r border-b">
                  {row.Subject}
                </TableCell>
                <TableCell className="border-r border-b">
                  {row.Percentage}
                </TableCell>
                <TableCell className="border-r border-b">
                  {row.TotalLecture} / {row.TotalPresent} / {row.TotalAbsent}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ExamResult = () => {
  const [examResult, setExamResult] = useState<object[]>([]);
  const { regId } = useReg();

  useEffect(() => {
    try {
      const fetchExamResult = async () => {
        const formData = new FormData();
        formData.append("RegId", `${regId}`);

        const { data, status } = await fetchFunction(
          "/api/Web_StudentAcademic/GetStudentExamSummary",
          "POST",
          formData
        );
        if (status === 200 && data.ExamSummary !== "[]") {
          const result = JSON.parse(data.ExamSummary);
          setExamResult(result);
        }
      };
      fetchExamResult();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">Exam Result</h4>
      <div className="my-2 mb-5 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-x">Semester</TableHead>
              <TableHead className="text-center border-x">SGPA</TableHead>
              <TableHead className="text-center border-x">Topper</TableHead>
              <TableHead className="text-center border-x">Average</TableHead>
              <TableHead className="text-center border-x">
                Back Papers
              </TableHead>
              <TableHead className="text-center border-x">
                View Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {examResult.map((row: any, i: number) => (
              <TableRow key={i}>
                <TableCell className="font-medium border-x border-b">
                  {row.YearSem}
                </TableCell>
                <TableCell className=" border-x border-b">{row.SGPA}</TableCell>
                <TableCell className=" border-x border-b">
                  {row.Topper}
                </TableCell>
                <TableCell className=" border-x border-b">{row.Avrg}</TableCell>
                <TableCell className=" border-x border-b">
                  {row.TotalBack}
                </TableCell>
                <TableCell className=" border-x border-b text-blue-500 underline">
                  View
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Circulars = () => {
  const [circulars, setCirculars] = useState<object[]>([]);

  useEffect(() => {
    try {
      const fetchCirculars = async () => {
        const { data, status } = await fetchFunction(
          "/api/Web_Teaching/GetCircularDetails",
          "POST"
        );
        if (status === 200 && data.state !== "[]") {
          const state = JSON.parse(data.state);
          setCirculars(state.slice(0, 5)); // Limit to 5 circulars
          // WHY ARE THEY RETURNING ALL THE CIRCULARS?? Theres like a thousand fucking circulars in the response. Such a waste of bandwidth and processing power. idiots.
        }
      };
      fetchCirculars();
    } catch (error) {
      console.error(error);
    }
  }, []);

  //TODO: Add Hyperlinks to circulars and take them to pdf view page.

  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">Circulars</h4>
      <div className="my-2 mb-5 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-x border-b">
                Latest Circulars
              </TableHead>
              <TableHead className="text-center border-x border-b">
                Date
              </TableHead>
              <TableHead className="text-center border-x border-b">
                By
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {circulars.map((circular: any, i) => (
              <TableRow key={i}>
                <TableCell className="min-w-[16rem] text-left border-b border-x text-blue-600">
                  {circular.Subject}
                </TableCell>
                <TableCell className=" border-b border-x">
                  {circular.DateFrom}
                </TableCell>
                <TableCell className=" border-b border-x text-xs">
                  {circular.EmployeeName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button className="mb-5">View all</Button>
    </div>
  );
};

const Notices = () => {
  // TODO: Gotta make this dynamic.
  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">
        This Erp's Notices
      </h4>
      <div className="my-2 mb-5 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-x">Notices</TableHead>
              <TableHead className="text-center border-x">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="min-w-[16rem] text-left border-x border-b">
                The ERP is still under development. Some features may not work
                as expected.
              </TableCell>
              <TableCell className="border-x border-b">09/02/2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
