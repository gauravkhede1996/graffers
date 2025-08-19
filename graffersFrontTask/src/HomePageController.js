import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function HomePageController() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);
  async function fetchCompanies(city = "") {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/getAllCompanies`,
          {
            city: city,
            name: "",
            sortBy: "name",
            sortOrder: "DESC",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setCompanies(response.data.companies || []);
      } catch (err) {
        console.error("Failed to fetch companies", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

  return { companies, loading, error, fetchCompanies };
}
