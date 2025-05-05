import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { eventsService } from "@/api/events";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const registeredEvents = useSelector((state) => state.user.events);
  const navigation = useNavigation();

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: eventsService.events,
  });

  const registeredEventsData = events?.filter((event) =>
    registeredEvents?.includes(event.id)
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!registeredEvents?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.notRegisteredText}>
          You haven&apos;t registered for any events yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Registered Events</Text>

      <FlatList
        data={registeredEventsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("EventDetails", { event: item })}
          >
            <View style={styles.eventCard}>
              <Image source={{ uri: item.image }} style={styles.eventImage} />
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventLocation}>{item.location}</Text>
                <Text style={styles.eventDate}>
                  {new Date(item.dateTime).toLocaleDateString()} -{" "}
                  {new Date(item.dateTime).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  notRegisteredText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
  },
  eventDetails: {
    flex: 1,
    padding: 12,
    gap: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventLocation: {
    fontSize: 14,
    color: "#666",
  },
  eventDate: {
    fontSize: 14,
    color: "#888",
  },
});
