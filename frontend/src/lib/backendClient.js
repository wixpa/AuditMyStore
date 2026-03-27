export function getApiBaseUrl() {
  // Vite exposes env vars starting with VITE_*
  return import.meta.env.VITE_API_BASE_URL;
}

async function fetchJson(url, options = {}, timeoutMs = 4000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });
    const text = await resp.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }
    if (!resp.ok) {
      return { ok: false, status: resp.status, message: data?.message || "Request failed", data };
    }
    return { ok: true, status: resp.status, data };
  } finally {
    clearTimeout(t);
  }
}

export async function checkBackendHealth() {
  const base = getApiBaseUrl();
  const url = `${base}/api/health`;
  const res = await fetchJson(url, { method: "GET" }, 2000);
  return !!res.ok;
}

export async function apiLogin(email, password) {
  const base = getApiBaseUrl();
  const url = `${base}/api/auth/login`;
  const res = await fetchJson(url, { method: "POST", body: JSON.stringify({ email, password }) });
  if (!res.ok) return { success: false, message: res.message || "Login failed." };
  return { success: true, token: res.data?.token, user: res.data?.user };
}

export async function apiSignup(name, email, password) {
  const base = getApiBaseUrl();
  const url = `${base}/api/auth/signup`;
  const res = await fetchJson(url, { method: "POST", body: JSON.stringify({ name, email, password }) });
  if (!res.ok) return { success: false, message: res.message || "Signup failed." };
  return { success: true, token: res.data?.token, user: res.data?.user };
}

export async function apiMe(token) {
  const base = getApiBaseUrl();
  const url = `${base}/api/auth/me`;
  const res = await fetchJson(
    url,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token || ""}` },
    },
    4000
  );
  if (!res.ok) return { success: false, message: res.message || "Unauthorized" };
  return { success: true, user: res.data?.user };
}

export async function apiSaveAnonymousEmail({ email, storeOrigin }) {
  const base = getApiBaseUrl();
  const url = `${base}/api/audit/anonymous-email`;
  const res = await fetchJson(url, {
    method: "POST",
    body: JSON.stringify({ email, storeOrigin }),
  });
  return res.ok;
}

