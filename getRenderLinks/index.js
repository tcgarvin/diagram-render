import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { randomUUID } from 'crypto';
import { run } from "@mermaid-js/mermaid-cli"

function stringToBase64(inputString) {
    return Buffer.from(inputString).toString('base64');
}

function generateMermaidLink(type, diagramCode) {
    const encodedDiagram = stringToBase64(diagramCode)
    return `https://mermaid.ink/${type}/${encodedDiagram}`
}

export default async function (context, req) {
    try {
        context.log('JavaScript HTTP trigger function processed a request.');

        // Extract Mermaid syntax from the request
        const mermaidSyntax = req.body.diagram;
        context.log(mermaidSyntax)

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {
                "imageLink": generateMermaidLink("img", mermaidSyntax),
                "svgLink": generateMermaidLink("svg", mermaidSyntax)
            }
        };
    } catch (err) {
        context.log.error(err)
        context.res = {
            status: 500,
            body: {error: "Unexpected Exception"}
        };
    };
};