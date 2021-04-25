import styled from 'styled-components';
import logo from '../../logo.png';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 8px 16px;
    background-color: #f5f5f5;
`;

const Logo = styled.img`
    height: 80%;
`;

const NavBar = styled.nav`
    ul {
        display: flex;
        list-style: none;
        li {
            margin-right: 1rem;
        }
    }
`;
export function Header() {
    return (
        <StyledHeader>
            <Logo src={logo} />
            <NavBar>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </NavBar>
        </StyledHeader>
    )
}