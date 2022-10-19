import styled from "styled-components";

export default function SignUp() {
    return (
        <Wrapper>
            <aside>
                <h1>linkr</h1>
                <h3>save, share and discover<br />the best links on the web</h3>
            </aside>
            <form>
                
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.main`
    display: flex;
    width: 100vw;
    height: 100vh;
    
    aside {
        background-color: var(--background-black);
        width: 63%;
        height: 100%;
        color: var(--main-white);
    }

    form {
        background-color: var(--background-gray);
        width: 37%;
        height: 100%;
    }
`;