import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Context } from "../../context/UserContext";
import { Receipt } from "../../types/Receipt";
import ReceiptCard from "../receiptCard/ReceiptCard";
import NoPastOrder from "../noPastOrder/NoPastOrder";

import styled from "styled-components";

type UserContextState = {
  currentUser: {
    userId: number | string;
  };
  updateCurrentUser: (user: any) => void;
};

const Container = styled.div`
  width: 600px;
`;

const PastOrders : React.FC = () =>{
    const { currentUser, updateCurrentUser } = useContext(
        Context) as UserContextState;

    const [receiptData, setReceiptData] = useState<Receipt[]>([]);

    async function getReceipts() {
        try{
            const { data } = await axios.get<Receipt[]>(
                "http://localhost:8000/receipts/readuser",
                {
                    headers: { "Acces-Control-Allow-Origin": "*" },
                    params: { id: currentUser.userId},
                }
            );
            setReceiptData(data);
            return;
        } catch (error){
            if (axios.isAxiosError(error)){
                console.log("Error message: ", error.message);
                return error.message;
            }
            else{
                console.log("Unexpected error: ", error);
                return "An unexptected error occurred";
            }
        }
    }

    useEffect(()=>{
        getReceipts();
    }, []);

    let user = localStorage.getItem("curUserI");

    return(
        <Container>
            { receiptData.length !== 0 ?
                (
                    receiptData.map((receipt) =>{
                        if (currentUser.userId.toString() === user){
                            return (
                                <ReceiptCard
                                    key={receipt.receiptNumber}
                                    items={receipt.items}
                                    userId={receipt.userId}
                                    receiptNumber={receipt.receiptNumber}
                                    dateTime={receipt.dateTime}
                                    total={Math.round(receipt.total * 100) / 100}
                                    />
                            );
                        }
                    })
                )
                :
                (
                    <NoPastOrder />
                )
            }
        </Container>
    );
};

export default PastOrders;