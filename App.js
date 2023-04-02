import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import HolidayCalendar from './HolidayCalendar';

function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HolidayCalendar />
    </SafeAreaView>
  );
}

export default App;
