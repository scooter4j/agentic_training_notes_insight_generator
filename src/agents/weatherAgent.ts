import {tool} from "@openai/agents";
import z from "zod";

export const getWeatherTool = tool({
    name: "getWeatherTool",
    description: "Get the weather in a given location",
    parameters: z.object({
        location: z.string(),
    }),
    execute: async ({ location }) => {
        console.log("In the getWeather tool");
        return `The weather in ${location} is sunny`;
    },
});