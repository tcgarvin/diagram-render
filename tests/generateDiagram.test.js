import generateDiagram from "../generateDiagram/index.js"
//const myFunction = require('../generateDiagram/index.js');

test('should process data correctly', async () => {
  // Arrange
  const diagram =`sequenceDiagram
  Bob ->> Alice: Hey
  Alice ->> Bob: Hi
  ` 
  const request = { body: diagram }

  // Act
  const response = await myFunction(request);

  // Assert
  expect(response).toBeDefined();
  expect(response.body).toBe(diagram);
});
