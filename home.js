const home = {
    template: `
    <div>
        <div class="centered">
             <h2 class ="text-center" style="font-weight: bold; font-size: 20px;">Systeme de Gestion de Parking (Avec Scanner de QRCode)</h2>
            
            <router-link to="/place" style="font-weight: bold;" class="btn btn-warning shadow-elevated text-center "> RESERVEZ VOTRE PLACE ICI</router-link>
            <div  class="container centered">
            
             <p class="text-center">Scannez Votre code QR pour Sortir du parking (LIBERER LA PLACE) </p>
             <form class="my-1">
                    <div class="form-group">
                        <input id="autoFocusInput" v-model="qrCode" @input="handleInputChange" autofocus type="text" class="form-control" placeholder="Scannez Votre QRCode">
                    </div>
                
                </form>
               
                <div class="centered_box">
                    <img src="assets/images/scanQr.png" alt="Image" class="my-1" style="width: 250px; ">
                    <div class="mt-3">
                       <video id="video" width="320" height="240" autoplay="autoplay" style="margin-left: 20px; border-radius: 20px;border-block: #8000ff solid 5px;"></video>
                    </div>
                </div>
                <button id="openCameraBtn" class="btn btn-warning shadow-elevated mt-3">Scanner</button>
                
                
           </div>
        </div>

        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="">
                            <img src="assets/images/succes.png" style="width:120px; height:120px" alt="Checkmark Icon" />
                        </div>
                        <p class="mt-3" style="font-weight: bold; font-size: 20px; color:green">Place Du parking libérée avec succès</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="">
                            <img src="assets/images/error.png" style="width:120px; height:120px " alt="Checkmark Icon" />
                        </div>
                        <p class="mt-3" style="font-weight: bold; font-size: 20px; color:red">Désoler Nous ne retrouvons pas ce QR code que vous avez presenter</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            qrCode: ''
        };
    },
    methods: {
        handleInputChange() {
            // Récupérer la donnée entrée
            const enteredValue = this.qrCode.trim();
            console.log('QR Code scanné:', enteredValue);

            // Vider le champ de saisie
            //this.qrCode = '';

            axios.put(variables.API_URL+"place/liberer_by_QrCode", {
                PlaceCodeQr: enteredValue,
            }).then((response)=>{
                console.log("response de la liberation de la place", response.data);
                this.qrCode = '';

                // Utiliser trim() pour supprimer les espaces blancs
                const responseData = response.data.trim();
               

                if(responseData === "Place libérée avec succès"){
                    $('#successModal').modal('show');
                }else{
                    $('#errorModal').modal('show');
                }
                const timeout = setTimeout(function() {
                    window.location.reload();
                }, 3000);
            })

        },

        

      
    
    },
    mounted: function () {
        const inputElement = document.getElementById('autoFocusInput');
        // Mettre le focus sur l'élément input
        inputElement.focus();

        document.getElementById('openCameraBtn').addEventListener('click', function() {
            const video = document.getElementById('video');
            const constraints = { video: { facingMode: "environment" } };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();

                    const timeout = setTimeout(function() {
                        window.location.href = 'index.html';
                    }, 5000);

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    function scanQRCode() {
                        if (video.readyState === video.HAVE_ENOUGH_DATA) {
                            canvas.height = video.videoHeight;
                            canvas.width = video.videoWidth;
                            context.drawImage(video, 0, 0, canvas.width, canvas.height);
                            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                            const code = jsQR(imageData.data, imageData.width, imageData.height, {
                                inversionAttempts: "dontInvert",
                            });

                            if (code) {
                                clearTimeout(timeout);
                                console.log("QR Code détecté : " + code.data);
                                inputElement.value = code.data;
                                this.qrCode = code.data;
                                // Créer et dispatcher l'événement input
                                const event = new Event('input', {
                                    bubbles: true,
                                    cancelable: true,
                                });
                                inputElement.dispatchEvent(event);
                                // Traite le code QR ici
                            } else {
                                requestAnimationFrame(scanQRCode);
                            }
                        } else {
                            requestAnimationFrame(scanQRCode);
                        }
                    }

                    scanQRCode();
                })
                .catch(function(err) {
                    console.log("Une erreur est survenue : " + err);
                });
        });

    }
}