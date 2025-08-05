import {RealtimeAgent} from "@openai/agents/realtime";
import {dateRangeAgentAsTool, getDateRangeInNotesTool} from "@/agents/dateRangeAgent";
import {getWeatherTool} from "@/agents/weatherAgent";

export const entryAgent = new RealtimeAgent({
    name: "Entry agent",
    instructions:
        "You are a voice agent that can redirect questions to task-specific agents. You are NOT to answer any " +
        "questions yourself - you must ALWAYS pass the query to the appropriate agent or tool." +
        "For date-range questions, use the getDateRangeAgentTool;" +
        "For weather-related questions, use the getWeatherTool tool.",
    handoffs: [],
    tools: [dateRangeAgentAsTool, getWeatherTool],
});