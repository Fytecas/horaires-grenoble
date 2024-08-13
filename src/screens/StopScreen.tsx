import React, { useEffect, useState, memo } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, RefreshControl, Text } from "react-native";
import { getLinesObject, getTimeByLine, getTimesByStop } from "../api";
import { StopTimesCard } from "../components/StopTimesCard";

export function StopScreen({ navigation, ...props }) {
  let [data, setData] = useState({})
  let [lines, setLines] = useState([])
  let [notDisponible, setNotDisponible] = useState(false)
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  let [linesObj, setLinesObj] = React.useState({})

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData().then(() => setRefreshing(false))
  }, []);

  const currentCode: string = props.route.params.code
  const currentLine: string | null = props.route.params.line

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const result = await getTimesByStop(currentCode);
      setLinesObj(await getLinesObject())
      // console.log(result);

      if (result) {

        setData(result);
        let lines_r = Object.keys(result)
        // Move the current line to the top of the list
        if (currentLine) {
          lines_r = lines_r.filter((v) => v !== currentLine)
          lines_r.unshift(currentLine)
        }
        console.log(lines_r, currentLine)

        setLines(lines_r)
      } else {
        setNotDisponible(true)
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {loading ? (<ActivityIndicator size="large" color="black" />) :
        (
          notDisponible ? (<Text style={styles.error}>Données indiponibles</Text>) : (
            <View style={styles.container}>
              <FlatList
                data={lines}
                contentContainerStyle={{ gap: 8 }}
                keyExtractor={(item, i) => String(i)}
                renderItem={({ item }) => (
                  <TimesCard
                    name={linesObj[item].name}
                    dests={data[item].destinations}
                    color={linesObj[item].color}
                    textColor={linesObj[item].textColor}
                    onPress={() => navigation.push("line", { type: "line", name: linesObj[item].name, color: linesObj[item].color, textColor: linesObj[item].textColor, code: item, line: currentLine })}
                  />
                )}

                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
            </View>
          ))}
    </View>)
}

const TimesCard = memo(({ name, dests, textColor, color, trips, onPress }) => {
  return (
    <StopTimesCard
      name={name}
      dests={dests}
      color={color}
      textColor={textColor}
      onPress={onPress}
    />
  );
});
const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 8,
    backgroundColor: "white",
    height: "100%"
  },

  error: {
    color: "red",
    fontWeight: "800",
    fontSize: 22,
    justifyContent: "center",
    alignSelf: "center"
  }
})