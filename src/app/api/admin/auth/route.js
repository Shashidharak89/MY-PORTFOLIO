import bcrypt from 'bcryptjs';

// Bcrypt hash provided for admin password
const ADMIN_HASH = '$2b$12$ykH.K2rZKXu18q7oub6h4Otg.MgasXremC/P/0mmASRp9so3G01Q2';

export async function POST(req) {
  try {
    const { password } = await req.json();

    if (!password) {
      return Response.json({ success: false, error: 'Password is required' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, ADMIN_HASH);

    if (isMatch) {
      return Response.json({ success: true, message: 'Authenticated successfully' }, { status: 200 });
    } else {
      return Response.json({ success: false, error: 'Invalid admin password' }, { status: 401 });
    }
  } catch (error) {
    console.error('Admin authentication error:', error);
    return Response.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}
