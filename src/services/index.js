export const fetchPublishedData = async () => {
  try {
    const response = await fetch("/api/published/published-data");
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw error;
  }
};

export const fetchTestedBlockById = async (blockID) => {
  try {
    const response = await fetch(`/api/published/published-block/${blockID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
