// src/app/api/upload/route.ts

// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest) {
//     console.log('-------------------------------------', "heracles")
//   const formData = await req.formData();
//   const videoFile = formData.get('video') as File;

//   if (!videoFile) {
//     return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
//   }

//   const form = new FormData();
//   form.append('file', videoFile, videoFile.name);

//   try {
//     const response = await axios.post('http://127.0.0.1:8000/api/upload-video/', form, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//     return NextResponse.json(response.data, { status: 200 });
//   } catch (error) {
//     const errorMessage = (error as Error).message || 'An error occurred';
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }
