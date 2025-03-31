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

export const createAccount = async (telegram_id: number, name: string, document: number, birthdate: string, address: string, publicKey: string): Promise<walletData> => {
    try {
        const response = await axios.post(`https://noble-hugely-warthog.ngrok-free.app/register_user/`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorizarion': 'Token db68c97ecd7474e80fd8ea98f43718972eda739d',
            },
            params: {
                telegram_id: telegram_id,
                name: name,
                document: document,
                birthdate: birthdate,
                address: address,
                publicKey: publicKey,
            },
        }
        );
        return response.data;
    } catch (error) {
        console.error('Erro ao registar o usuário:', error);
        throw new Error('Erro ao registar o usuário');
    }
};
