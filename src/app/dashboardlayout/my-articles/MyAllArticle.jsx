"use client";
import axiosInstance from "@/api";
import { useEffect, useState } from "react";
import useAuth from "./../../../Hooks/useAuth";

const MyAllArticle = () => {
  const { user } = useAuth();
  const apiEndPoint = "/allArticle";
  const [myAllArticleData, setMyAllArticleData] = useState([]);

  useEffect(() => {
    const getAllPostData = async () => {
      try {
        const { data: res } = await axiosInstance.get(apiEndPoint);
        setMyAllArticleData(res);
      } catch (error) {
        console.error("Error fetching all post data:", error);
        // Assuming you have imported toast from some library
        toast.error("Failed to fetch post data.");
      }
    };
    getAllPostData();
  }, []);

  const myArticles = myAllArticleData.filter(
    (article) => article?.authorEmail === user?.email
  );

  return (
    <div className="">
        <div >
          <h1 className="bg-[#D7D7D7] w-36 mx-auto shadow-2xl rounded-2xl font-semibold p-5 mb-2 text-center m-2">Total Post: {myArticles?.length}</h1>
          </div>
      <div>
        {myArticles?.length === 0 && <div>You Have No Article</div>}
        {myArticles?.map((article, index) => (
          <div
            className="bg-[#D7D7D7] shadow-xl rounded-2xl m-2 p-2"
            key={article?._id}>
            

            <div className="grid justify-center items-center grid-cols-1 lg:grid-cols-8 gap-5">
              {/* <div className="lg:col-span-1">
                <h1 className="text-white text-center font-black text-xl lg:text-5xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
                  {index + 1}
                </h1>
              </div> */}
              <div className="lg:col-span-2 flex justify-center items-center">
                <img
                  className="h-36 lg:w-56 w-full rounded-xl object-cover  border-white border-2"
                  src={article?.imglink}
                  alt="Profile Image"
                />
              </div>
              <div className="lg:col-span-6  p-3">
                <h1 className="text-gray-800 font-black mb-3  text-2xl">
                  {article?.title}
                </h1>
                <p className="text-gray-700 text-justify">{article?.article.slice(0, 200)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAllArticle;
