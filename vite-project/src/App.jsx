import { useState } from 'react';
import axios from 'axios';

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

  return (
    <>
      <input type='file' onChange={handleFileInput} />
      <button onClick={handleClick}>Upload</button>
    </>
  );
}

export default App;
