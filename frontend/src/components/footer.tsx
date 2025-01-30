const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow-[0px_-5px_10px_0_rgb(0_0_0_/_0.05)]  dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="/" className="flex items-center justify-center mb-4 sm:mb-0">
            <img src="/QGCico.ico" className="h-8" alt="QUMS Logo" />
            <span className="self-center text-2xl mx-2 font-bold font-josefins whitespace-nowrap dark:text-white">
              QUMS*
            </span>
          </a>
          <ul className="flex flex-wrap items-center justify-center my-6 md:my-0 mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a
                href="https://github.com/24kaushik/qums?tab=readme-ov-file#quantum-university-management-system-qums"
                target="_blank"
                className="hover:underline me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="https://github.com/24kaushik/qums?tab=MIT-1-ov-file"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                Licensing
              </a>
            </li>
            <li>
              <a
                href="https://github.com/24kaushik/qums"
                className="hover:underline me-4 md:me-6"
                target="_blank"
              >
                Source Code
              </a>
            </li>
            <li>
              <a
                href="https://kaushiksarkar.me/"
                target="_blank"
                className="hover:underline"
              >
                Developer
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 text-center dark:text-gray-400">
          *This is a custom made ERP (frontend) and is not affiliated with
          Quantum University.
          <div className="my-1">
            100% safe and secure. Open source on{" "}
            <a
              href="https://github.com/24kaushik/qums"
              className="text-blue-600 underline"
            >
              Github
            </a>
            .
          </div>
        </span>
        <span className="block text-sm my-3 text-gray-500 text-center dark:text-gray-400">
          © {new Date().getFullYear()} QUMS* . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
