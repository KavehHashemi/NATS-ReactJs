/* eslint-disable react-hooks/exhaustive-deps */
import SearchComponent from "./Components/SearchComponent";
import JetstreamsComponent from "./Components/JetstreamsComponent";
import FooterComponent from "./Components/FooterComponent";
import ErrorSnackBar from "./Components/ErrorSnackBar";
import FAB from "./Components/FAB";
import data from "./connectionconfig.json";
import { useDispatch } from "react-redux";
import { setUpConnection } from "./Store/streams";
const App = () => {
  const dispatch = useDispatch();
  dispatch(setUpConnection(data.serverUrl));

  return (
    <>
      <SearchComponent></SearchComponent>
      <JetstreamsComponent></JetstreamsComponent>
      <FooterComponent></FooterComponent>
      <FAB></FAB>
      <ErrorSnackBar></ErrorSnackBar>
    </>
  );
};

export default App;
