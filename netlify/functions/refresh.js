const CANNY_API_KEY = process.env.CANNY_API_KEY;

const ACTIVE_STATUS_IDS = [
  "6194db84fdece21ce2875aae",
  "6194db84fdece21ce2875aaf",
  "6194db84fdece21ce2875ab0",
];

const POST_URL_MAP = {
  "68559105e8d9cd53c4077b00": "https://titanmail.canny.io/admin/feedback/feature-requests/p/smtp-connection-at-domain-level",
  "68559054e8d9cd53c4054534": "https://titanmail.canny.io/admin/feedback/feature-requests/p/inbox-sorting-options-sort-by-senders-name-date",
  "68559061e8d9cd53c40576a9": "https://titanmail.canny.io/admin/feedback/feature-requests/p/export-backup-of-emails",
  "68559073e8d9cd53c405b1ff": "https://titanmail.canny.io/admin/feedback/calendar/p/integrate-titan-calendar-on-calendly",
  "685590dee8d9cd53c40703e6": "https://titanmail.canny.io/admin/feedback/feature-requests/p/email-list",
  "6855904fe8d9cd53c4053428": "https://titanmail.canny.io/admin/feedback/feature-requests/p/i-want-to-snooze-my-emails-to-see-them-later",
  "68559063e8d9cd53c4057b81": "https://titanmail.canny.io/admin/feedback/feature-requests/p/unified-inbox",
  "6855907de8d9cd53c405cf30": "https://titanmail.canny.io/admin/feedback/feature-requests/p/upgrade-single-account",
  "68559065e8d9cd53c40582e7": "https://titanmail.canny.io/admin/feedback/feature-requests/p/mobile-contacts-feature-on-mobile-app",
  "68559060e8d9cd53c4057393": "https://titanmail.canny.io/admin/feedback/calendar/p/add-email-to-calendar",
  "68559067e8d9cd53c4058812": "https://titanmail.canny.io/admin/feedback/calendar/p/zoom-invite-in-calendar",
  "6855907be8d9cd53c405c8e5": "https://titanmail.canny.io/admin/feedback/feature-requests/p/add-desktop-settings-to-mobile-app",
  "6855907fe8d9cd53c405d4f0": "https://titanmail.canny.io/admin/feedback/feature-requests/p/send-emails-via-alias-through-a-third-party-client",
  "68559098e8d9cd53c4062730": "https://titanmail.canny.io/admin/feedback/feature-requests/p/application-password-for-2fa",
  "69d478bb05af650ed9a4f64a": "https://titanmail.canny.io/admin/feedback/feature-requests/p/recall-emails-2",
  "68559072e8d9cd53c405ae8d": "https://titanmail.canny.io/admin/feedback/calendar/p/monthly-weekly-daily-calendar-view-option-in-mobile-app",
  "685590b1e8d9cd53c4067904": "https://titanmail.canny.io/admin/feedback/feature-requests/p/organize-folders",
  "685590b8e8d9cd53c4069217": "https://titanmail.canny.io/admin/feedback/feature-requests/p/new-messages-on-top-invert-chronology-of-threads",
  "685590c3e8d9cd53c406abaa": "https://titanmail.canny.io/admin/feedback/feature-requests/p/marking-outgoing-emails-as-urgentimportant",
  "6855906fe8d9cd53c405a1b2": "https://titanmail.canny.io/admin/feedback/feature-requests/p/translate-messages-directly-in-the-inbox",
  "685590fbe8d9cd53c4075b71": "https://titanmail.canny.io/admin/feedback/calendar/p/show-calendar-events-within-the-titan-email-app",
  "685590dfe8d9cd53c40709c2": "https://titanmail.canny.io/admin/feedback/feature-requests/p/option-to-enable-external-forwarders-for-accounts-from-admin-panel-1",
  "6855906ee8d9cd53c4059e30": "https://titanmail.canny.io/admin/feedback/feature-requests/p/paste-contact-using-right-click-option-on-mouse",
  "6855906fe8d9cd53c405a173": "https://titanmail.canny.io/admin/feedback/feature-requests/p/undo",
  "69dbf4f408b63c72325d8a77": "https://titanmail.canny.io/admin/feedback/feature-requests/p/unread-mails-must-look-more-bold-in-inbox-and-darker",
  "6855905de8d9cd53c40568b9": "https://titanmail.canny.io/admin/feedback/feature-requests/p/encrypted-emails",
  "685590fbe8d9cd53c4075c25": "https://titanmail.canny.io/admin/feedback/feature-requests/p/read-receipts-number-of-times-it-has-been-opened-and-the-times",
  "685590b5e8d9cd53c406860a": "https://titanmail.canny.io/admin/feedback/titan-bookings/p/creating-google-meets-zoom-links-etc",
  "685590c3e8d9cd53c406ab93": "https://titanmail.canny.io/admin/feedback/feature-requests/p/pls-add-email-checker-tool",
  "68eeb4d100f42319469e6da6": "https://titanmail.canny.io/admin/feedback/feature-requests/p/contacts-sorted-by-date-acquired",
  "685590a4e8d9cd53c4065385": "https://titanmail.canny.io/admin/feedback/calendar/p/create-event-from-ics-files",
  "6855908be8d9cd53c405fb18": "https://titanmail.canny.io/admin/feedback/calendar/p/calender-link-sharing-to-non-titan-users",
  "68559061e8d9cd53c40576c0": "https://titanmail.canny.io/admin/feedback/feature-requests/p/disbale-auto-image-loading-so-people-cant-track-opens",
  "685590abe8d9cd53c4066661": "https://titanmail.canny.io/admin/feedback/feature-requests/p/contacts-photograph-personalization-for-contacts",
  "685590ace8d9cd53c4066cb5": "https://titanmail.canny.io/admin/feedback/feature-requests/p/show-attachment-while-printing",
  "68559053e8d9cd53c405421e": "https://titanmail.canny.io/admin/feedback/feature-requests/p/creation-of-no-reply-email-boxes",
  "685590e6e8d9cd53c4071deb": "https://titanmail.canny.io/admin/feedback/feature-requests/p/resend-email-feature",
  "68559077e8d9cd53c405bbea": "https://titanmail.canny.io/admin/feedback/feature-requests/p/horizontal-preview-pane",
  "685590f5e8d9cd53c4074f05": "https://titanmail.canny.io/admin/feedback/feature-requests/p/read-receipts-data-around-who-hasnt-opened-the-email",
  "685590dee8d9cd53c407041f": "https://titanmail.canny.io/admin/feedback/feature-requests/p/label-add-rules-to-labels",
  "685590e6e8d9cd53c4071c5c": "https://titanmail.canny.io/admin/feedback/feature-requests/p/forms-for-easy-lead-or-feedback-collection-linked-with-email",
  "685590e1e8d9cd53c4071000": "https://titanmail.canny.io/admin/feedback/feature-requests/p/bulk-delete-delete-draft-emails",
  "685590a1e8d9cd53c40646f6": "https://titanmail.canny.io/admin/feedback/calendar/p/dark-mode-for-calendar",
  "69273a52cbfb44285ed43f1e": "https://titanmail.canny.io/admin/feedback/calendar/p/tasks-quero-adicionar-tarefas-ao-calendario",
  "689de02e07458aa0bcdcd41f": "https://titanmail.canny.io/admin/feedback/feature-requests/p/search-easier-way-to-find-emails",
};

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
    // Fetch up to 100 posts (2 pages)
    const [page1, page2] = await Promise.all([
      fetchIdeas(CANNY_API_KEY, 0),
      fetchIdeas(CANNY_API_KEY, 50),
    ]);

    const allPosts = [
      ...(page1.posts || []),
      ...(page2.posts || []),
    ];

    const mapped = allPosts.map(p => ({
      id: p.id,
      title: p.title,
      votes: p.score,
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
      url: POST_URL_MAP[p.id] || `https://titanmail.canny.io/admin/feedback/feature-requests/p/${p.urlName}`,
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
