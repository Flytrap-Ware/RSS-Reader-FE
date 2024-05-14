import { useState } from "react";
import PostItem from "./PostItem";
import PostModal from "./PostModal";
import { Post } from "@domain/post/type/PostType"

type Props = {
    posts: Post[]
}

export default function PostItemList({posts}: Props) {

    const [post, setPost] = useState<Post | undefined>();

    const setPostForModal = (post?: Post) => {
      setPost(post);
    };

    return (
      <>
        <div className="w-full flex flex-col p-4 gap-4">
          {posts &&
            posts.map((post: Post, index: number) => (
              <PostItem key={index} post={post} setPostForModal={setPostForModal} />
            ))}
        </div>
        {post && <PostModal post={post} setPostForModal={setPostForModal} />}
      </>
    );
}