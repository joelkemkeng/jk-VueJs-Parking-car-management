const historyParking = {
    template: `
        <div>

            <h3>Historique Parking</h3>
            
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Type Mouvement</th>
                        <th>Numero Place</th>
                        <th>Date du Mouvement</th>
                        <th>Matricule Car</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="story in historys">
                        <td><div class="btn btn-primary" :style="colorBadge(story.TypeMouvement)" ><span class="badge badge-pill badge-success">{{stringReservation(story.TypeMouvement)}}</span> </div></td>
                        
                        <td>{{ story.NumeroPlace }}</td>
                        <td>{{ story.DateCreate }}</td>
                        <td>{{ story.MatriculeCar }}</td>
                        
                    </tr>
                </tbody>
            </table>

           
             
               


        </div>
    `,

    data(){
        return {
            //---- Variable data List employee with sample data test
            
            //-*------------ Variable App parkingCar

            historys: [
                {
                    "Id": 4,
                    "DateCreate": "2024-09-10",
                    "NumeroPlace": 15,
                    "PlaceCodeQr": "QRbase 15",
                    "MatriculeCar": "no car",
                    "TypeMouvement": "Reserver"
                },
                {
                    "Id": 5,
                    "DateCreate": "2024-09-10",
                    "NumeroPlace": 18,
                    "PlaceCodeQr": "QRbase 18",
                    "MatriculeCar": "LT test 18",
                    "TypeMouvement": "Liberer"
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
            axios.get(variables.API_URL+"history")
            .then((response)=>{
                this.historys = response.data;
            })

          
        },


        stringReservation(status){
            return status=="Liberer" ? "Sortie" : "Entrée";
          },

          colorBadge(status){
            return status=="Liberer" ? 
                {
                backgroundColor:'#ffb327d6' ,
              } : {
                backgroundColor:'#0ee60eb2' ,
              };
          },


           
            
    },
    mounted: function () {
        this.refreshData();
    }
}