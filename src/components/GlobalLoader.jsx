"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let activeRequests = 0;

    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        activeRequests++;
        setIsLoading(true);
        return config;
      },
      (error) => {
        activeRequests--;
        if (activeRequests <= 0) {
          activeRequests = 0;
          setIsLoading(false);
        }
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        activeRequests--;
        if (activeRequests <= 0) {
          activeRequests = 0;
          setIsLoading(false);
        }
        return response;
      },
      (error) => {
        activeRequests--;
        if (activeRequests <= 0) {
          activeRequests = 0;
          setIsLoading(false);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div
        className="w-12 h-12 md:w-32 md:h-32 border-4 md:border-[5px] border-blue-900 border-t-transparent rounded-full animate-spin"
      />
    </div>
  );
}