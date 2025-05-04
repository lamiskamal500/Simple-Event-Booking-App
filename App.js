import {
  DrawerItemList,
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Login from "@/screens/Login";
import SignUp from "@/screens/SignUp";
import { store } from "@/store/store";
import { StatusBar } from "expo-status-bar";
import Dashboard from "./screens/Dashboard";
import EventsList from "./screens/EventsList";
import EventDetails from "./screens/EventDetails";
import { MaterialIcons } from "@expo/vector-icons";
import { clearUser } from "./store/slices/userSlice";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigation, NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const CustomDrawerContent = (props) => {
  const userName = useSelector((state) => state.user.username);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerUserName}>
            {userName
              ? `Hello, ${userName
                  .split(" ")
                  .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
                  .join(" ")}`
              : "Welcome!"}
          </Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="red" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

function MainDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen
        name="EventsList"
        component={EventsList}
        options={{ headerTitle: "Events List" }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainDrawer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EventDetails"
              component={EventDetails}
              options={{
                headerTitle: "Event Details",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 14,
  },
  drawerUserName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
