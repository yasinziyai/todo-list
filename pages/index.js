import axios from "axios";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter } from "next/router";

export default function App(props) {
  let [mobile, setMobile] = useState("");
  let [code, setCode] = useState();
  let { push } = useRouter();
  let [isInVerification, setInVerification] = useState(false);
  let [randomCode, setRandomCode] = useState();
  console.log(isInVerification);

  let sendSms = (mobile, code) => {
    axios
      .get(
        `https://api.kavenegar.com/v1/7839743679596E57502B5874556571614C7471765835505672553934366A4D58527777724F684D69494A453D/sms/send.json?receptor=${mobile}&message=${code}&sender=10003000606060`
      )
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.kolsafhe}>
        <View style={styles.header}>
          <Text style={styles.textheader}>چی انجام بدم؟</Text>
        </View>
        <View style={styles.vasat}>
          <View style={styles.logo}>
            <Image source={{ uri: "/logo.png" }} style={styles.andazelogo} />
          </View>
          {isInVerification ? (
            <>
              <Text
                style={{ fontSize: 18, color: "rgba(255, 255, 255, 0.85)" }}
              >
                یه کد برات پیامک کردم
              </Text>
              <Text
                style={{ fontSize: 18, color: "rgba(255, 255, 255, 0.85)" }}
              >
                پایین واردش کن
              </Text>
              <TextInput
                style={{
                  width: 180,
                  height: 38,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  marginTop: 15,
                  borderRadius: 6,
                  placeholder: "123456",
                  color: "color: rgba(255, 255, 255, 0.2)",
                  fontSize: 18,
                  textAlign: "center",
                }}
                onChangeText={setCode}
                value={code}
              />
              <Pressable
                onPress={() => {
                  console.log(code, randomCode);
                  if (`${randomCode}` === code) {
                    push("/account");
                  } else {
                    alert("اشتباه وارد کردید");
                  }
                }}
                style={{
                  width: 90,
                  height: 38,
                  backgroundColor: "#00B5F5",
                  borderRadius: 6,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "#fff", textAlign: "center" }}
                >
                  تایید
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <View>
                <Text style={styles.text}>میدونی که ... </Text>
                <Text style={styles.text}>اول باید وارد شی!</Text>
                <View>
                  <Text style={styles.textb}>
                    شماره موبایلتو این پایین بنویس
                  </Text>
                </View>
              </View>
              <TextInput
                style={styles.input}
                placeholder="09378499090"
                onChangeText={setMobile}
                value={mobile}
              />
              <Pressable
                onPress={() => {
                  setInVerification(true);
                  let code = Math.random();
                  code = code * 1000;
                  code = Math.floor(code);
                  setRandomCode(code);
                  sendSms(mobile, code);
                }}
                style={{
                  width: 90,
                  height: 35,
                  marginTop: 10,
                  borderRadius: 6,
                  backgroundColor: "#00B5F5",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 18 }}>ورود</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
  },
  kolsafhe: {
    width: 685,
    height: 505,
    display: "flex",
    backgroundColor: "black",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 10,
  },
  header: {
    width: 685,
    backgroundColor: "#303339",
    height: 23,
    borderRadius: 30,
  },
  textheader: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 300,
    color: "white",
  },
  vasat: {
    width: 300,
    height: 397,
    backgroundColor: "#303339",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 15,
  },
  logo: {
    width: 144,
    height: 179.72,
    marginTop: -50,
    display: "flex",
  },
  andazelogo: {
    width: 140,
    height: 178,
  },
  text: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
  textb: {
    marginTop: 20,
    display: "flex",
    color: "white",
    fontSize: 13,
  },
  input: {
    marginTop: 10,
    textAlign: "center",
    width: 180,
    height: 38,
    fontSize: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 6,
  },
  Button: {
    marginTop: 10,
  },
});
