import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigation = useNavigate();
  useEffect(() => {
    document.title = "Page Not Found | Nafisarkar";
    setTimeout(() => {
      navigation("/");
    }, 2000); // Redirect after 2 seconds
  }, [navigation]);
  return (
    <div className="flex felx-col justify-center items-center"> Bulunamadı</div>
  );
};

export default NotFoundPage;
