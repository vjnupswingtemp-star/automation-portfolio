import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In the future, you can replace this URL with your actual n8n Webhook URL
    // e.g., const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/free-audit';
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    console.log('Received Audit Request:', data);

    if (webhookUrl) {
      // Forward the structured data to your n8n webhook
      // n8n will process it, append a row to Google Sheets, 
      // trigger the AI to write the proposal in a new column,
      // and wait for manual approval to generate the PDF.
      const apiToken = process.env.N8N_API_KEY;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (apiToken) {
        headers['Authorization'] = `Bearer ${apiToken}`;
      }

      await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
    }

    // For now, return a success response immediately so the UI shows the success state.
    return NextResponse.json({ success: true, message: 'Consultation request received successfully.' });
  } catch (error) {
    console.error('Error processing consultation request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process request. Please try again later.' },
      { status: 500 }
    );
  }
}
