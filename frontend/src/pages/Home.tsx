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

const Home = () => {
  const [heroProps, setHeroProps] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_HOST}/api/Account/GetStudentDetail`,
          {
            credentials: "include",
            method: "POST",
          }
        );
        if (res.status === 200) {
          const data = await res.json();
          if (data.state == "[]") {
            throw new Error("Not authorized");
          }
          setIsLoggedIn(true);
          setHeroProps(JSON.parse(data.state)[0]);
        } else {
          throw new Error("Not authorized");
        }
      } catch (error) {
        alert("You are not logged in. Please login to continue.");
        window.location.href = "/";
      }
    })();
  }, []);

  return (
    <>
      {isLoggedIn && (
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
            <SemWiseAtt />

            {/* Exam Result */}
            <ExamResult />

            {/*Circulars*/}
            <Circulars />

            {/* This Erp Notices */}
            <Notices />
          </div>
        </div>
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
        <div className="text-center text-gray-600 ">
          {data.Course}
          <br />
          {data.Branch}
        </div>
        <div className="text-center text-gray-600 ">
          <span>Section: {data.Section}</span>
          &nbsp;&nbsp; &#8226; &nbsp;&nbsp;
          <span>Set: {data.SetAssign}</span>
        </div>
      </div>
    </div>
  );
};

const BasicInfo = () => {
  return (
    <div className="flex flex-wrap px-3 text-center">
      <div className="h-28 my-1 shadow-md bg-white mr-1 w-[calc(50%-0.25rem)] border-t-4 border-green-500 md:w-[calc(25%-0.25rem)]">
        <div className="text-xl mt-2 font-josefins font-semibold">
          Attendance (%)
        </div>
        <div className="mt-3 text-3xl">98.67</div>
      </div>
      <div className="h-28 my-1 shadow-md bg-white ml-1 w-[calc(50%-0.25rem)] border-t-4 border-purple-500 md:mr-1 md:w-[calc(25%-0.25rem)]">
        <div className="text-xl mt-2 font-josefins font-semibold">CGPA</div>
        <div className="mt-3 text-3xl">9.5/10</div>
      </div>
      <div className="h-28 my-1 shadow-md bg-white w-full border-t-4 border-indigo-500 md:w-[calc(50%-0.50rem)] md:ml-1">
        <div className="text-xl mt-2 font-josefins font-semibold">
          FEE (&#8377;) (Total / <span className="text-green-600">Paid</span> /{" "}
          <span className="text-red-500">To Pay</span>)
        </div>
        <div className="mt-3 text-3xl">
          147500 / <span className="text-green-600">147500</span> /{" "}
          <span className="text-red-500">0</span>
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
        Today's Class schedule
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
  const [month, setMonth] = useState("");

  useEffect(() => {
    if (month) {
      console.log(month);
    }
  }, [month]);

  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">
        Monthly Class schedule
      </h4>
      <Combobox className="mb-5" setSelected={setMonth} />
      <div className="my-2 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-r">Subject</TableHead>
              {[...Array(30)].map((_, i) => (
                <TableHead key={i} className="text-center border-x">
                  {i + 1}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                Data Structure & Algorithm
              </TableCell>
              <TableCell className="border">A</TableCell>
              <TableCell className="border">P</TableCell>
              <TableCell className="border">N.M.</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Data Structure & Algorithm
              </TableCell>
              <TableCell className="border">A</TableCell>
              <TableCell className="border">P</TableCell>
              <TableCell className="border">N.M.</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const SemWiseAtt = () => {
  return (
    <div className="text-center m-3 md:ml-3 md:mr-0 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-.75rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">
        Semester wise Attendance
      </h4>
      <div className="my-2 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-r">Code</TableHead>
              <TableHead className="text-center border-r">Subject</TableHead>
              <TableHead className="text-center border-r">Percentage</TableHead>
              <TableHead className="text-center border-r">
                Total/Present/Absent
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">CS31101</TableCell>
              <TableCell className="border">
                Basics of Computer and C Programming
              </TableCell>
              <TableCell className="border">90</TableCell>
              <TableCell className="border">100/90/10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CS31101</TableCell>
              <TableCell className="border">
                Basics of Computer and C Programming
              </TableCell>
              <TableCell className="border">90</TableCell>
              <TableCell className="border">100/90/10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CS31101</TableCell>
              <TableCell className="border">
                Basics of Computer and C Programming
              </TableCell>
              <TableCell className="border">90</TableCell>
              <TableCell className="border">100/90/10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CS31101</TableCell>
              <TableCell className="border">
                Basics of Computer and C Programming
              </TableCell>
              <TableCell className="border">90</TableCell>
              <TableCell className="border">100/90/10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CS31101</TableCell>
              <TableCell className="border">
                Basics of Computer and C Programming
              </TableCell>
              <TableCell className="border">90</TableCell>
              <TableCell className="border">100/90/10</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const ExamResult = () => {
  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">Exam Result</h4>
      <div className="my-2 mb-5 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-r">Semester</TableHead>
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
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell className="border">8.97</TableCell>
              <TableCell className="border">9.87</TableCell>
              <TableCell className="border">7.89</TableCell>
              <TableCell className="border">0</TableCell>
              <TableCell className="border text-blue-500 underline">
                View
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">2</TableCell>
              <TableCell className="border">8.62</TableCell>
              <TableCell className="border">9.72</TableCell>
              <TableCell className="border">7.19</TableCell>
              <TableCell className="border">0</TableCell>
              <TableCell className="border text-blue-500 underline">
                View
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Circulars = () => {
  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">Circulars</h4>
      <div className="my-2 mb-5 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-r">Circular</TableHead>
              <TableHead className="text-center border-x">Date</TableHead>
              <TableHead className="text-center border-x">By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="min-w-[16rem] text-left">
                Notice for Students Regarding Poster Making, Essay Writing and
                Speech Competition on Constitution Day.
              </TableCell>
              <TableCell className="border">22/01/2025</TableCell>
              <TableCell className="border">Kaushik Sarkar</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="min-w-[16rem] text-left">
                Notice for Students Regarding Poster Making, Essay Writing and
                Speech Competition on Constitution Day.
              </TableCell>
              <TableCell className="border">22/01/2025</TableCell>
              <TableCell className="border">Kaushik Sarkar</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const Notices = () => {
  return (
    <div className="text-center m-3 md:ml-2 md:mr-3 w-[calc(100vw-1.5rem)] shadow-md bg-white border-t-4 border-sky-300 md:w-[calc(50%-1.25rem)] ">
      <h4 className="text-2xl font-josefins py-2 font-semibold">
        This Erp's Notices
      </h4>
      <div className="my-2 mb-5 mx-3 max-w-[100%]">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center border-r">Notices</TableHead>
              <TableHead className="text-center border-x">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="min-w-[16rem] text-left">
                Notice for Students Regarding Poster Making, Essay Writing and
                Speech Competition on Constitution Day.
              </TableCell>
              <TableCell className="border">22/01/2025</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="min-w-[16rem] text-left">
                Notice for Students Regarding Poster Making, Essay Writing and
                Speech Competition on Constitution Day.
              </TableCell>
              <TableCell className="border">22/01/2025</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
