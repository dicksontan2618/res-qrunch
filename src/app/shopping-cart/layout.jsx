export default function Layout({ children }) {
  return (
    <main>
        <div className="hidden md:flex md:justify-center md:items-center md:w-screen md:h-screen ">
            <h1>Application only available in mobile view!</h1>
        </div>
        <div className="block md:hidden">
            {children}
        </div>
    </main>
  );
}