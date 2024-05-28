import Logo from "../assets/logo.png";
function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 border">
      <img src={Logo} alt="Dell Logo" className="h-14" />
    </nav>
  );
}

export default Navbar;
