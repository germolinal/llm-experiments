'use server'
import OpenAI from "openai";
import { Message, Origin } from "./types";
const { GoogleGenerativeAI } = require("@google/generative-ai");

import { LLM, AI_platform, llm_providers } from "./ai_providers"


function getPlatform(llm: LLM): AI_platform {
    const platform = llm_providers[llm]
    if (!platform) {
        throw new Error(`model '${llm}' has not been assigned any platform`)
    }
    return platform
}

async function googleCompletion(llm: LLM, txt: string): Promise<string> {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: llm });
    const res = await model.generateContent(txt)
    return res.response.text()
}

async function googleChat(llm: LLM, txt: string, history: Message[]): Promise<Message> {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: llm });
    const chat = model.startChat({
        history: history.map((msg: Message)=>{
            return {
                role: msg.origin === "user" ? msg.origin : "model",
                parts: [{text: msg.msg}]
            }
        }),
    })

    let result = await chat.sendMessage(txt)
    return {
        origin: "bot",
        msg: result.response.text()
    }
}

export async function getChat(llm: LLM, txt: string, history: Message[]): Promise<Message> {
    const p = getPlatform(llm)
    switch (p) {
        case "google":
            return googleChat(llm, txt, history)
        case "openai":
            console.log("open ai!!!")
            break
    }
    return { msg: `llm ${llm} of '${p}' is not yet supported`, origin: "bot" }
}

export async function getCompletion(llm: LLM, txt: string): Promise<string> {
    const p = getPlatform(llm)
    switch (p) {
        case "google":
            return googleCompletion(llm, txt)
        case "openai":
            console.log("open ai!!!")
            break
    }
    return `llm ${llm} of '${p}' is not yet supported`
}