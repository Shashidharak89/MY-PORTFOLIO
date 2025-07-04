// app/api/leetcode/route.js

export async function POST(req) {
  try {
    const body = await req.json();
    const { username } = body;

    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username is required' }),
        { status: 400 }
      );
    }

    const query = {
      query: `
        query userProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              realName
              userAvatar
              ranking
              reputation
            }
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
          }
        }
      `,
      variables: { username },
    };

    const leetRes = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    });

    if (!leetRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch from LeetCode' }),
        { status: 500 }
      );
    }

    const result = await leetRes.json();
    return new Response(JSON.stringify(result.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Leetcode API Error:', err);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}
