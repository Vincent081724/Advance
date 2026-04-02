import MainPage from "./Pages/MainPage";
import HomeBg from "./assets/HomeBg.jpg";

function App() {
  return (
    <div className="min-h-screen text-white font-sans relative bg-black">
      {/* Background (only lg and up) */}
      <div
        style={{ backgroundImage: `url(${HomeBg})` }}
        className="hidden lg:block absolute inset-0 bg-cover bg-center"
      ></div>

      {/* Content */}
      <div className="relative">
        <MainPage />
      </div>
    </div>
  );
}

export default App;
