import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="telaInicial" />
      <Stack.Screen name="FoodScreen" />
      <Stack.Screen name="ProfileScreen" />
      <Stack.Screen name="notificationScreen" />
      <Stack.Screen name="streakScreen" />
      <Stack.Screen name="signUp" />
      <Stack.Screen name="forgotPassword" />
    </Stack>
  );
} 