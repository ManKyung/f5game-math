import React, { useEffect } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { default as theme } from "./theme.json";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Stage, Play } from "./components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as Analytics from "expo-firebase-analytics";
import uuid from "react-native-uuid";

const Stack = createStackNavigator();

export default () => {
  const uid = uuid.v4();
  Analytics.setClientId(uid);
  useEffect(() => {
    (async () => {
      await Analytics.logEvent("app_view", {
        name: "app_start",
        screen: "APP",
        user: uid,
        purpose: "APP_START",
      });
    })();
  });
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Stage"
              component={Stage}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Play"
              component={Play}
              options={{
                headerShown: false,
              }}
              initialParams={{ level: "easy" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
