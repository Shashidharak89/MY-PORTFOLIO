import { NextResponse } from 'next/server';
import cloudinary from '../../../backend/utils/cloudinary.js';

export async function POST(req) {
  try {
    const contentType = req.headers.get('content-type') || '';
    let fileToUpload = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') || formData.get('image');

      if (!file) {
        return NextResponse.json({ error: 'No image file provided in form data' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || 'image/jpeg';
      fileToUpload = `data:${mimeType};base64,${buffer.toString('base64')}`;
    } else {
      const body = await req.json();
      fileToUpload = body.file || body.image || body.url;
    }

    if (!fileToUpload) {
      return NextResponse.json({ error: 'Image file or base64 data is required' }, { status: 400 });
    }

    const uploadResult = await cloudinary.uploader.upload(fileToUpload, {
      folder: 'portfolio_blogs',
    });

    return NextResponse.json(
      {
        success: true,
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to upload image to Cloudinary',
      },
      { status: 500 }
    );
  }
}
