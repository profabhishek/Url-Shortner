export const shortenUrlApi = async (url) => {
  const res = await fetch("http://localhost:8080/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
 
  if (!res.ok) throw new Error("Failed to shorten URL");
 
  const text = await res.text();
  let shortUrl;
 
  try {
    const data = JSON.parse(text);
    shortUrl = data.shortUrl ?? data.short_url ?? data.url ?? data;
  } catch {
    shortUrl = text;
  }
 
  return { shortUrl: String(shortUrl).trim() };
};
 