/**
 * Service to send messages via WhatsApp Cloud API
 * Note: You need to set up a Meta Developer App to get these credentials.
 */

const WHATSAPP_TOKEN = "YOUR_META_ACCESS_TOKEN"; // Replace with your Permanent Access Token
const PHONE_NUMBER_ID = "YOUR_PHONE_NUMBER_ID"; // Replace with your Phone Number ID

export const sendWhatsAppMessage = async (recipientNumber, messageText) => {
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: recipientNumber,
        type: "text",
        text: {
          body: messageText
        }
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to send message');
    }
    return data;
  } catch (error) {
    console.error('WhatsApp API Error:', error);
    throw error;
  }
};
