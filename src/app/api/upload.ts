import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { FormData as NodeFormData } from 'formdata-node';
import { FormDataEncoder } from 'form-data-encoder';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      req.on('data', chunk => chunks.push(new Uint8Array(chunk)));
      req.on('end', () => resolve(Buffer.concat(chunks.map(chunk => Buffer.from(chunk)))));
      req.on('error', err => reject(err));
    });

    const contentType = req.headers['content-type'] || 'application/octet-stream';
    const contentDisposition = req.headers['content-disposition'] || '';

    const form = new NodeFormData();
    form.append('video', buffer, 'upload.mp4');

    const encoder = new FormDataEncoder(form);

    try {
      const response = await axios.post('http://your-django-backend/upload-video/', Readable.from(encoder), {
        headers: {
          ...encoder.headers,
          'Content-Type': contentType,
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default handler;
