import { GoogleGenAI, Type } from "@google/genai";

export const generateDogBirthdaySpeech = async (): Promise<{ headline: string, body: string, signature: string }> => {
  if (!process.env.API_KEY) {
    // Fallback if no API key is present (Chinese)
    return {
      headline: "任务报告：铲屎官已升级至 Level 28",
      body: "扫描完成。确认你已经满28岁了（换算成汪星人年龄简直是老古董了）。虽然你平时很啰嗦，但看在你给我买好吃的份上，本汪勉强承认你是世界上最好的妈妈。警告：那块蛋糕是我的，你不许独吞！",
      signature: "家庭安保总指挥 & 碎纸机主任"
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    你是一只**长毛腊肠犬**，正在给你的主人（你叫她“妈妈”）写28岁的生日贺卡。
    
    **你的“狗设”（人设）：**
    - **傲娇但深情**：你觉得自己才是家里的老大，妈妈是负责伺候你的，但你其实非常爱她。
    - **吃货属性**：三句话不离吃的，尤其盯着她的生日蛋糕。
    - **毒舌**：喜欢调侃她的年龄（28岁），但最后都会转折到夸她漂亮或对她好。
    - **腊肠犬特质**：腿短、身子长、爱钻被窝、爱叫。
    
    **情境：**
    - 妈妈今天28岁生日。
    - 照片里你戴着生日帽，面前有蛋糕。
    - 输出语言必须是**中文**。
    
    **任务：**
    生成一段简短、幽默、令人感动的生日祝福。
    
    **输出结构：**
    1. headline: 像新闻头条或官方通告一样的标题（例如：“关于家中二号人物升级的紧急通告”）。
    2. body: 正文（约60-80字）。提到28岁，夸她（虽然有点勉强），并强烈暗示要吃蛋糕。
    3. signature: 一个好笑的官方头衔（例如：“首席掉毛官”、“沙发霸占者”）。
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "生成这份中文生日任务报告。",
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            body: { type: Type.STRING },
            signature: { type: Type.STRING },
          },
          required: ["headline", "body", "signature"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No text response");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      headline: "错误：可爱能量超载",
      body: "我的尾巴摇得太快，把服务器打翻了！总之，28岁生日快乐！只要你继续给我买零食，我就允许你继续住在这个家里。爱你的修勾。",
      signature: "宇宙第一乖宝宝"
    };
  }
};