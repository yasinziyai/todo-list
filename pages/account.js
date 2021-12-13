import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { useRouter } from "next/router";
export default function App(props) {
  let [list, setList] = useState([]);
  let [value, setvalue] = useState("");
  let [hasLoaded, sethasLoaded] = useState(false);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("list", JSON.stringify(list));
    }
  }, [list, hasLoaded]);

  useEffect(() => {
    if (!hasLoaded) {
      let savedlist = localStorage.getItem("list");
      if (savedlist) {
        setList(JSON.parse(savedlist));
      }

      sethasLoaded(true);
    }
  }, []);
  return (
    <View style={styles.conteiner}>
      <Text style={styles.text}>todo list</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="type..."
          value={value}
          onChangeText={setvalue}
        />
        <Pressable
          style={styles.Pressable}
          onPress={() => {
            setList([...list, value]);
            setvalue("");
          }}
        >
          <Text style={{ color: "white", fontWeight: "200" }}>+</Text>
        </Pressable>
      </View>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {list.map((listitem, index) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Text>
              {index}){listitem}
            </Text>
            <Pressable
              style={{
                backgroundColor: "red",
                width: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setList([...list.slice(0, index), ...list.slice(index + 1)]);
              }}
            >
              <Text style={{ color: "white", fontWeight: "200" }}>x</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  conteiner: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    maxWidth: 200,
    marginRight: "auto",
    marginLeft: "auto",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  Pressable: {
    backgroundColor: "blue",
    width: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
