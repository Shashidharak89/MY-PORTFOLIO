import bcrypt from 'bcryptjs';

const PEPPER_SECRET = process.env.PEPPER_SECRET;

export async function POST(req) {
  try {
    const { text, salt = true, pepper = false } = await req.json();

    if (!text) {
      return Response.json({ error: 'No text provided' }, { status: 400 });
    }

    let finalText = text;

    // Apply pepper if requested
    if (pepper) {
      finalText += PEPPER_SECRET;
    }

    let hash;

    if (salt) {
      const saltRounds = 12;
      const saltVal = await bcrypt.genSalt(saltRounds);
      hash = await bcrypt.hash(finalText, saltVal);
    } else {
      // Using default salt internally (not advised but possible for control)
      hash = await bcrypt.hashSync(finalText, '$2a$10$abcdefghijklmnopqrstuv'); // 22-char salt string
    }

    return Response.json({ hash });
  } catch (error) {
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
