import DarkModeToggleButton from "@components/Buttons/DarkModeToggleButton";

const Header = () => {
  return (
    <header className="h-12 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-between px-4">
      <div className="font-mono font-semibold">Tab Maker</div>
      <DarkModeToggleButton />
    </header>
  );
};

export default Header;
