import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let error = false;

  function refetchData() {
    setData([]);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Couldn't fetch data");

        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (errorMessage) {
        console.error("Custom error", errorMessage);
        error = true;
      } finally {
        setLoading(false);
      }
    }
    if (data.length === 0 && !error) fetchData();
  }, [data, url]);

  return { data, loading, refetchData };
}

export default useFetch;
