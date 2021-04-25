import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router"
import styled from "styled-components";
import { IPost } from "../interfaces/post.interface";
import { get } from "../services/rest-service";
import { PostCard } from "./post-card";

const StyledPosts = styled.section`
    width: 60%;
    margin: 0 auto;
    padding: 15px;
`;

export function Posts() {
    const { userId } = useParams<{ userId: string }>();
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>({});

    useEffect(() => {
        getPosts()
            .then(posts => setPosts(posts))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    const getPosts = useCallback(() => {
        return get(`users/${userId}/posts`);
    }, []);

    if (loading) return (<div>...loading</div>)
    if (error.message) return (<div>{error.message}</div>)

    return (
        <StyledPosts>
            <div>
                <h2>
                    User Posts
                </h2>
            </div>
            {
                posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))
            }

        </StyledPosts>
    )
}