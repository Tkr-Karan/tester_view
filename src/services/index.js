export const fetchPublishedData = async () => {
  try {
    const response = await fetch("/api/published/published-data");
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
};
