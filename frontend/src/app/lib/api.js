const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function apiRequest(path, options = {}) {
  const { body, headers, ...rest } = options;
  const config = {
    credentials: "include",
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers
    },
    ...rest
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  if (data.success === false) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export {
  apiRequest,
  API_BASE_URL
};
