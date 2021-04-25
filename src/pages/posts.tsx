import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router"
import styled from "styled-components";
import { IPost } from "../interfaces/post.interface";
import { Get } from "../services/rest-service";
import commentIcon from '../comments.png';
const StyledPosts = styled.section`
    width: 60%;
    margin: 0 auto;
    padding: 15px;
    .post-container {
        box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
        padding: 20px;
        display: flex;
        margin-bottom: 1rem;
        flex-direction: column;
        .title, .body {
            margin-bottom: 1rem;
        }
        .footer {
            border-top: 2px solid #f2f2f2;
            padding: 15px 0;
            display: flex;
            div{
                display: inline-block;
                margin-left: auto;
                cursor: pointer;
            }
        }
    }
`;

export function Posts() {
    const { userId } = useParams<{ userId: string }>();
    const [posts, setPosts] = useState<IPost[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>({});

    useEffect(() => {
        getPosts()
            .then(posts => setPosts(posts))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    const getPosts = useCallback(() => {
        return Get(`users/${userId}/posts`);
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
                    <div key={post.id} className="post-container">
                        <div className="title">
                            <b>Title:</b> {post.title}
                        </div>
                        <div className="body">
                            <b>Body:</b> {post.body}
                        </div>
                        <div className="footer">
                            <div onClick={openAlbums}>
                                <img src={commentIcon} width="32" alt="comment-icon" />
                            </div>
                        </div>
                    </div>
                ))
            }

        </StyledPosts>
    )
}
function openAlbums() {
    console.log("deneme");
    
}
