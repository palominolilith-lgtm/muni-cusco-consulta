const encoder = new TextEncoder();

function toBase64Url(bytes) {
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(value) {
  return Buffer.from(
    value.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  );
}

async function sign(value) {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET no está configurado.");
  }

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(value)
  );

  return toBase64Url(new Uint8Array(signature));
}

export async function createSession(username) {
  const payload = {
    sub: username,
    exp: Date.now() + 8 * 60 * 60 * 1000
  };

  const data = toBase64Url(
    encoder.encode(JSON.stringify(payload))
  );

  const signature = await sign(data);

  return `${data}.${signature}`;
}

export async function verifySession(token) {
  try {
    const [data, signature] = token.split(".");

    if (!data || !signature) return false;

    const secret = process.env.AUTH_SECRET;

    if (!secret) return false;

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(signature),
      encoder.encode(data)
    );

    if (!valid) return false;

    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(data))
    );

    if (!payload.exp || payload.exp < Date.now()) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
