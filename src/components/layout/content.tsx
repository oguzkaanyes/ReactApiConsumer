import React from 'react';
import styled from 'styled-components';

const StyledContent = styled.main`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
`;

export function Content({
    children
}: React.PropsWithChildren<any>) {
    return (
        <StyledContent>
            {children}
        </StyledContent>
    )
}