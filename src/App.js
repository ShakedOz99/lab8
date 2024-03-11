// App.jsx
import React, { useState, useEffect } from "react";

function App() {
  const [thumbnails, setThumbnails] = useState([]);
  const [fullSizeImage, setFullSizeImage] = useState(null);

  useEffect(() => {
    // Fetch thumbnails with specific dimensions
    fetch("https://picsum.photos/v2/list?limit=20")
      .then((response) => response.json())
      .then((data) => {
        const updatedThumbnails = data.map((item) => ({
          ...item,
          thumbnail_url: `https://picsum.photos/id/${item.id}/50/50`,
        }));
        setThumbnails(updatedThumbnails);
      })
      .catch((error) => {
        console.error("Error fetching thumbnails:", error);
      });
  }, []);

  // Function to show full-size image
  const showFullSize = (image) => {
    setFullSizeImage({
      id: image.id,
      url: `https://picsum.photos/id/${image.id}/350/350`,
    });
  };

  return (
    <div>
      {/* Thumbnails container */}
      <div className="thumbnails-container">
        {thumbnails.map((thumbnail) => (
          <div
            className="thumbnail"
            key={thumbnail.id}
            onClick={() => showFullSize(thumbnail)}
          >
            <img
              src={thumbnail.thumbnail_url}
              alt={`Thumbnail ${thumbnail.id}`}
            />
          </div>
        ))}
      </div>

      {/* Full-size image */}
      {fullSizeImage && (
        <div className="full-size">
          <img src={fullSizeImage.url} alt={`Full Size ${fullSizeImage.id}`} />
        </div>
      )}
    </div>
  );
}

export default App;
