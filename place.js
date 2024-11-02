const place = {
    template: `
        <div>

             <div class="row row-cols-3 g-4" >
                <div class="col" v-for="place in places" >


                    <div class="card">
                        <div class="image-container">
                            <img :src="PhotoPath + place.PhotoFileName" alt="Hollywood Sign on The Hill" width="50%" height ="50%">
                        </div>
                        <div class="card-body"  :style="backgroundColorStyle(place.Reserver)"  >
                        
                            <div class="btn btn-primary" :style="colorBadge(place.Reserver)" ><span class="badge badge-pill badge-success">{{stringReservation(place.Reserver)}}</span> </div>
                            <button type="button" class="btn btn-warning float-end shadow-button" v-if="place.Reserver==false" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="reserverOpenClick(place)"><span style="font-weight: bold;font-size: 15px;" >Réservez ICI </span></button>

                            <h5 class="card-title text-center" style="font-weight: bold;font-size: 25px;">N° {{place.PlaceNumero}}</h5>
                            <p class="card-text text-center">
                            <h5 class="card-title text-center" style="font-weight: bold;font-size: 15px;" v-if="place.Reserver==true">Matricule Car : {{place.MatriculeCar}}</h5>
                            <h5 class="card-title text-center" style="font-weight: bold;font-size: 15px;" v-if="place.Reserver==true">Date : {{ formatDate(place.DateEdit) }}</h5>

                            <button type="button" class="btn btn-warning float-end shadow-button" v-if="place.Reserver==true"  @click="libererValidClick(place)"> <span style="font-weight: bold;font-size: 15px;">Liberer La Place </span></button>
                            </p>
                        </div>
                    </div>

                </div>






            <iframe id="pdfFrame" style="display:none;"></iframe>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div class="modal-body">

                        <div class="d-flex flex-row bd-highlight mb-3">
                            <div class = "p-2 w-50 bd-highlight">

                                <div class="input-group mb-3">
                                    <span class="input-group-text" >Matricule Car</span>
                                    <input type="text" class="form-control" v-model="MatriculeCar">
                                </div>

                            </div>


                            <div class = "p-1 w-50 bd-highlight">
                                <img width="100%"  :src="PhotoPath+PhotoFileName"/>
                            </div>

                        </div>

                            <button type="button" class="btn btn-primary" @click = "reserverValidClick()" >Reserver</button>

                        </div>


                    </div>
                </div>

             </div>
                       
            </div>











        </div>
    `,

    data(){
        return {
        


            //-*------------ Variable App parkingCar

            places: [
                {
                    "PlaceId": 11,
                    "PlaceNumero": 18,
                    "PlaceCodeQr": "QRbase 18",
                    "DateCreatePlace": "2021-10-11",
                    "DateEdit": "2024-09-09",
                    "Reserver": false,
                    "MatriculeCar": "no car",
                     "PhotoFileName": "anonymous.png"
                },
                {
                    "PlaceId": 10,
                    "PlaceNumero": 18,
                    "PlaceCodeQr": "QRbase 18",
                    "DateCreatePlace": "2021-10-11",
                    "DateEdit": "2024-09-09",
                    "Reserver": false,
                    "MatriculeCar": "no car",
                },
                {
                    "PlaceId": 3,
                    "PlaceNumero": 30,
                    "PlaceCodeQr": "QRbase 58",
                    "DateCreatePlace": "2021-10-11",
                    "DateEdit": "2024-09-09",
                    "Reserver": true,
                    "MatriculeCar": "LT-123-AB",
                },
                {
                    "PlaceId": 3,
                    "PlaceNumero": 30,
                    "PlaceCodeQr": "QRbase 58",
                    "DateCreatePlace": "2021-10-11",
                    "DateEdit": "2024-09-09",
                    "Reserver": true,
                    "MatriculeCar": "LT-123-AB",
                },
            ],

            //---- Variable data Modal
            modalTitle: "",
            PlaceNumero: 0,
            PlaceCodeQr: "",
            PlaceId: 0,
            DateCreatePlace: "",
            DateEdit: "",
            Reserver: false,
            MatriculeCar: "",
            PhotoFileName: "anonymous.png",
            PhotoPath: variables.PHOTO_URL,
            onePlace: {},
            DateOfJoining: "",


            PlaceNumero: '123',
            PlaceCodeQr: 'QR123456',
            DateCreatePlace: '2024-09-10',
          
        }
    },

    methods:{
  

        //----------------------- Methode Project ParrkingCar


        refreshData(){
            axios.get(variables.API_URL+"place")
            .then((response)=>{
                this.places = response.data;
            })
        },

        backgroundColorStyle(status) {
            return {
              backgroundColor: status ? '#f72424a1' : '#0ee60ec2'
            };
          },

          stringReservation(status){
            return status ? "Place Deja Reserver" : "Place Libre";
          },

          colorBadge(status){
            return status ? 
                {
                backgroundColor:'red',
              } : {
                backgroundColor:'green' ,
              };
          },

          formatDate(dateString) {
            const date = new Date(dateString);
            const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
            return new Intl.DateTimeFormat('fr-FR', options).format(date);
          },


        imageUpload(event){
            let formData = new FormData();
            formData.append('file', event.target.files[0], event.target.files[0].name);

            axios.post(variables.API_URL+"employee/saveFile", formData)
            .then((response)=>{
               
                this.PhotoFileName = response.data;
            })
        },

        reserverOpenClick(place){
            this.modalTitle = "Reserver Place N° "+place.PlaceNumero;
            this.PhotoFileName = place.PhotoFileName;
            this.PlaceNumero = place.PlaceNumero;
            this.PlaceCodeQr = place.PlaceCodeQr;
            this.MatriculeCar = "";
          
        },

       


        libererValidClick(place){
           
            axios.put(variables.API_URL+"place/liberer", {
                PlaceNumero: place.PlaceNumero,
            }).then((response)=>{
                this.refreshData();
             
            })

        },










        reserverValidClick2() {

            PlaceNumero = this.onePlace.PlaceNumero;
            MatriculeCar = this.onePlace.MatriculeCar;
            DateCreatePlace = this.onePlace.DateCreatePlace;
            PhotoFileName = this.onePlace.PhotoFileName;
            PhotoPath = this.PhotoPath;
            PlaceCodeQr = this.onePlace.PlaceCodeQr;


            

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
        
            // Fonction pour centrer le texte
            const centerText = (text, y) => {
                const textWidth = doc.getTextWidth(text);
                const x = (pageWidth - textWidth) / 2;
                doc.text(text, x, y);
            };
        
            // Ajouter du texte centré au PDF
            centerText(`RESERVATION PLACE PARKING `, 8);
            centerText(`Numero de la place: ${PlaceNumero}`, 25);
            centerText(`Matricule Vehicule: ${MatriculeCar}`, 33);
            centerText(`Date de Reservation : ${DateCreatePlace}`, 40);
        
            // Ajouter une image centrée au PDF
            const imgWidth = 50; // Largeur de l'image
            const imgHeight = 50; // Hauteur de l'image
            const totalImgWidth = imgWidth * 2 + 10; // Largeur totale des deux images avec un espace entre elles
            const imgX = (pageWidth - totalImgWidth) / 2;
            const imgY = 50; // Position Y des images
        
            // Charger l'image et l'ajouter au PDF
            const img = new Image();
            img.src = PhotoPath + PhotoFileName;
            img.onload = () => {
                doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        
                // Générer le code QR
                const qr = new QRious({
                    value: PlaceCodeQr,
                    size: 50
                });
        
                // Ajouter le code QR au PDF
                const qrX = imgX + imgWidth + 10; // Position X du QR code à côté de l'image
                doc.addImage(qr.toDataURL(), 'PNG', qrX, imgY, 50, 50);
        
                // Ajouter un trait de séparation
                const lineY = imgY + imgHeight + 10; // Position Y du trait
                doc.setLineWidth(1.5); // Épaisseur du trait
                doc.line(10, lineY, pageWidth - 10, lineY); // Dessiner le trait
        

                // Ouvrir le PDF dans un iframe et lancer l'impression
                const pdfData = doc.output('datauristring');
                const iframe = document.getElementById('pdfFrame');
                iframe.src = pdfData;
                iframe.onload = () => {
                    iframe.contentWindow.print();
                };


                // Ouvrir la boîte de dialogue d'impression
                //doc.autoPrint();
                //window.open(doc.output('bloburl'), '_blank');


                // Ouvrir le PDF dans une nouvelle fenêtre, imprimer et fermer la fenêtre
                /*const pdfData = doc.output('bloburl');
                const printWindow = window.open(pdfData, '_blank');
                printWindow.onload = () => {
                    printWindow.print();
                    printWindow.onafterprint = () => {
                        printWindow.close();
                    };
                };*/
            };
        },





        reserverValidClick3() {
            PlaceNumero = this.onePlace.PlaceNumero;
            MatriculeCar = this.onePlace.MatriculeCar;
            DateCreatePlace = this.onePlace.DateCreatePlace;
            PhotoFileName = this.onePlace.PhotoFileName;
            PhotoPath = this.PhotoPath;
            PlaceCodeQr = this.onePlace.PlaceCodeQr;
        
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
        
            // Fonction pour centrer le texte
            const centerText = (text, y) => {
                const textWidth = doc.getTextWidth(text);
                const x = (pageWidth - textWidth) / 2;
                doc.text(text, x, y);
            };

              // Ajouter une image centrée au PDF
              const imgWidth = 50; // Largeur de l'image
              const imgHeight = 50; // Hauteur de l'image
              const totalImgWidth = imgWidth * 2 + 10; // Largeur totale des deux images avec un espace entre elles
            const imgX = (pageWidth - totalImgWidth) / 2;
            const imgY = 50; // Position Y des images

            // Ajouter un trait de séparation
            const lineY2 = 2; // Position Y du trait
            doc.setLineWidth(1.5); // Épaisseur du trait
            doc.line(10, lineY2, pageWidth - 10, lineY2); // Dessiner le trait
        
            // Ajouter du texte centré au PDF
            centerText(`TIKET RESERVATION PLACE PARKING `, 8);

             // Ajouter un trait de séparation
             const lineY = 10; // Position Y du trait
             doc.setLineWidth(1.5); // Épaisseur du trait
             doc.line(10, lineY, pageWidth - 10, lineY); // Dessiner le trait

            centerText(`Numero de la place: ${PlaceNumero}`, 25);
            centerText(`Matricule Vehicule: ${MatriculeCar}`, 33);
            centerText(`Date de Reservation : ${DateCreatePlace}`, 40);
        
          
        
        
            // Charger l'image et l'ajouter au PDF
            const img = new Image();
            img.src = PhotoPath + PhotoFileName;
            img.onload = () => {
                doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);
        
                // Générer le code QR
                const qr = new QRious({
                    value: PlaceCodeQr,
                    size: 50
                });
        
                // Ajouter le code QR au PDF
                const qrX = imgX + imgWidth + 10; // Position X du QR code à côté de l'image
                doc.addImage(qr.toDataURL(), 'PNG', qrX, imgY, 50, 50);
        
                // Ajouter un trait de séparation
                const lineY = imgY + imgHeight + 10; // Position Y du trait
                doc.setLineWidth(1.5); // Épaisseur du trait
                doc.line(10, lineY, pageWidth - 10, lineY); // Dessiner le trait
        
                // Créer un objet Blob pour le PDF
                const pdfBlob = doc.output('blob');
                const url = URL.createObjectURL(pdfBlob);
        
                // Ouvrir le PDF dans un iframe caché et lancer l'impression
                const iframe = document.getElementById('pdfFrame');
                iframe.src = url;
                iframe.onload = () => {
                    iframe.contentWindow.print();
                    URL.revokeObjectURL(url); // Révoquer l'URL après l'impression
                };
            };
        },
        
        

        reserverValidClick(){
            console.log("PlaceNumero: "+this.PlaceNumero);
            axios.put(variables.API_URL+"place/reserver", {
               
                PlaceNumero: this.PlaceNumero,
                MatriculeCar: this.MatriculeCar,
            }).then((response)=>{
                this.refreshData();
                $('#exampleModal').modal('hide');

                //----- GET DATA ONE PLACE BY this.PlaceNumero ET RETOURNER DANS this.onePlace
                axios.get(variables.API_URL+"place/"+this.PlaceNumero)
                .then((response)=>{
                    this.onePlace = response.data;
                    console.log(this.onePlace);
                    this.reserverValidClick3();
                })

            })

        },
        



           
            
    },
    mounted: function () {
        this.refreshData();
    },





    computed: {
        backgroundColorStyle_comp(status) {
          return {
            backgroundColor: status ? 'red' : 'green'
          };
        }
      }
    
}