import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment from "moment";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";

interface Holiday {
  name: string;
  date: string;
  description: string;
  type: Array<string>;
}

function HolidayCalendar(): React.ReactElement {
  const [holidays, setHolidays] = useState<{ [date: string]: object }>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [country, setCountry] = useState<string>("US");
  const [initialDate, setInitialDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [holiday, setHoliday] = useState<Holiday[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    fetchHolidays();
  }, [year, country]);

  const fetchHolidays = async () => {
    const response = await axios.get(
      `https://calendarific.com/api/v2/holidays?api_key=933825f18495b71b4ffc720e00a15697642b7c9a&country=${country}&year=${year}`
    );

    const holidayData: Holiday[] = response.data.response.holidays;
    const markedDates: { [date: string]: object } = {};

    markedDates["2023-02-03"] = {
      selected: true,
      marked: true,
      selectedColor: "pink",
    };

    holidayData.forEach((holiday) => {
      const date = moment(holiday.date.iso).format("YYYY-MM-DD");

      if (date === moment().format("YYYY-MM-DD")) {
        markedDates[date] = {
          selected: true,
          marked: true,
          selectedColor: "blue",
        };
      } else {
        markedDates[date] = { marked: true, dotColor: "#ff6347" };
      }
    });

    setHolidays(markedDates);
    setHoliday(holidayData);
  };

  const countryJson: string[] = ["US", "IN", "UK"];
  const yearJson: string[] = ["2023", "2024", "2025"];

  return (
    <View>
      <View
        style={{
          width: "100%",
          marginTop: 75,
          paddingLeft: 25,
          flexDirection: "row",
        }}
      >
        <Picker
          selectedValue={country}
          onValueChange={(itemValue) => setCountry(itemValue)}
          style={{ width: "40%", backgroundColor: "lightgray" }}
        >
          {countryJson.map((cou, i) => {
            return <Picker.Item key={i} label={cou} value={cou} />;
          })}
        </Picker>
      </View>
      <Calendar markedDates={holidays} onDayPress={(day) => setSelectedDate(day.dateString)} />
      <Text
        style={{
          padding: 25,
          fontSize: 18,
          color: "black",
          fontWeight: "bold",
        }}
      >
        Selected Date: {selectedDate}
      </Text>
    </View>
  );
}

export default HolidayCalendar;
