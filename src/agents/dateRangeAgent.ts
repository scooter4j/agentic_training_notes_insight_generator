import {Agent, run, tool, setTracingDisabled, Runner} from "@openai/agents";
import z from "zod";
//import {concatenateNotes} from "@/notesRetrieval/retrieveAndConcatenateNotes";
//import dotenv from "dotenv";
import {concatenatedNotes} from "@/data/concatenatedNotes";

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

export const getTrainingNotesTool = tool({
    name: "getDateRangeNotesTool",
    description: "getTrainingNotesTool",
    parameters: {
        "type": "object",
        "properties": {},
        "required": [],
        additionalProperties: false,
    },
    execute: async () : Promise<string> => {
        console.log(`[getTrainingNotesTool]: entering 'execute'`);
        //return await concatenateNotes(process.env.NOTES_SOURCE_PATH);
        return concatenatedNotes;
        //return "scott"
    },
});

export const dateRangeAgentAsTool  = tool({
    name: "dateRangeAgentTool",
    description: "Determine the date range spanned by the training notes.",
    parameters: {
        "type": "object",
        "properties": {},
        "required": [],
        additionalProperties: false,
    },
    execute: async () => {
        console.log(`[dateRangeAgentAsTool]: entering 'execute'`);
        const dateRangeAgent = new Agent({
            name: "Date Range Agent",
            instructions: "You are an expert at looking at the dates of each of the notes retrieved by the" +
                "getTrainingNotesTool. The notes for a given date are separated by 50 equals signs. The date for" +
                "each note is reflected in the note title as designated by the 'Title:' key. For example, " +
                "a given note might include the line `\"Title: Training Notes, 05/20/25\\n\"` - in this case the " +
                "note date is 05/20/2025.",
            model: "o4-mini",
            tools: [getTrainingNotesTool],
            //tools: []
        });
        return await (async () => {
            console.log(`[dateRangeAgentAsTool]: Current date and time: ${new Date().toLocaleString()}`);
            const result = await run(
                dateRangeAgent,
                "What is the date span of the training notes?"
            );
            console.log(`[dateRangeAgentAsTool]: After running dateRangeAgent; Current date and time: ${new Date().toLocaleString()}`);
            console.log(JSON.stringify(result, null, 2));
            //console.log(result.finalOutput);
        })();
    },
});