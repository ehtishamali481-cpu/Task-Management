import styled from 'styled-components';



export const LoginPage = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
background-color: rgba(229, 229, 229, 1);
padding: 10px 30px;
.img{
    max-width: 600px;
    height: 550px;
}
form{
    background-color: #fff;
    padding: 20px 40px;
    h2{
        font-size: 36px;
    }
    h1{
        font-size: 46px;
        color: #6358DC;
        margin-bottom: 20px;
    }
    .box-1{
        max-width: 681px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        box-shadow: -1px 1px 5px #e5dbdb;
        padding: 10px ;
        margin-bottom: 20px;
    }
    .border{
        color: #BFBFBF;
        margin-bottom: 20px;
    }
    .input{
        max-width: 671px;
        padding: 10px 20px;
        background-color: #ECECEC;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
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
    .forgot{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        .check{
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .forgotPassword{
            color: #6358DC;
            cursor: pointer;
        }
    }
    .btn{
        max-width: 671px;
        width: 100%;
        background-color: #6358DC;
        color: white;
        border-radius: 5px;
        padding: 15px;
        cursor: pointer;
    }
}
`