const PDF = require('pdfkit')
const cp = require('child_process')
const path = require('path')
const fs = require('fs')
const mk = require('../utilities/mk-utilities')

module.exports = async () => {
    const doc = new PDF({ autoFirstPage: false });
    doc.addPage({
        size: 'LETTER',
        bufferPages: true,
        // layout: 'landscape'
    });
    
    const docPath = path.join(ROOT_DIR, "_temp", "pdfs", `${mk.ts()}.pdf`)
    const fontRoot = path.join(ROOT_DIR, "assets", "fonts")
    doc.pipe(fs.createWriteStream(docPath)); 
    for (let i = 0; i < 3; i++) {
        doc.addPage()
    }
    const range = doc.bufferedPageRange();
    doc.lineWidth(1);
    doc.switchToPage(1)
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
  await doc.end();
  cp.spawnSync('open', ['-a', 'Preview', docPath])
  return docPath
}
