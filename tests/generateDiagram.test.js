import generateDiagram from "../generateDiagram/index.js"
//const myFunction = require('../generateDiagram/index.js');

function getContext() {
  var context = {log:function(anything){console.log(anything)}};
  context.log.error = function(anything){console.log(anything)};
  return context;
}

test('invalid diagram', async () => {
  // Arrange
  const diagram =`dfhgjh`
  const request = { body: {diagram: diagram }};
  var context = getContext();

  // Act
  await generateDiagram(context, request);

  // Assert
  // Check that the string starts with '<svg'
  expect(context.res.status).toBe(400)
}, 10000);

test('should process data correctly', async () => {
  // Arrange
  const diagram =`sequenceDiagram
  Bob ->> Alice: Hey
  Alice ->> Bob: Hi
  ` 
  const request = { body: {diagram: diagram }};
  var context = getContext()

  // Act
  await generateDiagram(context, request);

  // Assert
  // Check that the string starts with '<svg'
  expect(context.res.body.svg).toMatch(/^<svg/);

  // Check that the length of the string is over 100 characters
  expect(context.res.body.svg.length).toBeGreaterThan(100);
}, 10000);
