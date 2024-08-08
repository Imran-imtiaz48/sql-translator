import fetch from "isomorphic-unfetch";

const translateToHuman = async (query, apiKey) => {
  // Validate inputs
  if (!query || !apiKey) {
    throw new Error("Missing query or API key.");
  }

  const apiUrl = "https://api.openai.com/v1/completions";
  const requestBody = {
    prompt: `Translate this SQL query into natural language:\n\n"${query}"\n\nNatural language query:`,
    temperature: 0.5,
    max_tokens: 150, // Adjusted to a more reasonable number
    model: "text-davinci-003",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", response.status, errorData);
      throw new Error(errorData.error?.message || "Error translating to human language.");
    }

    const data = await response.json();
    return data.choices[0]?.text?.trim() || "No translation available.";
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export default translateToHuman;
