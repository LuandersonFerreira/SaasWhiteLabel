import axios from "axios";
import React, { useEffect, useRef} from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
    display: Flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10 px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
padding: 10px;
cursor: pointer;
border-radius: 5px;
border: none;
background-color: #2c73d2;
color: white;
height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDeafault();

        const user = ref.current;

        if(
            !user.nome.value ||
            !user.email.value ||
            !user.fone.value ||
        ) {
            return toast.console.warn("Preencha todos os campos!");
        }
    };

    if (onEdit) {
        await axios
        .put("colocar o localhost" + onEdit.id, {
            nome: user.nome.value,
            email: user.email.value,
            fone: user.fone.value,
        })
        .then(({ data }) => toast.sucess (data))
        .catch (({ data }) => toast.error (data));
    } else {
        await axios
        .post("colocar o localhost", {
            nome: user.nome.value,
            email: user.email.value,
            fone: user.fone.value,
        })
        .then(({ data }) => toast.sucess (data))
        .catch (({ data }) => toast.error (data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";

    setOnEdit(null);
    getUsers();
};

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"></Input>
            </InputArea>
            <InputArea>
                <Label>Contato</Label>
                <Input name="contato"></Input>
            </InputArea>
            <InputArea>
                <Label>Tipoe de convite</Label>
                <Input name="Tipo_de_convite"></Input>
            </InputArea>

            <Button type="submit">CONVIDAR</Button>
        </FormContainer>
    );
};

export default Form;