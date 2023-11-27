import axios from 'axios'

describe('POST /api/getRenderLinks', () => {
  it('should send a mermaid diagram, receive a link, and fetch SVG from that link', async () => {
    const DIAGRAM = 'sequenceDiagram\nAlice->>Bob: Hello Bob, how are you?\nNote right of Bob: Bob thinks\nBob-->>Alice: I am good thanks!';
    
    // Send POST request to get the render link
    const postResponse = await axios.post(`${global.HOSTNAME}/api/getRenderLinks`, {
      diagram: DIAGRAM
    });

    expect(postResponse.status).toBe(200);
    expect(postResponse.data).toHaveProperty('svgLink');

    const svgLink = postResponse.data.svgLink;

    // Send request to the svgLink to get SVG content
    const svgResponse = await axios.get(svgLink);
    
    expect(svgResponse.status).toBe(200);
    expect(svgResponse.headers['content-type']).toBe('image/svg+xml');
  });
});
