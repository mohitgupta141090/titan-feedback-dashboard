const CANNY_API_KEY = process.env.CANNY_API_KEY;

const ACTIVE_STATUS_IDS = [
  "6194db84fdece21ce2875aae",
  "6194db84fdece21ce2875aaf",
  "6194db84fdece21ce2875ab0",
];

async function fetchIdeas(apiKey, skipCount = 0) {
  const res = await fetch("https://canny.io/api/v1/posts/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey,
      limit: 50,
      skip: skipCount,
      sort: "score",
      status: "open,under review,planned",
    }),
  });
  return res.json();
}

async function fetchVotesPage(apiKey, skip) {
  const res = await fetch("https://canny.io/api/v1/votes/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ apiKey, limit: 100, skip }),
  });
  return res.json();
}

async function getVotes30d(apiKey) {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const counts = {};
  let skip = 0;

  while (true) {
    const result = await fetchVotesPage(apiKey, skip);
    const votes = result.votes || [];
    if (!votes.length) break;

    let inRange = 0;
    for (const v of votes) {
      if (v.created >= cutoff) {
        const pid = v.post.id;
        counts[pid] = (counts[pid] || 0) + 1;
        inRange++;
      }
    }

    if (inRange === 0 || !result.hasMore) break;
    skip += 100;
  }

  return counts;
}

exports.handler = async function (event, context) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (!CANNY_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "CANNY_API_KEY not set in environment variables" }),
    };
  }

  try {
    const [page1, page2, votes30d] = await Promise.all([
      fetchIdeas(CANNY_API_KEY, 0),
      fetchIdeas(CANNY_API_KEY, 50),
      getVotes30d(CANNY_API_KEY),
    ]);

    const allPosts = [
      ...(page1.posts || []),
      ...(page2.posts || []),
    ];

    const mapped = allPosts.map(p => ({
      id: p.id,
      title: p.title,
      votes: p.score,
      votes30d: votes30d[p.id] || 0,
      commentCount: p.commentCount,
      created: p.created,
      portalStatusId: p.status === "open"
        ? "6194db84fdece21ce2875aae"
        : p.status === "under review"
        ? "6194db84fdece21ce2875aaf"
        : p.status === "planned"
        ? "6194db84fdece21ce2875ab0"
        : p.status === "in progress"
        ? "6194db84fdece21ce2875ab1"
        : p.status === "complete"
        ? "6194db84fdece21ce2875ab2"
        : "6194db85fdece21ce2875ad1",
      url: `https://titanmail.canny.io/admin/feedback/feature-requests/p/${p.urlName}`,
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ posts: mapped, fetchedAt: new Date().toISOString() }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
