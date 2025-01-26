import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [formRefreshToken, setFormRefreshToken] = useState("");
  const [loading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // FormRefreshToken
  useEffect(() => {
    // Getting cookies and formRefreshToken
    (async () => {
      const data = await fetch("http://localhost:8080/api/", {
        method: "GET",
        credentials: "include",
      });
      const text = await data.text();

      // Using DOMParser to parse the response
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const token = (
        doc.querySelector(
          'input[name="__RequestVerificationToken"]'
        ) as HTMLInputElement
      )?.value;

      if (token) {
        setFormRefreshToken(token);
        // console.log(token)
      } else {
        console.error("Form refresh token not found");
      }
    })();
  }, []);

  // Captcha
  const getCaptcha = async (
    endpoint: "showcaptchaImage" | "showrefreshcaptchaImage"
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/Account/${endpoint}`,
        {
          method: "POST",
          credentials: "include", // Ensures cookies are sent with the request
        }
      );
      const arrayBuffer = await response.json();
      var arr = new Uint8Array(arrayBuffer);
      var blob = new Blob([arr.buffer]);
      var reader = new FileReader();
      reader.onload = function (e) {
        imgRef.current!.src = e.target!.result as string;
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error fetching captcha image:", error);
    }
  };
  useEffect(() => {
    if(formRefreshToken){
      getCaptcha("showcaptchaImage");
    }
  }, [formRefreshToken]);

  const refreshCaptcha = () => {
    getCaptcha("showrefreshcaptchaImage");
  };

  // Form submission (Login Handling)
  interface FormData {
    UserName: string;
    Password: string;
    captcha: string;
  }

  const [data, setData] = useState<FormData>({
    UserName: "",
    Password: "",
    captcha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(data);
    const formData = new FormData();
    formData.append("__RequestVerificationToken", formRefreshToken);
    formData.append("UserName", data.UserName);
    formData.append("Password", data.Password);
    formData.append("captcha", data.captcha);
    formData.append("hdnMsg", "QGC");
    formData.append("checkOnline", "0");

    try {
      const response = await fetch("http://localhost:8080/api/", {
        method: "POST",
        body: formData,
        credentials: "include",
        redirect: "manual",
      });
      const text = await response.text();
      if (text.includes("Captcha does not match")) {
        alert("Captcha does not match");
        return;
      }
      if (text.includes("The user name or password provided is incorrect.")) {
        alert("The user name or password provided is incorrect.");
        return;
      }
      // TESTING!!, REMOVE LATER
      if (response.type === "opaqueredirect" && response.status == 0) {
        fetch("http://localhost:8080/api/Account/GetStudentDetail", {
          method: "POST",
          credentials: "include",
        })
          .then((response) => response.json())
          .then((data) => {
            return data;
          })
          .then((data) => {
            console.log(JSON.parse(data.state));
          });
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold">Login to your ERP</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your QId and Password to login to your ERP
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="QId">QId</Label>
          <Input
            id="QId"
            name="UserName"
            type="number"
            placeholder="eg. 2403XXXX"
            required
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="https://qums.quantumuniversity.edu.in/Account/ForgotPassword"
              target="_blank"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            name="Password"
            type="password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="captcha">Captcha</Label>
          <div className="flex">
            <img className="h-10 w-4/5" ref={imgRef} />
            <button
              className="h-10 w-1/5 flex items-center justify-center bg-gray-200"
              type="button"
              onClick={refreshCaptcha}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#6b7280" d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/></svg>
            </button>
          </div>
          <Input
            id="captcha"
            name="captcha"
            type="text"
            placeholder="Enter captcha here..."
            required
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <div className="h-6 w-6 border-x-4 border-y-4 animate-spin border-y-transparent rounded-full"></div>
          ) : (
            "Login"
          )}
        </Button>
      </div>
      <div className="text-center text-sm text-gray-600">
        *This is a custom made ERP (frontend) and is not affiliated with Quantum
        University.
        <br />
        100% safe and secure. Open source on{" "}
        <a
          href="https://github.com/24kaushik/qums"
          className="text-blue-600 underline"
          >
          Github
        </a>
        .
          <br />
          <br />
          <span className="text-xs">Only student login is supported. Faculty and Admins, please use official ERP.</span>
      </div>
    </form>
  );
}
