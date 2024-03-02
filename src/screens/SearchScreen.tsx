import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { SearchBar } from "../components/SearchBar";
import { ItemCard } from "../components/ItemCard";
import { getItemsData } from "../api";

export function SearchScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showData, setShowData] = useState([])

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    try {
      const result = await getItemsData();

      setData([...result.lines, ...result.stops]);
      setShowData([...result.lines, ...result.stops]);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onChangeText={(text) => setShowData(data.filter((item) => String(item.name).toLowerCase().includes(text.toLowerCase())))} />
  
      <FlatList
        data={showData}
        contentContainerStyle={{ gap: 8 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemCard
            type={item.type == "line" ? "Ligne " : "Arret "}
            icon={item.icon}
            name={item.name}
            color={item.color}
            textColor={item.textColor}
            onPress={() => navigation.navigate(item.type, { type: item.type, name: item.name, color: item.color, textColor: item.textColor, code: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    backgroundColor: "white",
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
