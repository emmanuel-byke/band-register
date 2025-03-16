import api from './api';


export default function ManageUsers() {

  const getAllUsers = async () => {
    try {
        const response = await api.getUsers();
        console.log(response.data)
        return response.data;
    } catch (error) {
      return [];
    }
  };


  return { getAllUsers };
}

