import { Request, Response } from "express";
import prisma from "@database";

export const getCalcadosByTamanho = async (req: Request, res: Response) => {
    try {
        const { tamanho } = req.params;
        const tamanhoNumber = Number(tamanho);

        if (isNaN(tamanhoNumber)) {
            return res.status(400).json({
                message: "Tamanho inválido"
            });
        }

        const calcados = await prisma.calcado.findMany({
            where: {
                tamanho: tamanhoNumber
            }
        });

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar calçados por tamanho",
            error,
        });
    }
}

export const getCalcadosByMarca = async (req: Request, res: Response) => {
    try {
        const { marca } = req.params;

        const calcados = await prisma.calcado.findMany({
            where: {
                marca: marca
            }
        });

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar calçados por marca",
            error,
        });
    }
}

export const getTotalEstoque = async (req: Request, res: Response) => {
    try {

        const total = await prisma.calcado.aggregate({
            _sum: {
                quantidade_em_estoque: true
            }
        });

        return res.status(200).json({
            total_pares: total._sum.quantidade_em_estoque || 0
        });

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao calcular total do estoque",
            error,
        });
    }
}