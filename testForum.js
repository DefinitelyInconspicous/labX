import "./firebaseConfig";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { heightScale, styles, widthScale } from "./Home";
import {
  FIREBASE_APP_MOBILE,
  FIREBASE_DB,
  FIREBASE_STORAGE,
  FIREBASE_STORAGEREF,
} from "./firebaseConfig";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { UserContext } from "./usercontextslave";
import firestore from "@react-native-firebase/firestore";
import { firebase } from "@react-native-firebase/auth";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function ForumHomePage() {
  return (
    <Stack.Navigator
      initialRouteName="ForumHome"
      screenOptions={{
        headerStyle: { backgroundColor: "#393E43" },
        headerTintColor: "#FFF",
      }}
    >
      <Stack.Screen name="ForumHome" component={ForumHome} />
      <Stack.Screen name="IndivForum" component={ForumPull} />
      <Stack.Screen name="IndivPage" component={IndivPage} />
      <Stack.Screen name="New Post" component={NEWFORUMPOST} />
    </Stack.Navigator>
  );
}

function ForumHome({ navigation }) {
  const [fontsLoaded] = useFonts({
    "SF Pro Display": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "ethnocentric rg": require("./assets/fonts/ethnocentric rg.otf"),
    "SF Compact": require("./assets/fonts/SF-Compact.ttf"),
    "InriaSans-Bold": require("./assets/fonts/InriaSans-Bold.ttf"),
  });

  return (
    <View style={styles.forumBG}>
      <Text style={styles.forum}>Forum</Text>
      <View style={{ padding: 40 * heightScale }} />
      <Pressable
        style={styles.apperancBTFR}
        onPress={() => navigation.navigate("IndivForum", { level: 0 })}
      >
        <Text style={styles.sec1}>Sec 1</Text>
      </Pressable>
      <View style={{ padding: 10 * heightScale }} />
      <Pressable
        style={styles.apperancBTFR}
        onPress={() => navigation.navigate("IndivForum", { level: 1 })}
      >
        <Text style={styles.sec1}>Sec 2</Text>
      </Pressable>
      <View style={{ padding: 10 * heightScale }} />
      <Pressable
        style={styles.apperancBTFR}
        onPress={() => navigation.navigate("IndivForum", { level: 2 })}
      >
        <Text style={styles.sec1}>Sec 3</Text>
      </Pressable>
      <View style={{ padding: 10 * heightScale }} />
      <Pressable
        style={styles.apperancBTFR}
        onPress={() => navigation.navigate("IndivForum", { level: 3 })}
      >
        <Text style={styles.sec1}>Sec 4</Text>
      </Pressable>
    </View>
  );
}

function ForumPull({ route, level, navigation }) {
  const [fontsLoaded] = useFonts({
    "SF Pro Display": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "ethnocentric rg": require("./assets/fonts/ethnocentric rg.otf"),
    "SF Compact": require("./assets/fonts/SF-Compact.ttf"),
    "InriaSans-Bold": require("./assets/fonts/InriaSans-Bold.ttf"),
  });
  level = route.params.level;
  const [data, setData] = useState(null);
  const [docSnapData, setDocSnapData] = useState(null);
  const [refrest, setrefrest] = useState(false);
  const getMoviesFromApiAsync = async () => {
    if (Platform.OS === "web") {
      try {
        console.log(level);
        const docRef = doc(
          FIREBASE_DB,
          level === 0
            ? "sec1"
            : level === 1
            ? "sec2"
            : level === 2
            ? "sec3"
            : "sec4",
          "data"
        );
        console.log(
          level === 0
            ? "sec1"
            : level === 1
            ? "sec2"
            : level === 2
            ? "sec3"
            : "sec4"
        );
        const docSnap = await getDoc(docRef);
        setDocSnapData(docSnap.data());
        console.log(docSnap.data());
        if (docSnap.data() !== null) {
          console.log(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const userr = await firestore(FIREBASE_APP_MOBILE)
          .collection(
            level === 0
              ? "sec1"
              : level === 1
              ? "sec2"
              : level === 2
              ? "sec3"
              : "sec4"
          )
          .doc("data")
          .get();
        console.log(userr);
        setDocSnapData(userr);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    getMoviesFromApiAsync();
    setrefrest(false);
  }, [refrest]);
  return (
    <View style={{ flex: 1 }}>
      {docSnapData !== null && fontsLoaded === true ? (
        <View style={{flex: 1}}>
          <View
            style={{
              fontSize: 36,
              letterSpacing: 0.1,
              lineHeight: 41,
              fontFamily: "SF Compact Text",
              color: "#387cc5",
              textAlign: "right",
              display: "flex",
              alignItems: "flex-end",
              width: 348,
              height: 49,
            }}
          >
            <Pressable onPress={() => setrefrest(true)}>
              <Text>Refresh</Text>
            </Pressable>
          </View>
          <FlatList
            data={Platform.OS !== 'web' ? docSnapData._data.files : docSnapData.files}
            renderItem={({ item }) => (
              <View
                style={{
                  direction: "ltr",
                  alignContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("IndivPage", { item: item })
                  }
                >
                  <Text>{item.title}</Text>
                  <Text style={{ alignSelf: "flex-end" }}>
                    Username: {item.username}
                  </Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => item.id}
            style={{ flex: 1, flexDirection: "column" }}
            scrollEnabled={true}
          />

          <View
            style={{
              width: "auto",
              flex: 1,
              backgroundColor: "#387cc5",
              margin: 20,
              position: "relative",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("New Post", { level: level })}
            >
              <Text
                style={{
                  fontFamily: "SF Pro Display",
                  color: "#FFFFFF",
                  fontSize: 50,
                }}
              >
                +
              </Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

function IndivPage({ navigation, route, item }) {
  item = route.params.item;
  const [data, setData] = useState(null);
  const pullContent = async () => {
    const response = await fetch(item.filelocation, {
      method: "GET",
      mode: "cors",
    });

    const json = await response.json();
    setData(json);
    console.log(json);
  };
  useEffect(() => {
    pullContent();
  }, []);
  replyMessage = () => {
    Alert.alert('Replies not implemented yet', 'We are working very hard on this', [
      {
        text: 'I understand'
        
      },
      {
        text: 'Support us instead!',
        onPress: () => buyMilo()
      }
        
      
    ]);
  }
  buyMilo = () => {
    Alert.alert('Buying us a milo has not been implemented', 'We are working very hard on this very important feature', [
      {
        text: 'I understand'
      },
      {
        text: 'Support us instead!',
        onPress: () => buyMilo()
      }
    ]);
  }
  return (
    <>
      {item !== null && data !== null ? (
        <View style={{flex: 1}}>
          <ScrollView>
            <View>
              <Text style={{ fontSize: 48 }}>{data.title}</Text>
              <Text>
                
              </Text>
              <Text>{data.content}</Text>
            </View>
          </ScrollView>
          <Button onPress={() => replyMessage()} title="Reply" />
            
       
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
}

function NEWFORUMPOST({ navigation, route, level }) {
  level = route.params.level;
  const [fontsLoaded] = useFonts({
    "SF Pro Display": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "ethnocentric rg": require("./assets/fonts/ethnocentric rg.otf"),
    "SF Compact": require("./assets/fonts/SF-Compact.ttf"),
    "InriaSans-Bold": require("./assets/fonts/InriaSans-Bold.ttf"),
  });
  const { user, setUser } = useContext(UserContext);
  const [title, setTitle] = useState("Enter title");
  const [loading, setLoading] = useState(false);
  const [postContent, setPostContent] = useState(
    "Enter your forum post content"
  );
  const pushNOW = async () => {
    try {
      setLoading(true);
      const docRef = doc(
        FIREBASE_DB,
        level === 0
          ? "sec1"
          : level === 1
          ? "sec2"
          : level === 2
          ? "sec3"
          : "sec4",
        "data"
      );

      const file = new File(
        [JSON.stringify({ title: title, content: postContent, tags: ["TBC"] })],
        String(Math.random().toString(36).substring(2, 12)) + ".json",
        {
          type: "application/json",
        }
      );
      console.log(URL.createObjectURL(file));
      const randomName = String(Math.random().toString(36).substring(2, 12));
      const storageRef = ref(
        FIREBASE_STORAGE,
        String(
          (level === 0
            ? "Sec1"
            : level === 1
            ? "Sec2"
            : level === 2
            ? "Sec3"
            : "Sec4") +
            "/" +
            randomName +
            ".json"
        )
      );
      await uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        console.log(snapshot);
      });
      const response = await fetch(
        "https://firebasestorage.googleapis.com/v0/b/labx-sst.appspot.com/o/" +
          (level === 0
            ? "Sec1"
            : level === 1
            ? "Sec2"
            : level === 2
            ? "Sec3"
            : "Sec4") +
          "%2F" +
          randomName +
          ".json",
        {
          method: "GET",
          mode: "cors",
        }
      );

      const json = await response.json();
      console.log(json);

      const filelocation =
        "https://firebasestorage.googleapis.com/v0/b/labx-sst.appspot.com/o/" +
        (level === 0
          ? "Sec1"
          : level === 1
          ? "Sec2"
          : level === 2
          ? "Sec3"
          : "Sec4") +
        "%2F" +
        randomName +
        ".json?alt=media&token=" +
        json.downloadTokens;
      await updateDoc(docRef, {
        files: arrayUnion({
          filelocation: filelocation,
          shortdescripion: postContent.substring(1, 20),
          title: title,
          username: user.email,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.MainPage}>
      <Text style={styles.header}>New Post</Text>
      <TextInput value={title} onChangeText={(text) => setTitle(text)} />
      <TextInput
        value={postContent}
        onChangeText={(text) => setPostContent(text)}
        style={styles.textBox}
        allowFontScaling={true}
        multiline={true}
        enterKeyHint="Complete"
      />
      <Pressable style={styless.appearance} onPress={() => pushNOW()}>
        <View style={styless.appearance}>
          <View style={styless.apperance} />
          <Text style={styless.send}> Send</Text>
          <Image
            style={styless.sendFilledIcon}
            resizeMode="cover"
            source={require("./assets/send-filled.png")}
          />
        </View>
      </Pressable>
    </View>
  );
}
const styless = StyleSheet.create({
  apperance: {
    borderRadius: 20,
    backgroundColor: "#222426",
    width: 356,
    position: "absolute",
    height: 60,
  },
  send: {
    top: 5,
    left: 8,
    fontSize: 36,
    letterSpacing: 0.1,
    lineHeight: 41,
    fontWeight: "300",
    fontFamily: "InriaSans-Light",
    color: "#d13036",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 348,
    height: 49,
    position: "absolute",
  },
  sendFilledIcon: {
    top: 18,
    left: 123,
    width: 24,
    height: 24,
    overflow: "hidden",
    position: "absolute",
  },
  appearance: {
    flex: 1,
    width: "100%",
    height: 60,
  },
});
