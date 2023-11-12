//import { promises as fs } from 'fs';
//import os from 'os';
//import path from 'path';
//import { randomUUID } from 'crypto';
//import { run } from "@mermaid-js/mermaid-cli"

export default async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    console.log("Here")
    console.log(req.body)
    console.log("there")

    // Extract Mermaid syntax from the request
    const mermaidSyntax = req.body;
    const filename = `${Date.now()}`}
    console.log(mermaidSyntax)
    console.log(filename)

    // Step 1: Write to disk
    //const mmdFilePath = path.join(os.tmpdir(), `${filename}.mmd`);
    //const svgFilePath = `${mmdFilePath}.svg`;
    //await fs.writeFile(mmdFilePath, mermaidSyntax);
    //console.log(mmdFilePath)

    try {
        // Step 2: Generate SVG
        console.log("Running")
        //await run(
            //mmdFilePath, svgFilePath, // {optional options},
        //)
        console.log("Ran")
    } catch (error) {
        context.res = {
            status: 400,
            body: "Error running Mermaid."
        };
    }

    // Step 3: Read SVG into response
    //const svgContent = await fs.readFile(svgFilePath, 'utf8');
    console.log(mermaidSyntax)

    // Cleanup temporary files
    //await Promise.all([fs.unlink(mmdFilePath), fs.unlink(svgFilePath)]);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: svgContent
    };
};