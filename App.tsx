import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SearchScreen } from "./src/screens/SearchScreen";
import { CustomHeader } from "./src/components/CustomHeader";
import { LineScreen } from "./src/screens/LineScreen";
import { StopScreen } from "./src/screens/StopScreen";
import { InfoScreen } from "./src/screens/InfoScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen
          name="search"
          component={SearchScreen}
          options={{ title: "Recherche ligne/arret", header: CustomHeader
        }}
        />

      <Stack.Screen
          name="line"
          component={LineScreen}
          options={{ title: "Ligne...", header: CustomHeader
        }}/>
        
      <Stack.Screen
          name="stop"
          component={StopScreen}
          options={{ title: "Ligne...", header: CustomHeader
        }}/>
      
      <Stack.Screen
          name="info"
          component={InfoScreen}
          options={{ title: "A propos", header: CustomHeader}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
