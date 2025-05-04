import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { eventsService } from "@/api/events";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const EventsList = () => {
  const navigation = useNavigation();

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: eventsService.events,
  });

  if (isLoading)
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center" }}
      />
    );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("EventDetails", { event: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>📍 {item.location}</Text>
        <Text style={styles.info}>
          📅 {new Date(item.dateTime).toLocaleString()}
        </Text>
        <Text style={styles.price}>
          💲 {item.price === 0 ? "Free" : `$${item.price}`}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  card: {
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  image: { height: 200, width: "100%" },
  title: { fontSize: 18, fontWeight: "bold", padding: 10 },
  price: { fontWeight: "600", paddingTop: 5, fontSize: 15 },
  infoContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default EventsList;
