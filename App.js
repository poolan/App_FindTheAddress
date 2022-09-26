import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [address, setAddress] = useState("");
  const [apiKey, setApiKey] = useState("yT99ha9Y9Xeas2k2eBwAKvAOOKz6CZXK");
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });

  const showAddress = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${address}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRegion({
          ...region,
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
        });
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 5, marginBottom: 50, width: "100%", height: "100%" }} region={region}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>
      <TextInput
        style={{
          fontSize: 20,
          height: 35,
          borderWidth: 1,
          width: 200,
          marginBottom: 25,
        }}
        placeholder="address"
        onChangeText={(text) => setAddress(text)}
      />
      <Button
        title="SHOW"
        onPress={showAddress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
