import { getConfigConst } from './configValues';

class AppointmentSender {
    private static MessageTemplate = (name: string, contactLinks: { [key: string]: string | undefined }, details?: string) => `Имя: ${name}\nКонтакты:
\t${Object.entries(contactLinks)
            .filter(([key, value]) => value?.trim())
            .map(([key, value]) => key + ": " + value?.trim())
            .join("\n\t")}
${details ? "Детали:\n\t" + details : "Детали отсутствуют"}
    `;

    public static async SendMessage(senderInfo: { name: string, contactLinks: { [key: string]: string }, details?: string }){
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        const options = {
            method: "POST",
            body: JSON.stringify({ 
                chat_id: import.meta.env.VITE_BOT_CHAT_ID,
                text: AppointmentSender.MessageTemplate(senderInfo.name, senderInfo.contactLinks, senderInfo.details)
            }),
            headers: headers
        };

        const url = (getConfigConst('telegramAppointmentBotApiUrl') as string).replace('{API_KEY}', import.meta.env.VITE_BOT_KEY);
        
        const result = await fetch(url, options);

        return result.ok;
    }
};

export default AppointmentSender;