import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, RefreshControl, Text } from "react-native";
import DropdownComponent from "../components/DropDown";
import { getTimeByLine } from "../api";
import { LineTimesCard } from "../components/LineTimesCard";
import { FontAwesome5, MaterialCommunityIcons } from "react-native-vector-icons";


export function LineScreen({ navigation, ...props }) {
    let [ data, setData ] = useState([])
    let [ destIndex, setDestIndex ] = useState(0)
    let [ notDisponible, setNotDisponible ] = useState(false)
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getData().then(() => setRefreshing(false))
    }, []);

    const currentCode: String = props.route.params.code
    
    useEffect(() => {
      getData()
    }, [])

    const getData = async () => {
      try {
        const result = await getTimeByLine(currentCode);
        // console.log(result);
        
        if (result.length) {
          setData(result);
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
          { loading ? (<ActivityIndicator size="large" color="black" />) : 
          (
            notDisponible ? (<Text style={styles.error}>Données indiponibles</Text>): (<View style={styles.container}>

              <DropdownComponent data={[...data.map((v, i) => {return {label: (
                                                                          <>
                                                                            <Text>
                                                                              {'Vers '}
                                                                            </Text>
                                                                            <Text style={{fontWeight: "bold"}}>
                                                                              {v.destination.name}
                                                                            </Text>
                                                                          </>                                                                          
                                                                        ), value: i}})]} 
              onChange={(v) => {setDestIndex(v); // console.log(data[destIndex]);
              }}/>

              <FlatList
                      
                      data={data[destIndex].arrets}
                      contentContainerStyle={{ gap: 8 }}
                      keyExtractor={(item, i) => i.toString()}
                      renderItem={({ item }) => (
                        <LineTimesCard
                          name={item.parentStation.name}
                          textColor={props.route.params.textColor} color={props.route.params.color}
                          trips={item.trips} // item.trips
                          onPress={() => navigation.push("stop", { type: "stop", name: item.parentStation.name, color: "white", textColor: "black", code: item.parentStation.code })}
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

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    backgroundColor: "white",
    height: "100%"
  },
  error: {
    color: "red",
    fontWeight: "800",
    fontSize: 22,
    justifyContent: "center",
    alignSelf: "center"
  },
  info: {
    fontSize: 12,
    fontWeight: "400",
  }
})