import ErrorBoundary from "components/ErrorBoundary";
import UpdateDialog from "components/UpdateDialog";
import { useCallback, useEffect, useState } from "react";
import RiddleTabs from "./components/RiddleTabs";

const App = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleEvent = useCallback(() => {
    setShowUpdateModal(true);
  }, []);

  useEffect(() => {
    document.addEventListener("new-version-available", handleEvent);

    return () => {
      document.removeEventListener("new-version-available", handleEvent);
    };
  }, [handleEvent]);

  return (
    <ErrorBoundary>
      {showUpdateModal && <UpdateDialog handleClose={() => setShowUpdateModal(false)} />}
      <RiddleTabs />
    </ErrorBoundary>
  );
};

export default App;
