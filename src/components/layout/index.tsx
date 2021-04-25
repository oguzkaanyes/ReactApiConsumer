import styled from "styled-components";
import React from 'react';

const StyledLayout = styled.div`
    display: flex;
    flex-direction: column;
`;

export function Layout({
    children
}: React.PropsWithChildren<any>) {
    return (
        <StyledLayout>
            {children}
        </StyledLayout>
    )
}