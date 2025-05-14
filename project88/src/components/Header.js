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
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
  </header>
);

export default Header;