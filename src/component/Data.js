import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

// basic query data fetching with react query
export default function Data() {
  const fetchPosts = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts");
  };

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "repoData",
    fetchPosts,
    {
      //   cacheTime: 5000,
      //   refetchOnMount: true, default behaviour  // true // false // always
      staleTime: 30000,
      refetchOnWindowFocus: true, // true // false // always
      refetchInterval: 10000, // data polling every seconds
      refetchIntervalInBackground: true, // data polling on background when window is not active
      enabled: false, // enable disable data polling on mount
      onSuccess: (data) => {
        console.log("data", data);
      },
      onError: (err) => {
        console.log("err", err);
      },
    }
  );

  if (isLoading || isFetching) return "Loading ....";
  if (error) return error.message;

  console.log({ isFetching: isFetching });

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <button onClick={refetch}>Refetch</button>
      {data?.data.map((p, i) => {
        return <div>{p.title}</div>;
      })}
    </div>
  );
}
