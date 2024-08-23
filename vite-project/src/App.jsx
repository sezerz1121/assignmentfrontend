import { useState } from 'react';
import axios from 'axios';
import Links from './Component/Links';
function App() {
  const [file, setFile] = useState(null);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
  };

  const handleClick = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append('fileScan', file);

        const response = await axios.post(`${import.meta.env.VITE_APIURL}/scanner/scan`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('response:', response.data);

        if (response.data.success) {
          setFile(null);
        }

        if (response.data.data) {
          formatReceivedText(response.data.data); // Format the received text
        }
      } else {
        console.error('No file selected.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


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
      <input type='file' onChange={handleFileInput} />
      <button onClick={handleClick}>Upload</button>
            <div>
        {data.length > 0 ? data.slice().reverse().map(createLinks) : <p style={{color:"#F2F2F2"}}>No cards available</p>}
      </div>
    </>
  );
}

export default App;
