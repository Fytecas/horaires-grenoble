import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = "https://data.mobilites-m.fr/api"

export async function getItemsData(){
    const value = await AsyncStorage.getItem('data')
    if (value !== null) {
        // console.log("Got stored data.");

        return JSON.parse(value)
    } else {
        // console.log("Stored data were not find, getting it...")
        const response = await axios.get(`${apiUrl}/routers/default/index/routes`)

        const data = {stops: [], lines: []}
        // console.log(response.data[0]);
        
        response.data.forEach((v) => {
            if (["TRAM", "BUS"].includes(String(v.mode))){ 
                data.lines.push(v)
            }
        })

        data.stops = (await axios.get(`${apiUrl}/points/json?types=clusters`)).data.features
        
        data.stops = data.stops.map((v) => {
            return {
                name: v.properties.name,
                id: v.properties.code,
                type: "stop",
                icon: "bus-stop"
            }
        })

        data.lines = data.lines.map((v) => {
            return {
                name: v.shortName,
                type: "line",
                color: "#" + v.color,
                id: v.id,
                textColor: "#" + v.textColor,
                icon: v.mode === "TRAM" ? "tram" : "bus"
            }
        })

        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('data', jsonValue);

        return data
    }
}

export async function getTimeByLine(code: String, timestamp?: number) {

    // console.log(`Getting times for line ${code} with timestamp ${timestamp}`);

    const response: Object = Object((await axios.get(`${apiUrl}/ficheHoraires/json`, { params: { route: code, time: timestamp} })).data)
    let result = []

    let i = 0
    while (response[String(i)]){
        result.push(response[String(i)])
        result[result.length-1].destination = result[result.length-1].arrets.slice(-1)[0].parentStation
        i++
    }

    // console.log(result);
    

    return result
}

export async function getTimesByStop(code: String) {
    // console.log("Getting times for stop " + code);

    const response = await axios.get(`https://data.mobilites-m.fr/api/routers/default/index/clusters/${code}/stoptimes`, {
        headers: {
            origin: 'horaires_grenoble_dario_lehy'
        }
    });

    const res = {}
    // console.log(response.data);
    
    response.data.forEach((v) => {
        let split = String(v.pattern.id).split(":")
        // console.log(split);
        
        let line = split[0] + ":" + split[1]
        if (!res[line]) {
            res[line] = {destinations: []}
        }
        res[line].destinations.push({name: v.pattern.desc, times: v.times.map((t) => t.realtimeArrival)})
    })
    return res
    
}

export async function getLinesObject(){
    const {lines} = await getItemsData()

    let linesObj = {}

    lines.forEach((v) => {
        linesObj[v.id] = v
    })

    return linesObj
}