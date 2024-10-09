'use client';
import { useState } from 'react';
import axios from 'axios';
import { Dropbox } from 'dropbox';

const VideoUploadForm = () => {
  const [video, setVideo] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadLink, setUploadLink] = useState('');

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!video) return;

    const dbx = new Dropbox({ accessToken: 'sl.B67hJnAo4r787fvhHUhJ3yp1CmmU9sFrqyq1Tmcw1iGQyMrcrKyatjv2gmoL3jvIMbT_8SxDj4TTkHgrnwo_TsBPSKV8iBWC5oMV1F53m9yJxywanOFFXzq5J_eCqb-L43Vgl9eO3hae98NmGJUIDt4' });

    try {
      // Read the video file as a blob
      const videoBlob = await video.arrayBuffer();

      // Upload the video to Dropbox
      const uploadResponse = await dbx.filesUpload({
        path: `/${video.name}`,
        contents: videoBlob,
        mode: { '.tag': 'add' },
        autorename: true,
        mute: false,
      });

      // Create a shared link for the uploaded file
      const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: uploadResponse.result.path_lower!,
      });

      const dropboxUrl = sharedLinkResponse.result.url;

      // Send video details to the Django backend
      const response = await axios.post('http://localhost:8000/api/v0/admin/upload-video/', {
        title,
        description,
        dropbox_url: dropboxUrl,
      });

      if (response.status === 201) {
        setUploadLink(dropboxUrl);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleUpload}>Upload Video</button>
      {uploadLink && (
        <div>
          <a href={uploadLink} target="_blank" rel="noopener noreferrer">
            View Uploaded Video
          </a>
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;