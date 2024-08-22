import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(fetchFunction: () => Promise<AxiosResponse<T>>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFunction();
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
      } catch (error:any) {
        console.log("oiiii")
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
      }
    };

    fetchData();
  }, [fetchFunction]);

  return state;
}

export default useFetch;
