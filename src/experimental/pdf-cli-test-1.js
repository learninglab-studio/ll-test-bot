const PDF = require('pdfkit')
const cp = require('child_process')
const path = require('path')
const fs = require('fs')
const mk = require('../utilities/mk-utilities')

module.exports = async () => {
    const doc = new PDF({ autoFirstPage: false });
    doc.addPage({
        size: 'LETTER',
        // layout: 'landscape'
    });
    const docPath = path.join(ROOT_DIR, "_temp", "pdfs", `${mk.ts()}.pdf`)
    const fontRoot = path.join(ROOT_DIR, "assets", "fonts")
    doc.pipe(fs.createWriteStream(docPath)); 
    doc.lineWidth(1);
    for (let i = 0; i < 5; i++) {
        doc.rect(72, (i+.25)*144, 72*3.5, 72*2).stroke()
        doc.font(`${fontRoot}/EmilysCandy-Regular.ttf`)
        doc.fontSize(14)
        doc.text(`user name ${i}`, 100+15, (i+.25)*144+15)
        doc.font(`${fontRoot}/LeagueSpartan-Regular.otf`)
        doc.fontSize(8);
        doc.moveDown(2);
        doc.text(`note for ${i} go here`,  {width: 72*2.5, height: 72})
        // doc.moveDown();
        doc.text(`assignedTo: name here`)
  }
  doc.addPage()
  
// Add another page
doc
  .addPage()
  .fontSize(25)
  .text('Here is some vector graphics...', 100, 100);

// Draw a triangle
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

  for (let i = 5; i < 10; i++) {
    doc.rect(72, (i+.25)*144, 72*3.5, 72*2).stroke()
    doc.font(`${fontRoot}/EmilysCandy-Regular.ttf`)
    doc.fontSize(14)
    doc.text(`user name ${i}`, 100+15, (i+.25)*144+15)
    doc.font(`${fontRoot}/LeagueSpartan-Regular.otf`)
    doc.fontSize(8);
    doc.moveDown(2);
    doc.text(`note for ${i} go here`,  {width: 72*2.5, height: 72})
    // doc.moveDown();
    doc.text(`assignedTo: name here`)
}

doc
  .font(`${fontRoot}/LeagueSpartan-Regular.otf`)
  .fontSize(25)
  .text('Some text with an embedded font!', 100, 100)
  .fontSize(18)
  .text('PNG and JPEG images:')
  .image('/Users/ll-studio/Development/ll-test-bot/assets/images/conrad.jpg', 100, 160, {
    width: 412
  })
  .image('/Users/ll-studio/Development/ll-test-bot/assets/images/dani-mk-test.jpg', 190, 400, {
    height: 300
  });

// Add another page
doc
  .addPage()
  .fontSize(25)
  .text('Here is some vector graphics...', 100, 100);

// Draw a triangle and a circle
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

doc.circle(280, 200, 50).fill('#6600FF');

doc.rect(72, (.25)*144, 72*3.5, 72*2).stroke()
        doc.font(`${fontRoot}/EmilysCandy-Regular.ttf`)
        doc.fontSize(14)
        doc.text(`user name`, 100+15, (.25)*144+15)
        doc.font(`${fontRoot}/LeagueSpartan-Regular.otf`)
        doc.fontSize(8);
        doc.moveDown(2);
        doc.text(`note for go here`,  {width: 72*2.5, height: 72})
        // doc.moveDown();
        doc.text(`assignedTo: name here`)

    doc.rect(72, (.25+1)*144, 72*3.5, 72*2).stroke()
        doc.font(`${fontRoot}/EmilysCandy-Regular.ttf`)
        doc.fontSize(14)
        doc.text(`user name`, 100+15, (.25)*144+15)
        doc.font(`${fontRoot}/LeagueSpartan-Regular.otf`)
        doc.fontSize(8);
        doc.moveDown(2);
        doc.text(`note for go here`,  {width: 72*2.5, height: 72})
        // doc.moveDown();
        doc.text(`assignedTo: name here`)

doc.save()
    doc.rect(72, (.25+2)*144, 72*3.5, 72*2).stroke()
            doc.font(`${fontRoot}/EmilysCandy-Regular.ttf`)
            doc.fontSize(14)
            doc.text(`user name`, 100+15, (.25)*144+15)
            doc.font(`${fontRoot}/LeagueSpartan-Regular.otf`)
            doc.fontSize(8);
            doc.moveDown(2);
            doc.text(`note for go here`,  {width: 72*2.5, height: 72})
            // doc.moveDown();
            doc.text(`assignedTo: name here`)
// doc
//   .scale(0.6)
//   .translate(470, -380)
//   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
//   .fill('red', 'even-odd')
//   .restore(); // render an SVG path // fill using the even-odd winding rule

var loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;\nMauris at ante tellus. Vestibulum a metus lectus. Praesent tempor purus a lacus blandit eget gravida ante hendrerit. Cras et eros metus. Sed commodo malesuada eros, vitae interdum augue semper quis. Fusce id magna nunc. Curabitur sollicitudin placerat semper. Cras et mi neque, a dignissim risus. Nulla venenatis porta lacus, vel rhoncus lectus tempor vitae. Duis sagittis venenatis rutrum. Curabitur tempor massa tortor.';

// Draw some text wrapped to 412 points wide
doc
  .text('And here is some wrapped text...', 100, 300)
  .font('Helvetica', 13)
  .moveDown()
  .text(loremIpsum, {
    // move down 1 line
    width: 412,
    align: 'justify',
    indent: 30,
    paragraphGap: 5
  });

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');
  await doc.end();
  cp.spawnSync('open', ['-a', 'Preview', docPath])
  return docPath
}  