const NavbarMenu = ({ item }) => {
  const baseClasses = "px-3 py-2 rounded-md text-sm font-medium";
  const activeClasses = "text-white bg-slate-900 hover:bg-slate-700";
  const inactiveClasses = "text-gray-300 hover:bg-slate-700 hover:text-white";

  return (
    <a
      key={item.name}
      href={item.href}
      className={`${baseClasses} ${
        item.current ? activeClasses : inactiveClasses
      }`}
    >
      {item.name}
    </a>
  );
};

export default NavbarMenu;
