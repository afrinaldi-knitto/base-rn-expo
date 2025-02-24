import { Provider } from "react-redux";
import { store } from "./redux/store";
import RootNavigator from "./navigations/root-navigation";

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
