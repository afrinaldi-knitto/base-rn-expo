import { registerRootComponent } from "expo";

import App from "./src/App";
import DataWedgeIntents from "react-native-datawedge-intents";

DataWedgeIntents.registerBroadcastReceiver({
  filterActions: [
    "com.zebra.dwintents.ACTION",
    "com.symbol.datawedge.api.RESULT_ACTION",
  ],
  filterCategories: ["android.intent.category.DEFAULT"],
});
registerRootComponent(App);
