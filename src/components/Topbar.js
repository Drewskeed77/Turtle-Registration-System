import logo from "../logo.jpg"

export default function Topbar({children}) {
    return (
      <div className="shrink-0">
        <nav className="w-full flex justify-between gap-8 py-4 px-8 items-center">
          <div className="nav-logo">
            <a href="./">
              <img className="flex-shrink-0" src={logo} alt="Site Logo" width={64} height={64} />
            </a>
          </div>
          {children}
        </nav>
        <hr></hr>
      </div>
    );
  }