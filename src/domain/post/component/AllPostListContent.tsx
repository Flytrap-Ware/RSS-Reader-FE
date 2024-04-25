import { useEffect, useState } from "react";
import { Post } from "../type/PostType";
import authAxios from "../../../utill/ApiUtills";
import { API_PATH } from "../../../constant/ApiPath";
import PostItemList from "./PostItemList";

export default function AllPostListContent() {

  let timeoutId: NodeJS.Timeout;

  const [page, setPage] = useState<number>(0);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts(0);
  }, []);

  const getAllPosts = async (page: number) => {
    authAxios
      .get(API_PATH.POST.GET_ALL, {
        params: {
          page: page,
        },
      })
      .then(function (response) {
        if (response.status == 200) {
          const newPosts = response.data.data.posts;
          setPosts([...posts, ...newPosts]);
        } else {
          throw new Error("Request failed: " + response.status);
        }
      });
  };

  // infinite-scroller
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // 스크롤이 화면 맨 밑에 닿았을 경우
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      // 기존에 설정된 타임아웃을 클리어
      clearTimeout(timeoutId);

      // 1초 후에 추가 데이터 로드
      timeoutId = setTimeout(() => {
        getAllPosts(page + 1);
        setPage(page + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [posts, page]);

  return (
    <PostItemList posts={posts} />
  );
}
