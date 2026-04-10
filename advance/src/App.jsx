import MainPage from "./Pages/MainPage";
import HomeBg from "./assets/HomeBg.jpg";

function App() {
  return (
    <div
      style={{ backgroundImage: `url(${HomeBg})` }}
      className="min-h-screen w-full text-white font-sans absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10 overflow-x-hidden"
    >
      {/* Background */}

      {/* Content */}
      <div className="relative z-10 w-full min-h-screen">
        <MainPage />
      </div>
    </div>
  );
}

export default App;
