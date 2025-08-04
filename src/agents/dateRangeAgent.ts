import {Agent, run, tool, setTracingDisabled} from "@openai/agents";
import z from "zod";
//import dotenv from "dotenv";

//dotenv.config();
setTracingDisabled(true);

const getWeather = tool({
    name: "getWeather",
    description: "Get the weather in a given location",
    parameters: z.object({
        location: z.string(),
    }),
    execute: async ({ location }) => {
        console.log("In the getWeather tool");
        return `The weather in ${location} is sunny`;
    },
});

export const getDateRangeTool = tool({
    name: "getDateRangeTool",
    description: "Date Range Agent",
    parameters: {
        "type": "object",
        "properties": {},
        "required": [],
        additionalProperties: false,
    },
    execute: async () => {
        console.log(`[getDateRangeTool]: entering 'execute'`);
        return `The date range of the set of training notes is A to B`;
    },
});

export const getDateRangeAgentTool  = tool({
    name: "getDateRangeAgentTool",
    description: "Determine the date range spanned by the training notes.",
    parameters: {
        "type": "object",
        "properties": {},
        "required": [],
        additionalProperties: false,
    },
    execute: async () => {
        console.log(`[getDateRangeTool]: entering 'execute'`);
        const dateRangeAgent = new Agent({
            name: "Date Range Agent",
            //instructions: "You are an expert at looking at managing the retrieval of the date span of the provided notes. ",
            instructions: "You are an expert at Civil War history. ",
            model: "o4-mini",
            //tools: [getDateRangeTool],
        })
    },
});