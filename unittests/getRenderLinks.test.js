import getRenderLinks from "../getRenderLinks/index.js"

function getContext() {
  var context = {log:function(anything){}};
  context.log.error = function(anything){};
  return context;
}

test('should process data correctly', async () => {
  // Arrange
  const diagram =`sequenceDiagram
  Bob ->> Alice: Hey
  Alice ->> Bob: Hi
  ` 
  const request = { body: {diagram: diagram }};
  var context = getContext()

  // Act
  await getRenderLinks(context, request);

  // Assert
  expect(context.res.body.imageLink).toMatch(/^https/);
  expect(context.res.body.svgLink).toMatch(/^https/);
});
