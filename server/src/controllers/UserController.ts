import { Request, Response } from "express";
import prisma from "@database";

export const createCalcado = async (req: Request, res: Response) => {
    try{
        const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;

        if (!nome_produto || ! cor || !marca || !tamanho || !preco || !quantidade_em_estoque){
            return res.status(404).json({
                message: "Preencha todas as informações obrigatórias"
            })
        }

        const calcado = await prisma.calcado.create({
            data: {
                nome_produto, 
                cor, marca, 
                tamanho, 
                preco, 
                quantidade_em_estoque,
            }
        })

        return res.status(201).json({
                message: "Calçado adicionado com sucesso"
            })

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao adicionar calçado",
            error,
        })
    }

}

export const readAllCalcados = async (req: Request, res: Response) => {
    try {

        const calcados = await prisma.calcado.findMany();

        if (!calcados){
            return res.status(404).json({
                message: "Nenhum calçado adicionado ainda."
            })
        }

        return res.status(200).json(calcados)

    } catch (error){
        return res.status(400).json({
            message: "Erro ao buscar calçados",
            error,
        })
    }
}

export const updateCalcado = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const idNumber = Number(id);
        const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque} = req.body;
        const calcado = await prisma.calcado.update({
            data: {
                nome_produto, 
                cor, marca, 
                tamanho, 
                preco, 
                quantidade_em_estoque,
            },
            where: {
                id: idNumber,
            }
        })

        return res.status(200).json({
            message: "Calçado atualizado com sucesso"
        })

    } catch (error){
        return res.status(400).json({
            message: "Erro ao tentar atualizar calçado",
            error,
        })
    }
}

export const deleteCalcados = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const idNumber = Number(id);

        if (!id) {
            return res.status(404).json({
                message: "Calçado não encontrado"
            })
        }

        const calcado = await prisma.calcado.delete({
            where: {
                id: idNumber,
            }
        })

        return res.status(200).json({
            message: "Calçado deletado com sucesso"
        })

    } catch (error){
        return res.status(400).json({
            message: "Erro ao tentar deletar calçado",
            error,
        })
    }
}