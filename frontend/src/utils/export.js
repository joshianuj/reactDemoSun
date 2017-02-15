
import jsPDF from 'jspdf';

let doc = new jsPDF();

let specialElementHandlers = {
    '#editor': function (element, renderer) {
        return true;
    }
};

export function toPdf(element){
    doc.addHTML(element, 15, 15, ()=>{
      doc.save('someproject-output.pdf');

    });
}
