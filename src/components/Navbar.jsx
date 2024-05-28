import Logo from "../assets/logo.png";
function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 border h-16">
      <img src={Logo} alt="monta logo" className="h-14" />
    </nav>
  );
}

export default Navbar;
