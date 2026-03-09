import styled from 'styled-components';




export const AdminHome = styled.div`
text-align: center;
.username{
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bolder;
    margin-bottom: 20px;
    padding: 5px;
    gap: 10px;
    font-size: 30px;
  }
.row-1{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px 5px;
    margin-bottom: 20px;
    .card{
        color: white;
        max-width: 290px;
        width: 100%;
        height: 206px;
        border-radius: 26px;
        text-align: center;
        padding: 10px 20px;
        box-shadow: -1px -4px 6px #fff;
        position: relative;
        cursor: pointer;
        h3{
            margin-bottom: 80px;
            font-size: 28px;
        }
        .users{
            position: absolute;
            top: 60px;
            left: 10px;
            size: 60px;
            transform: rotate(-60deg);
            transition: transform 0.6s ease;
            opacity: 0.5;
            
        }
        &:hover .users{
            transform: rotate(0deg);
        }
        p{
            font-size: 30px;
        }
         .mdpeo{
        fill: #70A6E8;
        background-color: #E4F0FF;
        border-radius: 20px;
    }
    .mdpen{
        fill: #F8964C;
        background-color: #FFEADA;
        border-radius: 20px;
    }
    .mdver{
        fill: #22A447;
        background-color: #DDF9E4;
        border-radius: 20px;
    }
    }
    .total-user{
 background-color: #3391D0;
    }
    .pending{
        background-color: #D15842;
    }
    .complete{
        background-color: #2BC255;
    }
    
   
}
    .chartBtn{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        button{
            max-width: 200px;
            width: 100%;
            padding: 10px 20px;
            border: none;
            border-radius: 10px;
            margin-bottom: 20px;
            cursor: pointer;
        }
        .active{
            background-color: black;
            color: white;
        }
    }
`

export const SideBarStyle = styled.div`
border-right: 1px solid black;
  max-width: 200px;
  width: 100%;
  padding: 10px 0px;
  .logo {
  margin-bottom: 20px;
  text-align: center;
  color: rgba(13, 83, 41, 1);
  font-size: 30px;
}
li {
  cursor: pointer;
  list-style-type: none;
  margin-bottom: 8px;
  background-color: rgba(196, 220, 211, 1);
  padding: 8px 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: rgba(91, 91, 91, 1);
}
.active {
  background-color: rgba(217, 217, 217, 1);
}
.logout{
    background-color: red;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 20px;
}
`
