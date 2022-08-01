const PDF = require('pdfkit')
const mk = require('../../utilities/mk-utilities')
const path = require('path')
const fs = require('fs')

module.exports = async (userRecord) => {
    const doc = new PDF({ autoFirstPage: false });
    doc.addPage({
        size: 'LETTER',
        // layout: 'landscape'
    });
    const docPath = path.join(ROOT_DIR, "_temp", "pdfs", `${mk.ts()}.pdf`)
    const fontRoot = path.join(ROOT_DIR, "assets", "fonts")
    doc.pipe(fs.createWriteStream(docPath)); 
    doc.lineWidth(1);
    // doc.pipe(res);     
    // doc.text(`${userRecord.fields.Name}`, 100)
    // doc.text(`${docPath}`, 100)
    let paginator = 0
    for (let i = 0; i < userRecord.fields.ActionsToDo.length; i++) {
        if (paginator < 5) {
            doc.rect(100, (i+.25)*144, 72*3.5, 72*2).stroke()
            doc.font(`${fontRoot}/EmilysCandy-Regular.ttf`)
            doc.fontSize(14)
            doc.text(`${userRecord.fields.ActionsToDo_Name[i]}`, 100+15, (i+.25)*144+15)
            doc.font(`${fontRoot}/LeagueSpartan-Regular.otf`)
            doc.fontSize(8);
            doc.moveDown(2);
            doc.text(`${userRecord.fields.ActionsToDo_Notes[i]}`,  {width: 72*2.5, height: 72})
            // doc.moveDown();
            doc.text(`assignedTo: ${userRecord.fields.Name}`)
        } else {
            doc.addPage({
                size: 'LETTER',
                // layout: 'landscape'
            });
            paginator = 0
            doc.moveDown(2)
            doc.rect(100, (i+.5)*144, 72*3.5, 72*2).stroke()
            doc.font(`${fontRoot}/EmilysCandy-Regular.ttf`)
            doc.fontSize(14)
            doc.text(`${userRecord.fields.ActionsToDo_Name[i]}`, 100, (i)*144)
            doc.font(`${fontRoot}/LeagueSpartan-Regular.otf`)
            doc.fontSize(8);
            doc.moveDown(2);
            doc.text(`${userRecord.fields.ActionsToDo_Notes[i]}`)
            // doc.moveDown();
            doc.text(`assignedTo: ${userRecord.fields.Name}`)
        }
        paginator++        
        
    }
    doc.image('/Users/ll-studio/Development/ll-test-bot/assets/images/dani-mk-test.jpg', {width: 300})
        .text('Proportional to width');              
    doc.end();
    return docPath
}