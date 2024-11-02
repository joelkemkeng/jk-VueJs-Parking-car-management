const managePlace = {
    template: `
        <div>

            <button type="button" class="btn btn-primary m-2 float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="addClick()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
                Ajouter une place
            </button>
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Numero Place</th>
                        <th>Date creation</th>
                        <th>Image Place</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="place in places">
                        <td><div class="btn btn-primary" :style="colorBadge(place.Reserver)" ><span class="badge badge-pill badge-success">{{stringReservation(place.Reserver)}}</span> </div></td>
                        <td>{{ place.PlaceNumero }}</td>
                        <td>{{ place.DateCreatePlace }}</td>
                        <td>
                            <img :src="PhotoPath+place.PhotoFileName" width="80" height= "80"  alt="Photo" />
                        </td>
                        <td>
                            <button class="btn btn-primary mr-1" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="editClick(place)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg> 
                                Edit
                            </button>
                            <button class="btn btn-danger mr-1" @click = "deleteClick(place.PlaceNumero)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg>
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

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
                                    <span class="input-group-text" >Numero de place</span>
                                    <input type="text" class="form-control" v-model="PlaceNumero">
                                </div>

                                
                                 <div class="input-group mb-3">
                                    <span class="input-group-text" >Date de creation (Facultatif) </span>
                                    <input type="date" class="form-control" v-model="DateCreatePlace">
                                </div>

                            </div>


                            <div class = "p-2 w-50 bd-highlight">
                                <img width="200" height="200" :src="PhotoPath+PhotoFileName"/>
                                <input type="file" class="m-2" @change="imageUpload"/>
                            </div>

                        </div>

                            <button type="button" v-if="PlaceId==0" class="btn btn-primary" @click = "createClick()" >Enregistrer</button>
                            <button type="button" v-if="PlaceId!=0" class="btn btn-primary" @click = "updateClick()" >Mise a jour</button>

                        </div>


                        <!--
                        <div class="modal="footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>   

                            <button type="button" class="btn btn-primary">Enregistrer</button>
                        </div>
                        -->
                    </div>
                </div>

             </div>
             
               


        </div>
    `,

    data(){
        return {
            //---- Variable data List employee with sample data test
            
            departements: [
                {
                    DepartementId: 1,
                    DepartementName: "IT"
                },
                {
                    DepartementId: 2,
                    DepartementName: "HR"
                },
                {
                    DepartementId: 3,
                    DepartementName: "Finance"
                },
            ],

            employee : [
                
                    {
                        "EmployeeId": 999,
                        "EmployeeName": "Default",
                        "Departement": "IT",
                        "DateOfJoining": "2021-12-12",
                        "PhotoFileName": "anonymous.png"
                    },

            ],


            //---- Variable data Modal
            modalTitle: "",
            EmployeeName: "",
            EmployeeId: 0,
            Departement: "",
            DateOfJoining: "",
            PhotoFileName: "anonymous.png",
            PhotoPath: variables.PHOTO_URL,








            //------- Varaibles projet parking

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
        refreshData(){
            axios.get(variables.API_URL+"place")
            .then((response)=>{
                this.places = response.data;
            })
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



        addClick(){
            this.modalTitle = "Ajouter une Place au parking";
            this.onePlace = {};
            this.PlaceNumero = 0;
            this.PlaceCodeQr = "";
            this.DateCreatePlace = "";
            this.DateEdit = "";
            this.PhotoFileName= "anonymous.png";

        },

        editClick(place){


            this.modalTitle = "Modifier Place";
            this.PlaceId = place.PlaceId;
            this.PlaceNumero = place.PlaceNumero;
            this.PlaceCodeQr = place.PlaceCodeQr;
            this.DateCreatePlace = place.DateCreatePlace;
            this.DateEdit = place.DateEdit;
            this.Reserver = place.Reserver;
            this.MatriculeCar = place.MatriculeCar;
            this.PhotoFileName = place.PhotoFileName;
        
        },
        createClick(){
                axios.post(variables.API_URL+"place", {

                    PlaceNumero: parseInt(this.PlaceNumero, 10),
                    
                    PhotoFileName: this.PhotoFileName

                })
                .then((response)=>{
                    this.refreshData();

                  // Fermer le modal
                  $('#exampleModal').modal('hide');


                    //alert(response.data);
                })
            },

        updateClick(){
            axios.put(variables.API_URL+"place", {
                    PlaceId: this.PlaceId,
                    PlaceNumero: this.PlaceNumero,
                    PlaceCodeQr: this.PlaceCodeQr,
                    DateCreatePlace: this.DateCreatePlace,
                    DateEdit: this.DateEdit,
                    Reserver: this.Reserver,
                    MatriculeCar: this.MatriculeCar,
                    PhotoFileName: this.PhotoFileName
            })
            .then((response)=>{
                this.refreshData();
             
                $('#exampleModal').modal('hide');
            })
        },

        deleteClick(PlaceNumero){
            if(confirm('Voulez-vous vraiment supprimer ce departement?')){
                axios.delete(variables.API_URL+"place/"+PlaceNumero)
                .then((response)=>{
                    this.refreshData();
                   
                })  
            }else{
                return;
            }
        },

        imageUpload(event){
            let formData = new FormData();
            formData.append('file', event.target.files[0], event.target.files[0].name);

            axios.post(variables.API_URL+"place/saveFile", formData)
            .then((response)=>{
               
                this.PhotoFileName = response.data;
            })
        }
           
            
    },
    mounted: function () {
        this.refreshData();
    }



}