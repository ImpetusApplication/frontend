import AsyncStorage from '@react-native-async-storage/async-storage';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import React from 'react';
import LoginScreen from '../app/(tabs)/index';


jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

test('LoginScreen login flow success', async () => {
  (axios.post as jest.Mock).mockResolvedValue({ status: 200, data: { token: 'abc123' } });

  const { getByPlaceholderText, getByText } = render(<LoginScreen />);
  
  fireEvent.changeText(getByPlaceholderText(/Email ou Nome de Usuário/i), 'user@example.com');
  fireEvent.changeText(getByPlaceholderText(/Senha/i), 'password123');
  fireEvent.press(getByText('Entrar'));
  
  await waitFor(() => {
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('userToken', 'abc123');
    expect(getByText('Entrar')).toBeTruthy(); // botão deve estar presente
  });
});
