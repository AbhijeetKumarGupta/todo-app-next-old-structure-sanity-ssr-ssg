import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure"; // deskTool replaced by this
import schemas from "./sanity/schemas";


export const config = defineConfig({
    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset: process.env.SANITY_DATASET || '',
    title: "Todo App",
    apiVersion: "2024-11-26",
    basePath: "/admin",
    plugins: [structureTool()],
    schema: { types: schemas }
})