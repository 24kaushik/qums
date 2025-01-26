const Navbar = () => {
  return (
    <div className="flex z-[999] fixed w-full h-14 bg-white bg-opacity-70 backdrop-blur-sm justify-between px-8 py-2.5 items-center shadow-md">
      <div className="flex justify-center gap-2 md:justify-start">
        <a href="/" className="flex justify-center gap-2 font-bold font-josefins text-xl">
          <div className="flex h-6 w-6 items-center justify-center rounded-md  text-primary-foreground">
            <img src="/QGCico.ico" alt="QUMS Logo" />
          </div>
          QUMS*
        </a>
      </div>
      <div className="h-10 w-10 rounded-full bg-slate-500">
        {/* Image Placeholder */}
      </div>
    </div>
  )
}

export default Navbar
