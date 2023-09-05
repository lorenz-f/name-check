let usernameList = [];

export default async function handler(req, res) {
  const { username } = req.body;
  try {
    const availability = await checkUsernameAvailability(username);
    usernameList.push({ username, availability });
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function checkUsernameAvailability(username) {
  const availability = {};

  const instagramResponse = await fetch(`https://www.instagram.com/${username}`);
  availability.instagram = instagramResponse.status === 404;

  const twitterResponse = await fetch(`https://api.twitter.com/1.1/users/show.json?screen_name=${username}`);
  availability.twitter = twitterResponse.status === 404;

  const tiktokResponse = await fetch(`https://www.tiktok.com/@${username}`);
  availability.tiktok = tiktokResponse.status === 404;

  const redditResponse = await fetch(`https://www.reddit.com/api/username_available.json?user=${username}`);
  availability.reddit = await redditResponse.json();

  return availability;
}