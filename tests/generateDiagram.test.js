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
  // Check that the string starts with '<svg'
  expect(context.res.body).toMatch(/^<svg/);

  // Check that the length of the string is over 100 characters
  expect(context.res.body.length).toBeGreaterThan(100);
}, 10000);
