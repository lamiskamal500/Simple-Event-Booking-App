import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import ItemValue from "@/components/ItemValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginService } from "@/api/login";

const EventDetails = ({ route }) => {
  const { event } = route.params;
  const navigation = useNavigation();
  const userId = useSelector((state) => state.user.id);

  const { mutateAsync: registerEvent, isLoading } = useMutation({
    mutationFn: () => loginService.registerUser(event.id, userId),
    onSuccess: () => {
      navigation.navigate("Main");
    },
    onError: (error) => {
      console.log("Error registering for event:", error);
    },
  });
  const eventInfoSections = [
    [
      { item: "Location", value: event.location },
      { item: "Date & Time", value: new Date(event.dateTime).toLocaleString() },
    ],
    [
      { item: "Capacity", value: event.capacity },
      { item: "Price", value: event.price === 0 ? "Free" : `$${event.price}` },
    ],
    [
      { item: "Available Spots", value: event.availableSpots },
      {
        item: "Speakers",
        value: event.speakers?.join(", ") || "TBA",
      },
    ],
    [
      {
        item: "Description",
        value: event.description || "No description available",
      },
    ],
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fefefe" }}>
      <Image source={{ uri: event.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        {eventInfoSections.map((row, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            {row.map((data, i) => (
              <ItemValue key={i} item={data.item} value={data.value} />
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={registerEvent}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 230,
  },
  content: {
    padding: 16,
    height: "100%",
    backgroundColor: "#fff",
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
    color: "#555",
  },
  description: {
    fontSize: 15,
    color: "#666",
    marginTop: 15,
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EventDetails;
