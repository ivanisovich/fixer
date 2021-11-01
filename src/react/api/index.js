const apiKey = "56610d3dbb638e031ea042b16663561b"

export const getLatestCurrencies = async () => {
  try {
    const response = await fetch(
      "http://data.fixer.io/api/latest?access_key="+apiKey
    );
    if (!response.ok) {
      throw new Error("Ответ сети был не ok.");
    }

    return response.json();
  } catch (error) {
    console.log("Возникла проблема с вашим fetch запросом: ", error.message);
  }
};
export const getFullCurrenciesName = async () => {
  try {
    const response = await fetch(
      "http://data.fixer.io/api/symbols?access_key="+apiKey
    );
    if (!response.ok) {
      throw new Error("Ответ сети был не ok.");
    }

    return response.json();
  } catch (error) {
    console.log("Возникла проблема с вашим fetch запросом: ", error.message);
  }
};
