import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Table, IColumn } from "../components/table";
import { IUser } from "../interfaces/user.interface";
import { get } from "../services/rest-service";
import Modal from 'react-modal';
import clearIcon from '../clear.png'

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;

`;
const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        innerWidth: '400px',
        innerHeight: '400px'
    }
};

export function Home() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>({});
    const [isOpen, setIsOpen] = useState(false);
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
                    <Link to={`/posts/${row.id}`}>Posts</Link>
                    <button onClick={() => getAlbums(row)}>Albums</button>
                </div>
            )
        }
    ];
    const getAlbums = useCallback((row: IUser) => {
        return get(`users/${row.id}/albums`).then(albums => {
            setAlbums(albums);
            setIsOpen(true);
        })
    }, []);

    useEffect(() => {
        getUsers()
            .then(users => setUsers(users))
            .catch(err => setError(err))
            .finally(() => setLoading(false))
    }, [])

    const getUsers = useCallback(() => {
        return get("users");
    }, []);

    if (loading) return (<div>loading...</div>)
    if (error.message) return (<div>{error.message}</div>)

    return (
        <StyledHome>
            <h2>
                User Table
            </h2>
            <Table columns={columns} dataSource={users} rowKey="id" />
            <Modal isOpen={isOpen} style={modalStyles}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div onClick={() => setIsOpen(false)} style={{ display: 'inline-block', marginLeft: 'auto', cursor: 'pointer' }}>
                        <img width="24" src={clearIcon} alt="clear-icon" />
                    </div>
                    <div>
                        {
                            albums.map((album: any) => (
                                <div key={album.id}>
                                    <b>{album.id}. </b>
                                    {album.title}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </StyledHome>

    )
}

