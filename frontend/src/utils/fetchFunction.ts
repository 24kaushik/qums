const fetchFunction = async (
  endpoint: string,
  method: RequestInit["method"] = "GET",
  body?: RequestInit["body"]
) => {
  const url = new URL(endpoint, import.meta.env.VITE_HOST);

  const options: RequestInit = {
    method,
    credentials: "include",
  };

  if (body && method !== "GET") {
    options.body = body;
  }

  try {
    const response = await fetch(url.toString(), options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return { data: json, status: response.status };
  } catch (err) {
    throw err; // rethrow so caller can handle if needed
  }
};

export default fetchFunction;
