import { run } from "@mermaid-js/mermaid-cli"

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const mermaidCode = `
sequenceDiagram
    ${name} ->> Other: Hey
    Other ->> ${name}: Yo
`
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: mermaidCode
    };
}
