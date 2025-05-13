const Header = ({ toggleTheme, currentTheme }) => (
  <header className="flex justify-between items-center p-4 bg-white shadow">
    <div className="text-2xl font-bold text-red-600">LOGO</div>
    <div className="flex space-x-4">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        {currentTheme === "light" ? "Light/Dark" : "Dark/Light"}
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
        EN/VN
      </button>
    </div>
  </header>
);

export default Header;