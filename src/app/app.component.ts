import { Component, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { NgxCaptureService } from 'ngx-capture';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('screen', { static: true }) screen: any;
  title = 'ConvertTopdf';
  imgBase64: any = ''
  constructor(private ngxCaptureService: NgxCaptureService) { }
  capture() {
    this.ngxCaptureService.getImage(this.screen.nativeElement, true)
      .subscribe(
        res => {
          console.log(res)
          this.imgBase64 = res
          this.savePDF(this.imgBase64)
        },
        err => { console.log(err) }
      )

  }
  // savePDF(imgBase64:any){
  //   var doc = new jsPDF();
  //   var image = imgBase64;
  //   doc.addImage(image, 'JPEG',20,20,0,0);
  //   doc.save('index.pdf');

  // }
  savePDF(imgBase64: any) {
     // Get the dimensions of the image.
    var image = new Image();
    image.onload= ()=>{
      let pageWidth = image.naturalWidth;
      let pageHeight = image.naturalHeight;
       // Create a new PDF with the same dimensions as the image.
      const pdf = new jsPDF({
        orientation: pageHeight > pageWidth ? "portrait": "landscape",
        unit: "px",
        format: [pageHeight, pageWidth]
      });
       // Add the image to the PDF with dimensions equal to the internal dimensions of the page.
      pdf.addImage(imgBase64, 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
       // Save the PDF with the filename specified here:
      pdf.save("index.pdf");
    }
    image.src = imgBase64;

    }

  
}