import { useState } from "react";
import { useParams } from "react-router-dom";

const Post = ({posts, postDetail}) => {

    const {postID} = useParams();
    console.log("PostId", postID);
    console.log(postDetail);
    
    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/posts/${postID}`).then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         console.log(resp);
    //         setPostDetail(resp);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     });
    // }, []);
    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`).then((res) => {
    //         return res.json();
    //     }).then((resp) => {
    //         console.log(resp);
    //         setComment(resp);
    //     }).catch((err) => {
    //         console.log(err.message);
    //     });
    // }, []);

    return(
        <div>
            <h1 className="font-bold text-2xl m-2 mt-8 underline">POST DETAILS</h1>
            {
                postDetail.map((post) => (
                <div class="rounded-lg bg-white shadow-lg m-56 p-6">
                <h1 class="mb-2 text-xl font-medium leading-tight text-neutral-800">{post.title}</h1>
                <p class="mb-4 text-base text-neutral-600">{post.body}</p>
                <p class="mb-4 text-base text-neutral-600 font-bold">Comment: {post.comment ? post.comment : <span className="font-normal">No Comments</span>}</p>
                    </div>
                ))
            }
        </div>
    )
}

export {Post};

