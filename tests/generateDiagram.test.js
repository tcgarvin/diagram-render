import generateDiagram from "../generateDiagram/index.js"
//const myFunction = require('../generateDiagram/index.js');

test('should process data correctly', async () => {
  // Arrange
  const diagram =`sequenceDiagram
  Bob ->> Alice: Hey
  Alice ->> Bob: Hi
  ` 
  const request = { body: diagram };
  var context = {log:function(anything){}};

  // Act
  await generateDiagram(context, request);

  // Assert
  expect(context.res).toBeDefined();
  expect(context.res.body).toBe(diagram);
});
