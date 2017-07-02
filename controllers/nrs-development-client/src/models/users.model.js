import axios from 'axios';

import { hostUrl } from '@/config';

const getUsers = async () => {
  try {
    const response = await axios.get(`${hostUrl}/users`);
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error('ERROR: Unable to fetch users');
    }
  } catch (e) {
    console.error(e);
    return [];
  }
};

const generateTempUser = () => {
  return {
    username: '',
    password: '',
    isAdmin: false
  };
};

const addUser = async (user) => {
  try {
    const response = await axios.post(`${hostUrl}/users`, {
      user: user
    });

    if (response.data.success) {
      return response.data.success;
    } else {
      throw new Error('ERROR: Unable to save new user');
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

const deleteUser = async (user) => {
  try {
    const response = await axios.delete(`${hostUrl}/users/${user._id}`);
    if (response.data.success) {
      return response.data.success;
    } else {
      throw new Error('ERROR: Unable to delete user');
    }
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default {
  getUsers,
  generateTempUser,
  addUser,
  deleteUser
};
