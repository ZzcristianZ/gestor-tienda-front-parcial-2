

function users() {
    document.getElementById('cardHeader').innerHTML ='<h5>Listado de Productos</h5>'
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products'
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            
        }
    })
    .then((response)=>{
      console.log(response)
      return response.json().then(
        data =>{
          return{
            status: response.status,
            info:data
          }
        }
      )
    })
    .then((result)=>{
      if (result.status===200) {
          console.log(result)
            let list_user = `<table class="table table-hover">
            <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Slug</th>
            <th scope="col">Accion</th>
            </tr>
            </thead>
            <tbody>
            `
            result.info.forEach(element => {
                list_user=list_user+`
                <tr>
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td>${"$"+element.price}</td>
                <td>${element.slug}</td>
                <td><button type="button" class="btn btn-outline-info" onclick="getUser('${element.id}')">Ver</button></td>
                </tr>
                `
            });
            list_user=list_user+`
            </tbody>
            </table>
                        <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('1')">1</a></li>
                <li class="page-item"><a class="page-link" href="#" onclick="users('2')">2</a></li>
                <li class="page-item">
                  <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
            `
            
            document.getElementById('info').innerHTML=list_user
        }else{
            document.getElementById('info').innerHTML = 'no existen ususarios en la BD'
        }
    })
}


function getUser(idUser) {
    console.log("id", idUser)
    const REQRES_ENDPOINT = 'https://api.escuelajs.co/api/v1/products/'+idUser
    fetch(REQRES_ENDPOINT,  {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'x-api-key':'reqres-free-v1'
        }
    })
    .then((result)=>{
        console.log("result", result)
        return result.json().then(
            info =>{
                return{
                    status: result.status,
                    body: info
                }
            }
        )
    })
    .then((response)=>{
        if(response.status===200){
            const user= response.body
            console.log("hola", user)
            const modalUser= `
                                <div class="modal fade" id="modalUser" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ver Producto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="card">
                          <div class="card-body">
                          <h5 class= "card-title">Informacion del Producto</h5>
                            <p class="card-text">ID: ${user.id}</p>
                            <p class="card-text">Titulo: ${user.title} </p>
                            <p class="card-text">Precio: ${user.price} </p>
                            <p class="card-text">Slug: ${user.slug} </p>
                            <p class="card-text">Descripcion: ${user.description} </p>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
            `
            document.getElementById('viewModal').innerHTML=modalUser
            const modal = new bootstrap.Modal(
                document.getElementById('modalUser')
            )
            modal.show()
        }
        else{
            document.getElementById('info').innerHTML='<h3>No se encontrò el usuario en la Api</h3>'
        }
    })
}
