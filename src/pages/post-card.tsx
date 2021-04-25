import styled from "styled-components";
import { IPost } from "../interfaces/post.interface";
import commentIcon from '../comments.png';
import { useCallback, useEffect, useState } from "react";
import { get } from "../services/rest-service";

const StyledPostCard = styled.div`
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
                margin-left: 1rem;
                cursor: pointer;
            }
            span {
                margin-left: auto;
                color: #8a8af3;
            }
        }
        .expandable {
            overflow: hidden;
            .comment-container {
                margin-left: 3rem;
                .comment {
                    background-color: #f5f5f5;
                    border-left: 2px solid;
                    padding: 10px 15px;
                    margin-bottom: 1rem;
                }
            }
        }
`;
type PostCardType = {
    post: IPost
}
export function PostCard({
    post
}: PostCardType) {
    const [isExpand, setExpand] = useState(false);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>({});

    const getCommnets = useCallback(() => {
        return get(`posts/${post.id}/comments`);
    }, []);

    useEffect(() => {
        getCommnets()
            .then(comments => setComments(comments))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (<div>...loading</div>)
    if (error.message) return (<div>{error.message}</div>)

    return (
        <StyledPostCard>
            <div className="title">
                <b>Title:</b> {post.title}
            </div>
            <div className="body">
                <b>Body:</b> {post.body}
            </div>
            <div className="footer">
                <span>(please click button to open all comments) -- </span>
                <div onClick={() => setExpand(!isExpand)}>
                    <img src={commentIcon} width="32" alt="comment-icon" />
                </div>
            </div>
            <div className="expandable" style={{ height: !isExpand ? '0' : 'auto' }}>
                <div>
                    <h2>
                        All Comments
                    </h2>
                </div>
                {
                    comments.map((comment: any) => (
                        <div key={comment.id} className="comment-container" >
                            <div className="comment">
                                <div><b>Email:</b> {comment.email}</div>
                                <div><b>Name:</b> {comment.name}</div>
                                <div><b>Body:</b> {comment.body}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </StyledPostCard>
    )
}