import { run } from "@mermaid-js/mermaid-cli"

export default async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const mermaidCode = req.body;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: mermaidCode
    };
}
