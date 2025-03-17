import * as React from "react";
import { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  Platform,
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import { Picker } from "@react-native-picker/picker";
import { send, EmailJSResponseStatus } from "@emailjs/react-native";
import { UserContext } from "../usercontextslave";

import DateAndTime from "@react-native-community/datetimepicker";
import DropDownPicker from 'react-native-dropdown-picker'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SCALE_WIDTH = SCREEN_WIDTH / 390; // iPhone 14 width
const SCALE_HEIGHT = SCREEN_HEIGHT / 944; // iPhone 14 height

const scale = (size, factor = "width") => {
  return factor === "height" ? size * SCALE_HEIGHT : size * SCALE_WIDTH;
};

export const ConsultationFixed = () => {
  const [date, setDate] = useState(new Date());
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    setDate(currentDate);
  };
  const [itemss, setItemss] = useState([
    {label: "Ng Guohui", value: "ng_guohui@sst.edu.sg"},
    {label: "Allan Low", value:"low_zu_you_allan@sst.edu.sg" },
    {label:"Ong", value:"ong_jie_ying@sst.edu.sg" },
    {label:"Tan Hoe Teck", value:"tan_hoe_teck@sst.edu.sg"},
    {label:"Lim-Leong Woon Foong", value:"leong_woon_foong@sst.edu.sg" },
    {label:"Tan Soo Woon John", value:"john_tan@sst.edu.sg" },
    {label:"Lim Ming Yang", value:"lim_ming_yang@sst.edu.sg" },
    {label:"Ng Yi Ting Karen", value:"karen_ng@sst.edu.sg" },
    {label:"Lim Chuay Sia", value:"lim_chuay_sia@sst.edu.sg" },
    {label:"Praveena Sandra Mohan", value:"praveena_sandra_mohan@sst.edu.sg" },
    {label:"Teo Soo Ling Karen", value:"karen_teo@sst.edu.sg" },
    {label:"Chung Wing Shun Vincent", value:"chung_wing_shun_vincent@sst.edu.sg" },
    {label:"Chee Meng Teck", value:"chee_meng_teck@sst.edu.sg" },
    {label:"Choo Hui En", value:"choo_hui_en@sst.edu.sg" },
    {label:"Loh Yue Yan Amelia", value:"loh_yue_yan_amelia@sst.edu.sg" },
    {label:"Merlene Paik Xin Yi", value:"merlene_paik_xin_yi@sst.edu.sg" },
    {label:"Ng Li-Ping", value:"ng_li_ping@sst.edu.sg" },
    {label:"Szeto Dee Loon Dillon", value:"szeto_dee_loon_dillon@sst.edu.sg" },
    {label:"Wong Koi Lin", value:"wong_koi_lin@sst.edu.sg" },
    {label:"Tan Tong Lun Jason", value:"tan_tong_lun_jason@sst.edu.sg" },
    {label:"Wan Han Xuan Thomas", value:"wan_han_xuan_thomas@sst.edu.sg" },
  ])
  const { user, setUser } = React.useContext(UserContext);
  const onSubmit = async () => {
    try {
      Alert.alert("Please Wait", "", [] );
      console.log(comment);

      await send(
        "service_team5X",
        "template_y6ko58r",
        {

          stu_name: Platform.OS === "web" ? user.email : user.user.email,
          tch_name: "teamx.sst@gmail.com",
          date: date.getDate,
          time: date.getTime,
          Comments: comment,

         

        },
        {
          publicKey: "oXtbVXokN13AvNZfl",
        }
      );

      


      console.log(Platform.OS === 'web' ? user.email : user.user.email);
  
      console.log('SUCCESS!');

    } catch (err) {
      if (err instanceof EmailJSResponseStatus) {
        console.log("EmailJS Request Failed...", err);
      }
      console.log("ERROR", err);
    }
  };
  const [textAreaCount, setTextAreaCount] = React.useState(0);

  const [fontsLoaded] = useFonts({
    "SF Pro Display": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "ethnocentric rg": require("./assets/fonts/ethnocentric rg.otf"),
    "SF Compact": require("./assets/fonts/SF-Compact.ttf"),
    "InriaSans-Bold": require("./assets/fonts/InriaSans-Bold.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });
  const [selectedperson, setSelectedperson] = React.useState('ng_guohui@sst.edu.sg');
  function seTcom(text) {
    setComment(text);
 
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Consultation Request</Text>

      <Text style={styles.label}>Consultant</Text>
      <DropDownPicker
        open={open}
        value={selectedPerson}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedPerson}
        setItems={setItems}
        style={styles.dropdown}
      />

      <Text style={styles.label}>Date and Time</Text>
      <DateAndTime
        testID="dateTimePicker"
        value={date}
        mode="datetime"
        is24Hour={true}
        onChange={onChange}
        style={styles.datePicker}
      />

      <Text style={styles.label}>Comments/Attachments</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Input comments"
        placeholderTextColor="#99CCFF"
        value={comment}
        onChangeText={setComment}
      />

      <Pressable style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>Request</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 5,
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
  },
  datePicker: {
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    color: "#0D47A1",
    borderColor: "#64B5F6",
    borderWidth: 1,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1976D2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});


export default ConsultationFixed;
