import OpenAI from 'openai';

export async function useTextAi(prompt:string):Promise<String> {
    const openai = new OpenAI({
        apiKey: process.env.NIM_API_KEY,
        baseURL: 'https://integrate.api.nvidia.com/v1',
    });

    try {
        const completion = await openai.chat.completions.create({
            model: "meta/llama-3.1-405b-instruct",
            messages: [{ "role": "user", "content": prompt }],
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 60,
            stream: true 
        });

        let fullResponse = ''; 

        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            fullResponse += content; 
        }

       return fullResponse

    } catch (error) {
        console.error("Eror generating question:", error);
        if (error.response) {
            console.error("Error response data:", error.response.data);
        }
    }
}

 
