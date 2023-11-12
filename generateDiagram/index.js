import { promises as fs } from 'fs';
import os from 'os';
import path from 'path';
import { randomUUID } from 'crypto';
import { run } from "@mermaid-js/mermaid-cli"

export default async function (context, req) {
    try {
        context.log('JavaScript HTTP trigger function processed a request.');
        context.log("Here")
        context.log(req.body)
        context.log("there")

        // Extract Mermaid syntax from the request
        const mermaidSyntax = req.body.diagram;
        const filename = `${Date.now()}-${randomUUID()}`;
        context.log(mermaidSyntax)

        // Step 1: Write to disk
        const mmdFilePath = path.join(os.tmpdir(), `${filename}.mmd`);
        const svgFilePath = `${mmdFilePath}.svg`;
        await fs.writeFile(mmdFilePath, mermaidSyntax);
        context.log(mmdFilePath)

        try {
            // Step 2: Generate SVG
            context.log("Running")
            await run(
                mmdFilePath, svgFilePath, // {optional options},
            )
            context.log("Ran")
        } catch (err) {
            context.log.error(err)
            context.res = {
                status: 400,
                body: {
                    error: "Error running Mermaid: " + err.message
                }
            };
            return
        }

        // Step 3: Read SVG into response

        const svgContent = await fs.readFile(svgFilePath, 'utf8');
        context.log(svgContent)

        // Cleanup temporary files
        await Promise.all([fs.unlink(mmdFilePath), fs.unlink(svgFilePath)]);

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {"svg":svgContent}
        };
    } catch (err) {
        context.log.error(err)
        context.res = {
            status: 500,
            body: {error: "Unexpected Exception"}
        };
    };
};