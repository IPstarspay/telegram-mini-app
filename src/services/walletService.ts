import axios from 'axios';

export interface walletData {
    success: boolean;
    message: string;
    data: {
        telegram_id: number;
        name: string;
        document: number;
        birthdate: string;
    };
}

export const createAccount = async (telegram_id: number, name: string, document: number, birthdate: string, address: string, public_key: string): Promise<walletData> => {
    try {
        const response = await axios.post(`https://noble-hugely-warthog.ngrok-free.app/api/users/register_user/`,
            {
                telegram_id,
                name,
                document,
                birthdate,
                address,
                public_key,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${import.meta.env.VITE_API_KEY}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao registar o usuário:', error);
        throw new Error('Erro ao registar o usuário');
    }
};
