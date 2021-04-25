import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Table, IColumn } from "../components/table";
import { IUser } from "../interfaces/user.interface";
import { Get } from "../services/rest-service";

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;

`;

const columns: IColumn[] = [
    {
        title: 'Name',
        key: 'name',
    },
    {
        title: 'UserName',
        key: 'username',
    },
    {
        title: 'Email',
        key: 'email',
    },
    {
        title: 'Phone Nu',
        key: 'phone',
    },
    {
        title: 'Website',
        key: 'website',
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (row, col) => (
            <div className="actions-col">
                <Link to={`/posts/${row.id}`} onClick={() => holdUser(row)}>Posts</Link>
                <button onClick={() => openAlbums(row)}>Albums</button>
            </div>
        )
    }
];
function openAlbums(row: IUser) {
    localStorage.setItem("currentRow", JSON.stringify(row));
}
function holdUser(row: IUser) {
    localStorage.setItem("currentRow", JSON.stringify(row));
}

export function Home() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>({});

    useEffect(() => {
        getUsers()
            .then(users => {
                console.log(users)
                setUsers(users)
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    const getUsers = useCallback(() => {
        return Get("users");
    }, []);

    if (loading) return (<div>...loading</div>)
    if (error.message) return (<div>{error.message}</div>)

    return (
        <StyledHome>
            <h2>
                User Table
            </h2>   
            <Table columns={columns} dataSource={users} rowKey="id" />
        </StyledHome>
        
    )
}

