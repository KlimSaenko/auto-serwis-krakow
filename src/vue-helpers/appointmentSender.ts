import { getConfigConst } from './configValues';

class AppointmentSender {
    private static MessageTemplate = (name: string, contactLinks: { [key: string]: string }, details: { [key: string]: string }) =>
            `Имя: ${name}\n`
            .concat(Object.entries(contactLinks)
                    .filter(([key, value]) => value?.trim())
                    .map(([key, value]) => (getConfigConst("appointmentForm." + key) || key) + ": " + value?.trim())
                    .join("\n"))
            .concat("\n")
            .concat("Детали:\n\t\t"
                .concat(Object.entries(details)
                        .filter(([key, value]) => value?.trim())
                        .map(([key, value]) => (getConfigConst("appointmentForm." + key) || key) + ": " + value?.trim())
                        .join("\n\t\t")))
    ;

    public static async SendMessage(senderInfo: { name: string, contactLinks: { [key: string]: string }, details: { [key: string]: string } }){
        let ok = AppointmentSender.MessageTemplate(senderInfo.name, senderInfo.contactLinks, senderInfo.details);
        try {
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
        } catch (error) {
            return false;
        }
    }
};

export default AppointmentSender;