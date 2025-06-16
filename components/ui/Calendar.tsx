import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('screen');

const Calendar = () => {
  const [days, setDays] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const daysArray = Array(firstDayOfWeek).fill(null).concat(
      Array.from({ length: totalDays }, (_, i) => i + 1)
    );

    setDays(daysArray);
  }, [currentDate]);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.monthTitle}>
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </Text>

      <View style={styles.calendar}>
        <View style={styles.weekDays}>
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
        </View>

        <View style={styles.daysGrid}>
          {days.map((day, index) => (
            <TouchableOpacity key={index} style={styles.dayCell}>
              <Text style={styles.dayText}>{day ?? ''}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    marginTop: 20,
  },
  calendar: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    elevation: 2,
    width: width * 0.95,
  },
  monthTitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
    color: '#FFFFFF'
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  weekDay: {
    width: '14.2%',
    textAlign: 'center',
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.2%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayText: {
    fontSize: 14,
  },
});

export default Calendar;
