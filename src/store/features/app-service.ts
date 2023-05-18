import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDailyJobs = createAsyncThunk('DailyJobs', async (data: any) => {
  const response: any = await axios.post('/getMyDailyJobs', data);
  if (response === undefined) return [];
  return response?.Payload?.StopList;
});

export const Login = createAsyncThunk('Login', async (data: any) => {
  const response: any = await axios.post('/login', data);
  return response;
});
