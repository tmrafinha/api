import { Router, Request, Response } from "express";
import axios from "axios";

// Definindo as interfaces para os dados recebidos
interface PaymentDetails {
    name: string;
    document: string;
    key: string;
    keyType: string;
}

interface PaymentRequestBody {
    amount: number;
    campaign: string;
    type: string;
    details: PaymentDetails;
}

// Inicializando o router
export const paymentRoutes = Router();

// Endpoint "/pixteste"
paymentRoutes.post("/pixteste", async (req: Request<{}, {}, PaymentRequestBody>, res: Response) => {
    try {
        const { amount, campaign, type, details } = req.body;

        // Validação básica
        if (!amount || !campaign || !type || !details) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const { name, document, key, keyType } = details;

        if (!name || !document || !key || !keyType) {
            return res.status(400).json({ error: "Missing details fields" });
        }

        // Realizando a chamada à API externa
        const publicKey = "6a07ce89-6562-4628-bb77-7a84c5893f19";
        const privateKey = "50503be4033674ceef994aa43a539f97989d38de5868f4d4b50af8d680997b75";

        try {
            const response = await axios.post(
                "https://api.pronttus.com.br/v1/payment/withdraw/vsl",
                {
                    amount,
                    campaign: campaign,
                    type,
                    details: {
                        name,
                        document,
                        key,
                        keyType
                    }
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-client-id": publicKey,
                        "x-client-secret": privateKey
                    }
                }
            );

            console.log("API Response:", response.data);

            // Respondendo ao cliente com sucesso
            return res.status(200).json({
                message: "Payment processed successfully",
                data: response.data
            });
        } catch (apiError) {
            console.error("Error calling external API:", apiError);
            return res.status(500).json({ error: "Error calling external API" });
        }

    } catch (error) {
        console.error("Error processing payment:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});
