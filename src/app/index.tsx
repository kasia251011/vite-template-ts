import { Provider } from "react-redux";
import { store } from "../redux/store";

import "dayjs/locale/pl";
import dayjs from "dayjs";
import Router from "@/router/Router";

dayjs.locale("pl");

const App = () => {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
