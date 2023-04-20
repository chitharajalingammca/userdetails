import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const User = () => {
  const [userData, usersetData] = useState({name: '', email: ''});
  const dataFetchedRef = useRef(false);

  const fetchuserdetails = async () => {
        try {
          localStorage.removeItem("data");
          const response = await axios.get("https://randomuser.me/api");
          localStorage.setItem("data", JSON.stringify(response.data.results[0]));
          const name = response.data.results[0].name.title+' '+response.data.results[0].name.first+' '+response.data.results[0].name.last;
          const email = response.data.results[0].email;
          usersetData({ name, email});
        } catch (error) {
          console.error(error);
        }
  }

  const loadfunction = () => {
    fetchuserdetails();
  }
  useEffect(() => {
  if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
   loadfunction();
}, [])
  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <button onClick={loadfunction}>refresh</button>
    </div>
  )
};

export default User;
