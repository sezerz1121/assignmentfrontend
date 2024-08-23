import { useState, useEffect } from 'react';
import Links from './component/Links';  // Make sure the path is correct
import axios from 'axios';  // Make sure axios is installed and imported

function Home() {
  
  const [data, setData] = useState([]); // Initialize useState with an empty array

  // Function to create Links components
  function createLinks(item) {
    return (
      <Links
        key={item._id}
        link={item.file}
      />
    );
  }

  // Fetch user cards from the API
  const fetchUserCards = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APIURL}/scanner/data`);
      setData(response.data);  // Update state with fetched data
    } catch (error) {
      console.error("Error fetching user cards:", error);
    }
  };

  // Use useEffect to call fetchUserCards on component mount
  useEffect(() => {
    fetchUserCards();
  }, []);  // Empty dependency array to run it once

  return (
    <>
      <div>
        {data.length > 0 ? data.slice().reverse().map(createLinks) : <p style={{color:"#F2F2F2"}}>No cards available</p>}
      </div>
    </>
  );
}

export default Home;
