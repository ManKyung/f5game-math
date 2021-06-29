import React from "react";
import { StatusBar } from "expo-status-bar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Level } from "./level";

const Tab = createMaterialTopTabNavigator();
const l = ["easy", "medium", "hard", "crazy"];
export const Stage = () => (
  <>
    <StatusBar hidden />
    <Tab.Navigator
      lazy={true}
      swipeEnabled={false}
      tabBarOptions={{
        labelStyle: { fontSize: 14, fontWeight: "bold" },
        style: { backgroundColor: "#1F204C" },
        activeTintColor: "white",
      }}
    >
      {l.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item}
          initialParams={{ level: item }}
          component={Level}
        />
      ))}
    </Tab.Navigator>
  </>
);
