import styled from 'styled-components';





export const RegisterStyle = styled.div`
max-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
form{
    background-color: transparent;
    padding: 10px 30px;
    box-shadow: -1px -4px 9px black;
    border-radius: 20px;
    h1{
        margin-bottom: 10px;
        text-align: center;
        color: #6358DC;
    }
    h2{
        margin-bottom: 10px;
        text-align: center;
    }
    .input{
        max-width: 671px;
        padding: 10px 20px;
        background-color: transparent;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        border: 1px solid black;
        border-radius: 10px;
        input{
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            font-weight: 800;
        }
    }
    .password{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .row-1{
            display: flex;
            align-items: center;
            gap: 10px;
        }
    }
    .btn-1{
        max-width: 671px;
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
        color: #fff;
        padding: 10px;
        border: none;
        background-color: #6358DC;
        margin-bottom: 20px;
    }
    .select{
        padding: 20px 0px;
    }
}
`