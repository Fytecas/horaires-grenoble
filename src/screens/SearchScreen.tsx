import React, { useEffect, useState, memo } from "react";
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
        showsVerticalScrollIndicator = {false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          item.type === "line" ? <LineItem item={item} navigation={navigation} /> : <StopItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
}

const LineItem = memo(({ item, navigation }) => {
  return (
    <ItemCard
      type="Ligne "
      icon={item.icon}
      name={item.name}
      color={item.color}
      textColor={item.textColor}
      onPress={() => navigation.navigate("line", { type: "line", name: item.name, color: item.color, textColor: item.textColor, code: item.id })}
    />
  );
});

const StopItem = memo(({ item, navigation }) => {
  return (
    <ItemCard
      type="Arrêt "
      icon="bus-stop"
      name={item.name}
      color="white"
      textColor="black"
      onPress={() => navigation.navigate("stop", { type: "stop", name: item.name, color: "white", textColor: "black", code: item.id })}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 0,
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
