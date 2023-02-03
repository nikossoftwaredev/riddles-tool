import ErrorBoundary from "components/ErrorBoundary";
import RiddleTabs from "./components/RiddleTabs";

const App = () => (
  <ErrorBoundary>
    <RiddleTabs />
  </ErrorBoundary>
);

export default App;
