import Cassa from "./components/Cassa";
import Header from "./components/Header";
import Kosar from "./components/Kosar";
import Meals from "./components/Meals";
import { KosarContextProvider } from './store/KosarContext.jsx';
import { ModalContextProvider } from "./store/modalContext";

function App() {
  return (
    <ModalContextProvider>
      <KosarContextProvider>
        <Header />
        <Meals />
        <Kosar />
        <Cassa />
      </KosarContextProvider>
    </ModalContextProvider>
  );
}

export default App;
